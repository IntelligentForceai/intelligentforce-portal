# IntelligentForce Ownership and Recovery Register

**Purpose:** Maintain a non-sensitive, company-owned reference for every critical service. Passwords, recovery codes, payment details, API keys, and tokens must never be stored in this file or in GitHub. Those belong in a dedicated password manager or sealed company recovery record.

## Ownership standard

Every production-critical provider should ultimately have the following safeguards:

1. An IntelligentForce-controlled primary owner, preferably using a company-controlled email address.
2. Multifactor authentication enabled for the owner account.
3. A documented recovery email or recovery method controlled by IntelligentForce.
4. At least one protected secondary recovery path held by Valdi or an authorised company officer.
5. No critical secret committed to source code or embedded in a browser application.

## Service register

| Service | Business role | Current continuity position | Ownership action | Recovery evidence |
|---|---|---|---|---|
| Domeneshop | Domain, DNS, website hosting, and business email | Core production provider | Confirm company-controlled recovery email and MFA | Domeneshop account recovery details; deployment runbook |
| GitHub | Canonical source code, SQL migrations, operational documentation | Canonical technical source of truth | Confirm organisation ownership and MFA on primary owner | `main` branch; repository clone and deploy instructions |
| Cloudflare | ALEX Worker, R2 ledger archive, secure runtime configuration | Operational runtime and separate backup archive | Move long-term ownership to an IntelligentForce-controlled organisation when practical | Worker source, environment-variable register, R2 retention policy |
| Supabase EU | Enterprise lead ledger and audit data | Permanent operational data store | Keep IntelligentForce organisation owner and Pro subscription details current | Daily backups, 7-day history, versioned SQL migration |
| Zapier | Internal Lead Brief automation | Secondary automation layer; not sole system of record | Keep owner/recovery access documented; add a second administrator when team grows | Zap description, webhook payload description, ledger remains primary record |
| Stripe | Payment Links and future billing | Payment provider; direct links currently do not depend on a production webhook | Confirm business owner, MFA, and live/test separation | Stripe Dashboard, Payment Links list, webhook review record |
| Formspree | Contact form delivery | Separate communication dependency | Confirm owner/recovery access and recipient configuration | Form configuration and mailbox delivery test |
| Google | Analytics, Search Console, business recovery storage | Analytics and secondary document storage | Confirm account recovery and shared company access | Search Console ownership, Drive recovery folder |
| Manus | Development collaboration and task context | Not a production runtime dependency | Retain account and task backup packages before service deadline | `.manusaccount` and `.manustask` packages on PC and Drive |

## Emergency recovery order

If a production incident occurs, restore only the affected layer in this order:

1. Confirm the domain and DNS remain under IntelligentForce control.
2. Restore source from GitHub `main`.
3. Build the portal and deploy through the documented Domeneshop routine.
4. Restore or redeploy ALEX Worker using protected environment variables.
5. Apply the enterprise-ledger migration and restore Supabase or Cloudflare R2 lead snapshot if data recovery is needed.
6. Reconnect or verify Zapier, Formspree, Stripe Payment Links, and analytics.
7. Run public website, ALEX response, admin, lead ledger, and email delivery checks.

## Annual and quarterly checks

| Frequency | Check |
|---|---|
| Monthly | Verify GitHub is current, production website is available, ALEX responds, and Supabase Pro/R2 backup status remains active. |
| Quarterly | Perform a controlled recovery drill using a fresh GitHub clone and a non-production lead snapshot. |
| Annually | Review provider ownership, recovery email, MFA, payment methods, and access for former collaborators. |
| Before a major release | Confirm GitHub commit, database migration, backup status, and rollback route. |

## Sensitive information handling

Store the following only in a protected password manager or company recovery vault: provider passwords, MFA recovery codes, API tokens, private webhook URLs, database service keys, FTP credentials, card details, and domain transfer codes. The repository documents where these are needed, but never their values.

## Current hardening priorities

1. Keep the secure deployment configuration outside GitHub and rotate legacy credentials after the migration is stable.
2. Create an IntelligentForce-controlled company recovery email and use it as the recovery contact for key providers where appropriate.
3. Add a second trusted administrator for GitHub, Supabase, Cloudflare, Zapier, Stripe, and Domeneshop when the operating team expands.
4. Keep the final Manus backup packages current before the 23 August 2026 deadline.
