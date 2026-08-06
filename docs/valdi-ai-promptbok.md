# Valdi's AI Promptbok
### IntelligentForce — Personlig Arbeidsverktøy for AI-kommunikasjon
*Versjon 1.0 — August 2026*

---

> **Hvordan bruke denne boken:**
> Finn kategorien som passer oppgaven din. Kopier promptmalen. Fyll inn variablene i `[KLAMMER]`. Send til Manus eller annen AI. Legg til egne notater etter hvert som du oppdager hva som fungerer best.

---

## DEL 1 — PLATTFORMUTVIKLING

### 1.1 Legge til nye elementer

**Gullprompt — Ny knapp:**
```
Legg til en [FARGE] knapp på [SIDE/KOMPONENT] med teksten "[KNAPP-TEKST]".
Knappen skal [HANDLING — f.eks. åpne en modal / lenke til /side / trigge en funksjon].
Plasser den [PLASSERING — f.eks. øverst til høyre / ved siden av eksisterende knapper].
Ikke endre noe annet på siden.
```
*Eksempel fra praksis: "Legg til en cyan knapp i hero-seksjonen med teksten '▶ Introduksjonsvideo'. Knappen skal åpne en video-modal. Plasser den ved siden av de andre CTA-knappene. Ikke endre noe annet."*

---

**Gullprompt — Ny seksjon på en side:**
```
Legg til en ny seksjon på [SIDE] mellom [SEKSJON OVER] og [SEKSJON UNDER].
Seksjonen skal inneholde: [INNHOLD].
Bruk samme visuelle stil som resten av siden (mørk bakgrunn, cyan aksenter).
Ikke endre eksisterende seksjoner.
```

---

**Gullprompt — Ny fane i admin:**
```
Legg til en ny fane i admin.html ved siden av de eksisterende fanene.
Fane-navn: "[NAVN]"
Innhold: [BESKRIV HVA SOM SKAL VISES]
Bruk samme design som de andre fanene.
```

---

### 1.2 Endre design og utseende

**Gullprompt — Endre farger/stil:**
```
Endre [ELEMENT] på [SIDE] fra [NÅVÆRENDE UTSEENDE] til [ØNSKET UTSEENDE].
Behold all funksjonalitet. Endre kun det visuelle.
```

**Gullprompt — Responsivt design:**
```
Sjekk at [KOMPONENT/SIDE] ser bra ut på mobil, nettbrett og desktop.
Fiks eventuelle layoutproblemer. Behold desktop-versjonen som den er.
```

---

### 1.3 Feilsøking og debugging

**Gullprompt — Fiks en feil:**
```
[BESKRIV FEILEN NØYAKTIG — hva skjer, når skjer det, på hvilken side/funksjon]
Fiks dette uten å endre annen funksjonalitet.
Forklar kort hva som var problemet og hva du endret.
```
*Tips: Jo mer konkret du beskriver feilen, jo raskere løses den. "Det fungerer ikke" tar lengre tid enn "Knappen reagerer ikke på klikk på mobil i Chrome".*

---

**Gullprompt — Sjekk status:**
```
Sjekk at [FUNKSJON/SIDE] fungerer som forventet.
Test [SPESIFIKK SCENARIO].
Rapporter hva som fungerer og hva som eventuelt ikke fungerer.
```

---

### 1.4 Deploy og publisering

**Gullprompt — Bygg og deploy:**
```
Bygg prosjektet, deploy til intelligentforce.ai og push til GitHub.
Bekreft at alt er live og fungerer.
```

**Gullprompt — Kun deploy (ingen bygg):**
```
Last opp [FIL] direkte til serveren uten å bygge hele prosjektet.
Bekreft at filen er tilgjengelig på [URL].
```

---

## DEL 2 — ALEX OG AI-AGENTER

### 2.1 Oppdatere ALEX sin kunnskap

**Gullprompt — Ny kunnskap til ALEX:**
```
Oppdater ALEX sin systemprompt med følgende nye informasjon:
[INFORMASJON]
Behold eksisterende tone, personlighet og alle andre instruksjoner.
Deploy Cloudflare Worker etter endringen.
```
*Eksempel fra praksis: "Oppdater ALEX sin systemprompt med: 'ALEX og agentene er trent på et enormt kunnskapsgrunnlag innen forretning, teknologi og bransjelogikk...'"*

---

**Gullprompt — Endre ALEX sin personlighet/tone:**
```
Juster ALEX sin tone i [ADMIN/OFFENTLIG] chat til å være mer [EGENSKAP — f.eks. direkte / varm / teknisk].
Behold all eksisterende kunnskap og instruksjoner.
Gi meg 3 eksempler på hvordan hun vil svare annerledes etter endringen.
```

---

**Gullprompt — Ny agent:**
```
Legg til en ny AI-agent kalt "[NAVN]" med spesialitet innen [FAGOMRÅDE].
Agenten skal:
- Hjelpe med: [OPPGAVER]
- Tone: [TONE]
- Typiske svar: [EKSEMPLER]
Integrer agenten i admin-portalen og oppdater ALEX sin kunnskap om agenten.
```

---

### 2.2 Chat og samtaleflyt

**Gullprompt — Forbedre samtalelogikk:**
```
ALEX skal nå [NY OPPFØRSEL — f.eks. alltid stille et kvalifiseringsspørsmål / identifisere brukertype / foreslå neste steg].
Implementer dette i Cloudflare Worker systemprompt.
Test at det fungerer med et eksempel.
```

**Gullprompt — Legge til oppfølgingspromter:**
```
Legg til klikkbare oppfølgingspromter i [CHAT-KOMPONENT].
Promptene skal komme fra [KILDE — f.eks. API-svar / statisk liste].
Design: [BESKRIV ØNSKET UTSEENDE].
```

---

## DEL 3 — INNHOLD OG TEKST

### 3.1 Nettsideinnhold

**Gullprompt — Ny bloggpost:**
```
Skriv en bloggpost om [TEMA] for IntelligentForce sin blogg.
Målgruppe: [HVEM — f.eks. CFO-er i mellomstore bedrifter / investorer / HR-ledere]
Tone: Profesjonell, kunnskapsrik, ikke for teknisk
Lengde: Ca. 800–1200 ord
Inkluder: En konkret case/eksempel, 2–3 statistikker, en CTA mot Business Health Check
Språk: [NORSK/ENGELSK]
```

---

**Gullprompt — Oppdatere sidetekst:**
```
Oppdater teksten på [SIDE/SEKSJON] til å kommunisere [BUDSKAP] bedre.
Målgruppe: [HVEM]
Behold eksisterende struktur og design. Endre kun teksten.
Gi meg norsk og engelsk versjon.
```

---

### 3.2 Investorkommunikasjon

**Gullprompt — Investorpitch:**
```
Skriv en [LENGDE — f.eks. one-pager / 10-slides pitch] for IntelligentForce rettet mot [INVESTORTYPE — f.eks. norske formuesforvaltere i Zürich / europeiske PE-fond].
Fokus på: Markedsstørrelse, differensiering, traction, kapitalbehov og bruk av midler.
Tone: Konsis, faktabasert, ambisiøs men troverdig.
```

**Gullprompt — Investore-post:**
```
Skriv en kort, personlig e-post til en [TYPE INVESTOR] som introduserer IntelligentForce.
Maks 150 ord. Ingen vedlegg. Avslutt med en enkel invitasjon til en 20-minutters samtale.
Tone: Direkte og respektfull — ikke selgende.
```

---

### 3.3 ALEX sine scripts (HeyGen)

**Gullprompt — Nytt presentasjonsscript:**
```
Skriv et presentasjonsscript for ALEX (HeyGen-avatar) om [TEMA].
Varighet: Ca. [MINUTTER] minutter
Målgruppe: [HVEM]
Tone: Profesjonell, overbevisende, varm
Format: Ren tekst uten scene-markører eller instruksjoner — bare det ALEX sier
Språk: [NORSK/ENGELSK]
```

---

## DEL 4 — STRATEGI OG FORRETNING

### 4.1 Analyse og planlegging

**Gullprompt — Markedsanalyse:**
```
Analyser [MARKED/SEGMENT] for IntelligentForce.
Inkluder: Størrelse, vekstrate, nøkkelaktører, inngangsbarrierer og muligheter.
Fokus på [GEOGRAFI — f.eks. Norden / DACH / UK].
Gi konkrete anbefalinger for hvordan IntelligentForce kan posisjonere seg.
```

**Gullprompt — Fremdriftsplan:**
```
Lag en detaljert fremdriftsplan for [MÅL] over [TIDSPERIODE].
Organiser i faser med konkrete leveranser og tidsfrister.
Inkluder avhengigheter og risikofaktorer.
Format: Tabell med fase, hva, hvem, når og suksesskriterier.
```

---

### 4.2 Automatisering og prosesser

**Gullprompt — Automatiser en prosess:**
```
Jeg bruker [TID] per [PERIODE] på [OPPGAVE].
Foreslå hvordan ALEX eller en av agentene kan automatisere dette.
Beskriv konkret hva som trengs teknisk og hva resultatet vil bli.
```

**Gullprompt — Zapier-integrasjon:**
```
Sett opp en Zapier-automatisering som:
Trigger: [HVA STARTER FLYTEN]
Handling: [HVA SKAL SKJE]
Mål: [ØNSKET RESULTAT]
Gi meg trinn-for-trinn instruksjoner.
```

---

## DEL 5 — VIDEO OG MEDIA

### 5.1 HeyGen og video

**Gullprompt — Komprimere video:**
```
Komprimer [VIDEOFIL] til maks [STØRRELSE MB] uten synlig kvalitetstap.
Behold original oppløsning hvis mulig. Behold undertekster.
Last opp til /videos/ på serveren og bekreft URL.
```

**Gullprompt — Integrere video på siden:**
```
Integrer videoen [URL/FILNAVN] på [SIDE].
Den skal vises som [AUTOPLAY / KLIKK-FOR-PLAY / MODAL].
Plassering: [BESKRIV PLASSERING]
Ikke endre annet innhold på siden.
```

---

### 5.2 Bilder og grafikk

**Gullprompt — Generere bilde:**
```
Generer et profesjonelt bilde av [MOTIV].
Stil: [STIL — f.eks. fotorealistisk / illustrasjon / corporate]
Fargepalett: Mørk bakgrunn, cyan og blå aksenter (IntelligentForce-stil)
Format: [KVADRAT / 16:9 / 9:16]
Bruk: [HVOR BILDET SKAL BRUKES]
```

---

## DEL 6 — GULLPROMPTS FRA PRAKSIS

Dette er de 15 promptene fra vårt faktiske arbeid som har gitt de beste resultatene:

| # | Prompt (forkortet) | Resultat |
|---|-------------------|---------|
| 1 | "Legg til ALEX-portrettbilde i chat-headeren og ved siden av hvert svar" | ALEX fikk ekte ansikt i chat |
| 2 | "Oppdater ALEX sin systemprompt: hun skal identifisere brukertype og gi 3 kontekstuelle oppfølgingspromter" | Intelligent samtaleflyt |
| 3 | "Implementer automatisk språkdeteksjon — norsk for norske, engelsk for engelskspråklige, Google Translate-banner for andre" | Global plattform på én dag |
| 4 | "Legg til 🌐 Translate-knapp i navbaren med dropdown for 18 språk" | Universell tilgjengelighet |
| 5 | "Komprimere video til maks 25 MB uten synlig kvalitetstap, behold undertekster" | 48 MB → 24 MB, full kvalitet |
| 6 | "Legg til en fjerde CTA-knapp i hero-seksjonen: '▶ Introduksjonsvideo' som åpner video i modal" | Videoen tilgjengelig fra forsiden |
| 7 | "ALEX skal svare på brukerens eget språk — oppdater systemprompt og legg til setning i velkomstmelding" | ALEX er genuint flerspråklig |
| 8 | "Sjekk Git-historikken for å se hva vi hadde på forsiden før — ingen endringer, bare les" | Trygg historikksjekk |
| 9 | "Fiks TTS slik at ALEX alltid leser opp det hun skriver — AudioContext-metode" | Talesvar uten autoplay-blokkering |
| 10 | "Lag en komplett prosjektplan for IntelligentForce som PDF og Markdown" | Strukturert veikart |
| 11 | "Oppdater ALEX sin kunnskap: hun er trent på enormt kunnskapsgrunnlag, kan integreres med ERP/CRM" | Ærlig og overbevisende posisjonering |
| 12 | "Bygg AI Office i admin.html med App Launcher, navigasjonsfaner og ALEX stor senter-chat" | Fullverdig digitalt kontor |
| 13 | "Legg til mikrofon-knapp i ALEX-chat — Web Speech API for input, OpenAI TTS for output" | Tale-til-tale med ALEX |
| 14 | "Kontorbildet med ALEX + AI-agenter som hero-bakgrunn på forsiden" | Profesjonell visuell identitet |
| 15 | "Lag ren tekstversjon av script uten scene-markører, klar for HeyGen" | Direkte brukbar i HeyGen |

---

## DEL 7 — PROMPTPRINSIPPER

### De 7 reglene for effektiv AI-kommunikasjon

**Regel 1 — Vær konkret, ikke generell**
❌ "Gjør det bedre"
✅ "Endre bakgrunnsfargen på hero-seksjonen til #0a1628 og øk skriftstørrelsen på tittelen til 48px"

**Regel 2 — Definer grenser**
Alltid si hva som IKKE skal endres. "Ikke endre noe annet" er en av de viktigste setningene i AI-kommunikasjon.

**Regel 3 — Gi kontekst**
AI-en vet ikke hva du tenker. Jo mer bakgrunn du gir, jo bedre resultat. Hvem er målgruppen? Hva er formålet? Hva har vi prøvd før?

**Regel 4 — Tenk høyt**
Det du gjør naturlig — å tenke høyt — er faktisk den beste måten å kommunisere med AI på. Del tanker, ikke bare instruksjoner.

**Regel 5 — Bryt store oppgaver i sekvenser**
"Bygg hele plattformen" fungerer dårlig. "Bygg først navigasjonen, så hero-seksjonen, så chat-komponenten" fungerer utmerket.

**Regel 6 — Gi tilbakemelding**
"Det fungerer bra, men stemmen hakker" er gull. Spesifikk tilbakemelding gir spesifikke forbedringer.

**Regel 7 — Bekreft og iterer**
Sjekk resultatet, si hva som er bra og hva som kan forbedres. AI-utvikling er en dialog, ikke en enveiskommunikasjon.

---

## NOTATER OG EGNE TILLEGG

*(Bruk dette området til å legge til egne prompts og observasjoner etter hvert)*

---

*Sist oppdatert: August 2026 | Laget av Valdi Petrov & Manus AI*
*IntelligentForce AI — intelligentforce.ai*
