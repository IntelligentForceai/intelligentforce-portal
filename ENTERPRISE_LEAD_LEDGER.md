# IntelligentForce Enterprise Lead Ledger

## Formål

Enterprise Lead Ledger er IntelligentForce sin permanente, EU-baserte internlogg for kvalifiserte ALEX-henvendelser. Den er opprettet for å gi Valdi kontroll over prioritering, status og oppfølging uten at kundekommunikasjon automatiseres.

## Arkitektur

| Komponent | Ansvar |
|---|---|
| Offentlig ALEX-chat | Identifiserer seriøse henvendelser og ber om én intern Lead Brief per samtale.
| ALEX Worker | Skriver et begrenset Lead Brief til enterprise-ledgeren via en privat servernøkkel.
| Supabase i EU | Permanent PostgreSQL-ledger med `leads`, `lead_events` og fremtidige tilgangsroller.
| Zapier Lead Brief | Praktisk intern automasjon og oversikt; ikke eneste permanente datakilde.
| AI Office | Øktbeskyttet oversikt der Valdi kan se leads og oppdatere status.

## Sikkerhetsgrenser

- Ingen nettleserklient har direkte tilgang til databasen.
- Databasen bruker Row Level Security, og offentlige roller har ingen rettigheter til ledger-tabellene.
- Supabase-servernøkkelen finnes kun i private serverhemmeligheter og blir aldri lagt i GitHub eller `admin.html`.
- ALEX registrerer kun én Lead Brief per beholdt offentlig chatsamtale.
- Lead Brief inneholder et begrenset sammendrag, prioritet, foreslått neste steg og tidspunkt. Den sender ikke kundesvar, vedlegg eller full chatlogg til Zapier.
- Statusoppdateringer i AI Office lager en separat revisjonshendelse i `lead_events`.

## Arbeidsflyt

1. En seriøs offentlig henvendelse blir identifisert av ALEX.
2. ALEX oppretter en permanent leadpost og revisjonshendelser i enterprise-ledgeren.
3. Zapier mottar et kort internt Lead Brief for praktisk oppfølging.
4. Valdi åpner **Lead Ledger** i AI Office og vurderer status.
5. Kundesvar håndteres fortsatt gjennom ALEX Inbox sin godkjenningsflyt; ingenting sendes automatisk fra ledgeren.

## Driftsnotat

Kontrolltester må merkes `CONTROL TEST ONLY`. Slike poster skjules i AI Office-oversikten og skal arkiveres etter test. Før kundedata eller flere brukere tas i bruk, skal rollemodellen i `lead_access_roles` kobles til en dedikert intern autentiseringsflyt.
