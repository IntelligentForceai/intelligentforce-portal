# IntelligentForce Platform Independence Inventory

**Status date:** 18 August 2026  
**Purpose:** Record the ownership, recovery paths, and operational role of every production-critical IntelligentForce component. This inventory intentionally contains no passwords, API keys, tokens, or private URLs.

## Current production architecture

| Component | Current owner / provider | Operational role | Recovery path | Current continuity status |
|---|---|---|---|---|
| Public website | IntelligentForce AS / Domeneshop | Hosts `intelligentforce.ai`, static portal assets, admin office, and protected PHP server bridge | Fresh build from GitHub, then controlled FTP deployment | Operational; source and deployment path verified |
| Domain and email | IntelligentForce AS / Domeneshop | Domain, DNS, mailboxes, ALEX Inbox, and forwarding | Domeneshop account administration and mailbox recovery | Operational; ALEX Inbox in use |
| Source code | IntelligentForce AS / GitHub | Canonical source for portal, ALEX worker, database migration, and operations documentation | Clone `main`, build, deploy | Verified; local and remote `main` match |
| ALEX service | IntelligentForce AS / Cloudflare Workers | Public and admin ALEX responses, lead classification, Zapier handoff, database writes, and daily ledger snapshot | Worker source from GitHub plus private environment secrets | Operational; service response verified |
| Lead database | IntelligentForce AS / Supabase EU | Permanent lead records, statuses, and revision events | Versioned SQL migration plus Supabase backups and archive snapshot | Operational; private access and audit model verified |
| Lead archive | IntelligentForce AS / Cloudflare R2 | Separate daily snapshot of lead database and events | 30 retained daily snapshots plus database migration | Operational; snapshot and retention rule verified |
| Lead automation | IntelligentForce AS / Zapier | Internal Lead Brief entry when ALEX detects a serious public enquiry | Reconfigure from documented webhook payload and private endpoint secret | Operational; synthetic end-to-end control test completed |
| Payments | IntelligentForce AS / Stripe | Direct Stripe Payment Links for pricing plans | Stripe Dashboard Payment Links; no production webhook dependency | Payment links are independent of old test webhook |
| Forms | IntelligentForce AS / Formspree | Contact-form delivery to the IntelligentForce mailbox | Formspree account configuration | Operational; separate third-party dependency |
| Website analytics and search | IntelligentForce AS / Google | Analytics and Search Console | Google account access and measurement configuration | Separate third-party dependency |

## Independence principles already in place

The portal is not dependent on Manus for production availability. Website hosting, domain and mail, source code, ALEX service, database, automation, and backups are held across separate service providers. The current Manus transition affects task history and working context, not public IntelligentForce availability.

## Immediate hardening priorities

1. Move deployment credentials out of local deployment code and into a protected environment configuration.
2. Create a concise owner access register for every provider, including the intended company owner, recovery email, multifactor authentication status, and backup contact.
3. Create a quarterly recovery drill: rebuild website from GitHub, verify lead backup integrity, and check each provider owner account.
4. Keep a fresh Manus Task Data Backup before the 23 August 2026 deadline to preserve the development context and decision history.

## Proposed ownership standard

Where possible, all provider accounts should use an IntelligentForce-controlled company email and recovery method, with Valdi as primary owner and at least one protected recovery path. No production-critical service should depend solely on a personal account, an unversioned local file, or a single vendor backup.

## Current recovery order

1. Restore source from GitHub.
2. Rebuild and deploy website to Domeneshop.
3. Deploy ALEX Worker with protected environment variables.
4. Apply enterprise-ledger migration and restore lead snapshot if required.
5. Reconnect Zapier and verify Lead Brief handoff.
6. Confirm domain, mail, Stripe links, analytics, and public ALEX response.

## Revision log

| Date | Change |
|---|---|
| 18 August 2026 | Initial inventory created after GitHub, portal, ALEX, database, and archive verification. |
