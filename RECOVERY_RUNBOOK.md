# IntelligentForce Recovery Runbook

**Purpose:** Restore IntelligentForce after a website, automation, data, or provider incident. This document contains no secrets. Required credentials are held only in the protected company recovery vault.

## Recovery objectives

| Layer | Target outcome | Primary recovery source |
|---|---|---|
| Public portal | `intelligentforce.ai` and `admin.html` return normally | GitHub source + Domeneshop deployment routine |
| ALEX service | Public and admin chat respond correctly | GitHub Worker source + protected Worker environment variables |
| Lead ledger | Lead records and audit history are available | Supabase daily backups + Cloudflare R2 daily snapshots |
| Lead automation | Serious public leads generate an internal Lead Brief | Zapier workflow + Worker webhook configuration |
| Business email | ALEX Inbox and public mail addresses operate normally | Domeneshop mail administration |

## Incident classification

| Situation | First action | Do not do |
|---|---|---|
| Website unavailable | Verify domain/DNS first, then deploy last known GitHub version | Do not change domain registrar settings without a recovery plan |
| ALEX unavailable | Verify public endpoint, then redeploy current Worker version | Do not expose Worker secrets in browser code or GitHub |
| Admin unavailable | Verify website deployment and protected PHP bridge | Do not reset credentials without recording the recovery change |
| Lead data missing | Stop new data-changing actions, identify latest restore point | Do not overwrite database records before selecting restore point |
| Zapier handoff fails | Confirm the permanent ledger still receives leads; then repair Zapier | Do not treat Zapier as the only lead record |
| Stripe warning | Check Live Mode versus Test Mode and inspect endpoint role | Do not remove live endpoints without checking Payment Links and subscriptions |

## Website recovery

1. Clone or update the repository from GitHub.
2. Build the portal:

   ```bash
   cd /home/ubuntu/intelligentforce-portal
   rm -rf dist/public
   NODE_ENV=production npx vite build
   ```

3. Confirm the private deploy config exists outside the repository and is permissioned `600`.
4. Run the protected deploy routine:

   ```bash
   python3 scripts/deploy_domeneshop.py
   ```

5. Verify `https://intelligentforce.ai/` and `https://intelligentforce.ai/admin.html` return normally.

## ALEX Worker recovery

1. Confirm the Cloudflare Worker source from GitHub matches the intended release.
2. Confirm protected server secrets exist in Cloudflare; never add them to source code.
3. Deploy the Worker using the documented Worker configuration.
4. Send one control request with `controlMode: true` and `leadCapture: false`.
5. Confirm no synthetic control request created a real lead or customer notification.

## Enterprise lead ledger recovery

1. Identify the recovery requirement: single-record correction, Supabase restore, or independent R2 archive recovery.
2. For normal database incidents within the backup window, use the appropriate Supabase restore point.
3. If a separate archive is required, retrieve the chosen private R2 snapshot and restore the `leads` and `lead_events` records only after taking a preservation copy of the current state.
4. Restore schema from `cloudflare-worker/migrations/001_enterprise_lead_ledger.sql` if necessary.
5. Confirm record count, audit-event count, admin visibility, and ALEX write access after restoration.

## Routine verification

| Frequency | Verification |
|---|---|
| Monthly | GitHub main is current; public portal and admin return HTTP 200; ALEX responds to a control request; Supabase Pro and R2 archive remain active. |
| Quarterly | Run a non-production recovery drill with a synthetic ledger record; verify runbook accuracy. |
| Before major release | Check database migration, GitHub commit, R2 retention, Stripe mode, and deployment result. |

## Contact and ownership rule

Never store passwords, access tokens, API keys, recovery codes, card details, or domain transfer codes in this repository. Use the company recovery vault and the ownership register instead.
