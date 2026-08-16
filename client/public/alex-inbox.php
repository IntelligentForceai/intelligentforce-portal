<?php
declare(strict_types=1);

/**
 * ALEX Inbox server bridge.
 *
 * Credentials and the session signing secret live only in a protected PHP
 * configuration file uploaded separately from the public project files.
 * This endpoint never exposes mailbox credentials to the browser.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Content-Type-Options: nosniff');

const MAX_REQUEST_BYTES = 60000;
const MAX_MESSAGE_BODY_BYTES = 50000;
const STATE_FILE = __DIR__ . '/.alex-inbox-state.json';
const CONFIG_FILE = __DIR__ . '/.alex-inbox-config.php';

function respond(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $code, int $status = 400): never {
    respond(['ok' => false, 'error' => $code], $status);
}

function base64url_encode(string $value): string {
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function base64url_decode(string $value): string|false {
    $padded = strtr($value, '-_', '+/');
    $padded .= str_repeat('=', (4 - strlen($padded) % 4) % 4);
    return base64_decode($padded, true);
}

function config(): array {
    if (!is_file(CONFIG_FILE)) {
        fail('inbox_not_configured', 503);
    }
    $config = require CONFIG_FILE;
    $required = ['admin_password', 'session_secret', 'imap_username', 'imap_password', 'from_email'];
    foreach ($required as $key) {
        if (!is_string($config[$key] ?? null) || $config[$key] === '') {
            fail('inbox_not_configured', 503);
        }
    }
    return $config;
}

function request_body(): array {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        fail('method_not_allowed', 405);
    }
    $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($length > MAX_REQUEST_BYTES) {
        fail('request_too_large', 413);
    }
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    if (!is_array($data)) {
        fail('invalid_request');
    }
    return $data;
}

function issue_session(array $config): void {
    $payload = base64url_encode(json_encode([
        'iat' => time(),
        'exp' => time() + (12 * 60 * 60),
        'scope' => 'alex-inbox',
    ], JSON_UNESCAPED_SLASHES));
    $signature = hash_hmac('sha256', $payload, $config['session_secret']);
    setcookie('if_alex_session', $payload . '.' . $signature, [
        'expires' => time() + (12 * 60 * 60),
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function clear_session(): void {
    setcookie('if_alex_session', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function require_session(array $config): void {
    $cookie = $_COOKIE['if_alex_session'] ?? '';
    if (!is_string($cookie) || !str_contains($cookie, '.')) {
        fail('authentication_required', 401);
    }
    [$payload, $signature] = explode('.', $cookie, 2);
    $expected = hash_hmac('sha256', $payload, $config['session_secret']);
    $decoded = base64url_decode($payload);
    $data = $decoded === false ? null : json_decode($decoded, true);
    if (!hash_equals($expected, $signature) || !is_array($data) || ($data['scope'] ?? '') !== 'alex-inbox' || (int) ($data['exp'] ?? 0) < time()) {
        clear_session();
        fail('authentication_required', 401);
    }
}

function decode_mime(string $value): string {
    $parts = imap_mime_header_decode($value);
    $decoded = '';
    foreach ($parts as $part) {
        $charset = strtoupper((string) ($part->charset ?? 'DEFAULT'));
        $text = (string) ($part->text ?? '');
        if ($charset !== 'DEFAULT' && $charset !== 'UTF-8') {
            $converted = @mb_convert_encoding($text, 'UTF-8', $charset);
            $decoded .= $converted === false ? $text : $converted;
        } else {
            $decoded .= $text;
        }
    }
    return trim(preg_replace('/\s+/', ' ', $decoded) ?? '');
}

function safe_header_value(string $value): string {
    return trim(str_replace(["\r", "\n"], '', $value));
}

function mailbox(array $config) {
    $server = '{imap.domeneshop.no:993/imap/ssl/readonly}INBOX';
    $mailbox = @imap_open($server, $config['imap_username'], $config['imap_password'], OP_READONLY, 1);
    if ($mailbox === false) {
        fail('inbox_connection_failed', 503);
    }
    return $mailbox;
}

function close_mailbox($mailbox): void {
    if (is_resource($mailbox) || is_object($mailbox)) {
        @imap_close($mailbox);
    }
}

function priority_for(string $from, string $subject, string $body = ''): array {
    $text = mb_strtolower($from . ' ' . $subject . ' ' . mb_substr($body, 0, 1800));
    $rules = [
        ['investor', 'Høy', ['investor', 'investering', 'funding', 'venture', 'kapital', 'pitch']],
        ['Kunde/lead', 'Høy', ['demo', 'tilbud', 'proposal', 'quote', 'pris', 'pricing', 'automation', 'automatisering']],
        ['Support', 'Høy', ['support', 'problem', 'feil', 'issue', 'hjelp', 'urgent', 'haster']],
        ['Internt/drift', 'Normal', ['github', 'cloudflare', 'domeneshop', 'stripe', 'formspree', 'google']],
        ['Informasjon', 'Lav', ['newsletter', 'nyhetsbrev', 'unsubscribe', 'oppdatering', 'digest']],
    ];
    foreach ($rules as [$category, $priority, $needles]) {
        foreach ($needles as $needle) {
            if (str_contains($text, $needle)) {
                return ['category' => $category, 'priority' => $priority];
            }
        }
    }
    return ['category' => 'Generell henvendelse', 'priority' => 'Normal'];
}

function state_all(): array {
    if (!is_file(STATE_FILE)) {
        return [];
    }
    $json = @file_get_contents(STATE_FILE);
    $state = json_decode($json ?: '[]', true);
    return is_array($state) ? $state : [];
}

function state_update(string $uid, array $update): array {
    $handle = @fopen(STATE_FILE, 'c+');
    if ($handle === false) {
        fail('state_unavailable', 503);
    }
    try {
        if (!flock($handle, LOCK_EX)) {
            fail('state_unavailable', 503);
        }
        rewind($handle);
        $raw = stream_get_contents($handle);
        $state = json_decode($raw ?: '[]', true);
        if (!is_array($state)) {
            $state = [];
        }
        $current = is_array($state[$uid] ?? null) ? $state[$uid] : [];
        $state[$uid] = array_merge($current, $update, ['updatedAt' => gmdate('c')]);
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        fflush($handle);
        @chmod(STATE_FILE, 0600);
        return $state[$uid];
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function message_summary($mailbox, string $uid, array $overview, array $state): array {
    $from = safe_header_value(decode_mime((string) ($overview->from ?? 'Ukjent avsender')));
    $subject = safe_header_value(decode_mime((string) ($overview->subject ?? '(uten emne)')));
    $classification = priority_for($from, $subject);
    $stored = is_array($state[$uid] ?? null) ? $state[$uid] : [];
    return [
        'uid' => $uid,
        'from' => $from,
        'to' => safe_header_value((string) ($overview->to ?? '')),
        'subject' => $subject,
        'date' => (string) ($overview->date ?? ''),
        'timestamp' => (int) ($overview->udate ?? 0),
        'seen' => isset($overview->seen) ? (bool) $overview->seen : false,
        'messageId' => safe_header_value((string) ($overview->message_id ?? '')),
        'category' => $stored['category'] ?? $classification['category'],
        'priority' => $stored['priority'] ?? $classification['priority'],
        'status' => $stored['status'] ?? 'Ny',
        'summary' => $stored['summary'] ?? '',
        'draft' => $stored['draft'] ?? '',
        'sentAt' => $stored['sentAt'] ?? null,
    ];
}

function list_messages(array $config): array {
    $mailbox = mailbox($config);
    try {
        $uids = imap_search($mailbox, 'ALL', SE_UID);
        if (!is_array($uids) || count($uids) === 0) {
            return [];
        }
        rsort($uids, SORT_NUMERIC);
        $uids = array_slice($uids, 0, 50);
        $state = state_all();
        $messages = [];
        foreach ($uids as $uid) {
            $items = @imap_fetch_overview($mailbox, (string) $uid, FT_UID);
            if (!is_array($items) || !isset($items[0])) {
                continue;
            }
            $messages[] = message_summary($mailbox, (string) $uid, $items[0], $state);
        }
        return $messages;
    } finally {
        close_mailbox($mailbox);
    }
}

function text_part($structure, string $prefix = ''): ?array {
    $isText = (int) ($structure->type ?? -1) === 0;
    $subtype = strtoupper((string) ($structure->subtype ?? ''));
    if ($isText && in_array($subtype, ['PLAIN', 'HTML'], true)) {
        return ['part' => $prefix === '' ? '1' : $prefix, 'html' => $subtype === 'HTML', 'encoding' => (int) ($structure->encoding ?? 0)];
    }
    if (!empty($structure->parts) && is_array($structure->parts)) {
        $fallback = null;
        foreach ($structure->parts as $index => $child) {
            $childPrefix = $prefix === '' ? (string) ($index + 1) : $prefix . '.' . ($index + 1);
            $found = text_part($child, $childPrefix);
            if ($found && !$found['html']) {
                return $found;
            }
            if ($found) {
                $fallback = $found;
            }
        }
        return $fallback;
    }
    return null;
}

function decode_body(string $raw, int $encoding): string {
    return match ($encoding) {
        3 => base64_decode($raw, true) ?: '',
        4 => quoted_printable_decode($raw),
        default => $raw,
    };
}

function message_detail(array $config, string $uid): array {
    if (!preg_match('/^\d+$/', $uid)) {
        fail('invalid_message');
    }
    $mailbox = mailbox($config);
    try {
        $overviewRows = @imap_fetch_overview($mailbox, $uid, FT_UID);
        if (!is_array($overviewRows) || !isset($overviewRows[0])) {
            fail('message_not_found', 404);
        }
        $overview = $overviewRows[0];
        $structure = @imap_fetchstructure($mailbox, (int) $uid, FT_UID);
        $part = $structure ? text_part($structure) : null;
        $raw = '';
        if ($part) {
            $raw = (string) @imap_fetchbody($mailbox, (int) $uid, $part['part'], FT_UID | FT_PEEK);
            $raw = decode_body($raw, $part['encoding']);
        }
        if ($raw === '') {
            $raw = (string) @imap_body($mailbox, (int) $uid, FT_UID | FT_PEEK);
        }
        $body = trim(html_entity_decode(strip_tags($raw), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        $body = mb_substr($body, 0, MAX_MESSAGE_BODY_BYTES);
        $state = state_all();
        $summary = message_summary($mailbox, $uid, $overview, $state);
        $classification = priority_for($summary['from'], $summary['subject'], $body);
        if ($summary['category'] === 'Generell henvendelse') {
            $summary['category'] = $classification['category'];
            $summary['priority'] = $classification['priority'];
        }
        return ['message' => array_merge($summary, ['body' => $body])];
    } finally {
        close_mailbox($mailbox);
    }
}

function smtp_read($stream): string {
    $response = '';
    while (($line = fgets($stream, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }
    return $response;
}

function smtp_command($stream, string $command, int $expected): void {
    if ($command !== '') {
        fwrite($stream, $command . "\r\n");
    }
    $response = smtp_read($stream);
    if ((int) substr($response, 0, 3) !== $expected) {
        throw new RuntimeException('SMTP command failed.');
    }
}

function smtp_send(array $config, string $recipient, string $subject, string $body): void {
    if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
        fail('invalid_recipient');
    }
    $subject = safe_header_value(mb_substr($subject, 0, 200));
    $body = trim(mb_substr(str_replace(["\r\n", "\r"], "\n", $body), 0, 25000));
    if ($subject === '' || $body === '') {
        fail('invalid_draft');
    }

    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $stream = @stream_socket_client('tcp://smtp.domeneshop.no:587', $errno, $errstr, 5, STREAM_CLIENT_CONNECT, $context);
    $implicitTls = false;
    if ($stream === false) {
        // Some shared hosting environments block outbound port 587. Fall back to
        // Domeneshop SMTP-over-SSL on port 465, still with strict certificate checks.
        $stream = @stream_socket_client('ssl://smtp.domeneshop.no:465', $errno, $errstr, 5, STREAM_CLIENT_CONNECT, $context);
        $implicitTls = true;
    }
    if ($stream === false) {
        // Last-resort route on shared hosting: use the host's local mail transfer
        // agent. This preserves the same explicit approval requirement in the API.
        $fallbackHeaders = [
            'From: ' . ($config['from_name'] ?? 'ALEX, IntelligentForce') . ' <' . $config['from_email'] . '>',
            'Reply-To: ' . $config['from_email'],
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        if (@mail($recipient, mb_encode_mimeheader($subject, 'UTF-8'), $body, implode("\r\n", $fallbackHeaders))) {
            return;
        }
        throw new RuntimeException('SMTP connection failed.');
    }
    stream_set_timeout($stream, 20);
    try {
        smtp_command($stream, '', 220);
        smtp_command($stream, 'EHLO intelligentforce.ai', 250);
        if (!$implicitTls) {
            smtp_command($stream, 'STARTTLS', 220);
            if (!stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP TLS failed.');
            }
            smtp_command($stream, 'EHLO intelligentforce.ai', 250);
        }
        smtp_command($stream, 'AUTH LOGIN', 334);
        smtp_command($stream, base64_encode($config['imap_username']), 334);
        smtp_command($stream, base64_encode($config['imap_password']), 235);
        smtp_command($stream, 'MAIL FROM:<' . $config['from_email'] . '>', 250);
        smtp_command($stream, 'RCPT TO:<' . $recipient . '>', 250);
        smtp_command($stream, 'DATA', 354);
        $headers = [
            'From: ' . ($config['from_name'] ?? 'ALEX, IntelligentForce') . ' <' . $config['from_email'] . '>',
            'To: ' . $recipient,
            'Reply-To: ' . $config['from_email'],
            'Subject: ' . mb_encode_mimeheader($subject, 'UTF-8'),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        $dotStuffed = preg_replace('/(?m)^\./', '..', $body) ?? $body;
        fwrite($stream, implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n", "\r\n", $dotStuffed) . "\r\n.\r\n");
        $response = smtp_read($stream);
        if ((int) substr($response, 0, 3) !== 250) {
            throw new RuntimeException('SMTP delivery failed.');
        }
        smtp_command($stream, 'QUIT', 221);
    } finally {
        fclose($stream);
    }
}

try {
    $input = request_body();
    $action = (string) ($input['action'] ?? '');
    $config = config();

    if ($action === 'login') {
        $password = (string) ($input['password'] ?? '');
        if ($password === '' || !hash_equals($config['admin_password'], $password)) {
            fail('invalid_credentials', 401);
        }
        issue_session($config);
        respond(['ok' => true]);
    }

    if ($action === 'logout') {
        clear_session();
        respond(['ok' => true]);
    }

    require_session($config);

    if ($action === 'list') {
        respond(['ok' => true, 'messages' => list_messages($config), 'refreshedAt' => gmdate('c')]);
    }

    if ($action === 'get') {
        respond(['ok' => true] + message_detail($config, (string) ($input['uid'] ?? '')));
    }

    if ($action === 'save_analysis') {
        $uid = (string) ($input['uid'] ?? '');
        if (!preg_match('/^\d+$/', $uid)) {
            fail('invalid_message');
        }
        $update = [
            'status' => 'ALEX analysert',
            'summary' => trim(mb_substr((string) ($input['summary'] ?? ''), 0, 1800)),
            'category' => trim(mb_substr((string) ($input['category'] ?? ''), 0, 100)),
            'priority' => trim(mb_substr((string) ($input['priority'] ?? ''), 0, 30)),
            'nextStep' => trim(mb_substr((string) ($input['nextStep'] ?? ''), 0, 600)),
        ];
        respond(['ok' => true, 'state' => state_update($uid, $update)]);
    }

    if ($action === 'save_draft') {
        $uid = (string) ($input['uid'] ?? '');
        if (!preg_match('/^\d+$/', $uid)) {
            fail('invalid_message');
        }
        $draft = trim(mb_substr((string) ($input['draft'] ?? ''), 0, 25000));
        if ($draft === '') {
            fail('invalid_draft');
        }
        respond(['ok' => true, 'state' => state_update($uid, ['status' => 'Venter på Valdi', 'draft' => $draft])]);
    }

    if ($action === 'mark_done') {
        $uid = (string) ($input['uid'] ?? '');
        if (!preg_match('/^\d+$/', $uid)) {
            fail('invalid_message');
        }
        respond(['ok' => true, 'state' => state_update($uid, ['status' => 'Lukket manuelt'])]);
    }

    fail('unknown_action');
} catch (Throwable $exception) {
    // Never return mailbox, SMTP, credential or email content in error responses.
    error_log('ALEX Inbox internal error: ' . get_class($exception));
    respond(['ok' => false, 'error' => 'inbox_service_unavailable'], 503);
}
