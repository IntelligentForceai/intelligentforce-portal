# IntelligentForce Enterprise Lead Ledger — Backup & Restore Runbook

## Purpose

This runbook documents the protection of the IntelligentForce Enterprise Lead Ledger. The ledger is the permanent internal record for qualified ALEX leads, their status and the associated audit trail.

## Active protection layers

| Layer | Location | Schedule / retention | Purpose |
|---|---|---:|---|
| Primary ledger | Supabase PostgreSQL, EU Central (Frankfurt) | Live | System of record for leads and audit events |
| Managed database backups | Supabase Pro | Daily, 7 days | Fast provider-level recovery from database failure or accidental data loss |
| Independent application snapshot | Private Cloudflare R2 bucket `intelligentforce-lead-ledger-backups` | Daily at 02:15 UTC, 30 days | Independent copy outside Supabase for ledger recovery |
| Schema source of truth | GitHub | Version-controlled | Restores tables, access controls and audit triggers before data import |

## What the daily archive contains

Each private R2 snapshot contains a JSON representation of:

- `leads`
- `lead_events`
- Record counts and UTC creation time
- Schema version and archive source metadata

Snapshots are written under the `supabase-ledger/` prefix. R2 lifecycle management expires snapshots after 30 days. The bucket has no public domain and is only accessible through private Cloudflare account permissions and the ALEX Worker binding.

## Normal operation

No daily manual action is required. The ALEX Worker runs the archive job at 02:15 UTC each day. A controlled backup test may be run through the private internal backup endpoint, which is protected by a Worker secret and is never available to browsers or customers.

## Recovery sequence

1. Determine the recovery point and confirm whether the issue is within the last seven days.
2. For a recent database incident, use the Supabase Pro backup process first.
3. If an independent copy is needed, retrieve the required private R2 snapshot using the Cloudflare account.
4. Apply `cloudflare-worker/migrations/001_enterprise_lead_ledger.sql` to a clean or restored Supabase project.
5. Validate the snapshot's schema version and record counts.
6. Import `leads` before `lead_events` to preserve foreign-key relationships.
7. Verify row-level security, server-role grants and AI Office access before reconnecting ALEX.
8. Record the restoration event in the operational log and create a fresh archive after validation.

## Security boundaries

- Supabase service keys, Worker secrets and R2 bindings are server-only.
- No database credentials, R2 credentials or archive URLs are present in the browser, `admin.html` or GitHub.
- Public ALEX chat cannot request, list, read or restore archive objects.
- ALEX chat responses are never blocked by archive failures.

## Review routine

Review the backup status after the first automatic run and then monthly. Before onboarding external users or storing sensitive customer documents, confirm that Supabase Pro remains active, R2 snapshots are being written, lifecycle retention is 30 days and the restore runbook is still current.
