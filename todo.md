# IntelligentForce Portal TODO

## Phase 1: Setup
- [x] i18n translation system (NO/EN)
- [x] Global styles matching intelligentforce.ai dark theme
- [x] Navigation component (desktop + mobile hamburger)
- [x] Language toggle (🇳🇴/🇬🇧)
- [x] App.tsx routing for all pages
- [x] ALEX video component (reusable)
- [x] Footer component

## Phase 2: Home + Meet ALEX
- [x] Home page - hero section
- [x] Home page - How it works (3 steps)
- [x] Home page - Why Choose IntelligentForce (6 cards)
- [x] Home page - CTA section
- [x] Meet ALEX page with video placeholder

## Phase 3: Features, Pricing, About Us
- [x] Features page
- [x] Pricing page - 3 tiers + monthly/yearly toggle
- [x] Pricing page - FAQ accordion
- [x] About Us page - story, values, team

## Phase 4: Blog + Contact
- [x] Blog page - 5 real articles
- [x] Blog page - category filters
- [x] Blog page - newsletter signup
- [x] Contact page - form (name, email, category, message)
- [x] Contact page - office info + FAQ

## Phase 5: Footer + Social
- [x] Footer with all internal links
- [x] Social media icon placeholders (LinkedIn, Instagram, Facebook)
- [x] Correct contact emails

## Phase 6: QA
- [x] Mobile responsiveness all pages
- [x] Tablet responsiveness all pages
- [x] All translation keys replaced
- [x] Video slots ready for HeyGen MP4
- [x] Checkpoint saved
- [x] Push to GitHub

## Phase 7: Content Updates
- [x] Fjerne telefonnummer fra alle sider (kun e-post)
- [x] Legge inn ALEX sin e-post: alex@intelligentforce.ai på alle sider
- [x] Komprimere og laste opp ALEX-videoer fra HeyGen
- [x] Koble videoer til riktige sider i portalen

## Phase 8: Admin-panel og statistikk
- [x] Nytt databaseskjema: admin_credentials, contact_submissions, page_views, agent_views
- [x] Backend: adminRouter med password-login, portalhelse, dashbord-statistikk
- [x] Backend: portalRouter med kontaktskjema-lagring og sidevisnings-tracking
- [x] Frontend: AdminLogin-side (/admin) med sikker innlogging
- [x] Frontend: AdminDashboard (/admin/dashboard) med 5 faner
  - [x] Oversikt: nøkkeltall (besøk 24t/7d, uleste henvendelser, agenter)
  - [x] Portalhelse: alle 7 sider med responstid og statuskode
  - [x] Besøksstatistikk: daglig søylediagram + side-breakdown
  - [x] Agentaktivitet: topp-agenter med antall visninger
  - [x] Kontakthenvendelser: liste med utvidbar visning + merk-som-lest
- [x] Auto-refresh hvert 5. minutt i dashbordet
- [x] Sidevisnings-tracking på alle 7 offentlige sider
- [x] Agentvisnings-tracking på Funksjoner-siden
- [x] Kontaktskjema koblet til database via tRPC
- [x] Admin-ruter isolert fra public Navbar/Footer

## Neste steg
- [ ] Pushe alle endringer til GitHub (branch: main)
- [ ] Kjøre db:push for å opprette nye tabeller i produksjonsdatabasen
- [ ] Verifisere admin-innlogging på live portal
