import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { Scale, ArrowLeft } from "lucide-react";

export default function Terms() {
  useSEO({
    title: "Website Terms – IntelligentForce",
    description: "Website terms and pre-registration information for the IntelligentForce platform.",
    canonical: "https://intelligentforce.ai/terms",
  });
  usePageTracker("/terms");
  const { lang } = useLang();
  const isNo = lang === "no";
  const lastUpdated = "18 August 2026";

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <Link href="/legal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm mb-6">
            <ArrowLeft size={16} /> {isNo ? "Tilbake til juridisk oversikt" : "Back to Legal Overview"}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">
              {isNo ? "Overgangsinformasjon" : "Transition Information"}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {isNo ? "Vilkår for nettstedet" : "Website Terms"}
          </h1>
          <p className="text-muted-foreground">{isNo ? `Sist oppdatert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {isNo ? (
            <>
              <section className="bg-cyan-500/5 border border-cyan-500/25 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">Status for plattformen</h2>
                <p>IntelligentForce er en internasjonal AI-automatiseringsplattform under etablering. Ingen juridisk enhet med navnet «IntelligentForce AS» er registrert, og nettstedet skal ikke forstås som at en norsk leverandør eller norsk selskapsregistrering finnes. En fremtidig London-basert holdingsstruktur er under planlegging.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Informasjon, ikke et bindende tilbud</h2>
                <p>Nettstedet beskriver IntelligentForce-konseptet, AI Office, ALEX og mulige tjenester for informasjon, dialog og pilotvurdering. Ingen abonnement, lisens, databehandleravtale, kjøp eller annen bindende tjenesteavtale oppstår bare ved bruk av nettstedet, ALEX-chatten eller ved at du sender en henvendelse.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Pilot og fremtidige avtaler</h2>
                <p>Eventuelle piloter, betalte tjenester, abonnementer eller behandling av kundedata starter først etter at korrekt registrert juridisk enhet er identifisert og en separat skriftlig avtale er inngått. Den avtalen vil angi tjenesteomfang, pris, betalingsvilkår, databehandling, ansvar, lovvalg og kontaktopplysninger.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Ansvarlig bruk</h2>
                <p>Du må ikke bruke nettstedet eller ALEX til ulovlige formål, spam, villedende kommunikasjon, forsøk på uautorisert tilgang, skadelig programvare eller innhold som krenker tredjeparts rettigheter. Ikke send konfidensielle, sensitive eller regulerte personopplysninger gjennom offentlige skjemaer eller chat før en passende avtale og sikker dataflyt er etablert.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. AI-resultater</h2>
                <p>ALEX og de øvrige AI-arbeidsflatene er laget for å støtte menneskelig vurdering. AI-genererte svar kan inneholde feil eller ufullstendigheter og må ikke brukes som eneste grunnlag for juridiske, finansielle, medisinske, regulatoriske eller andre vesentlige beslutninger.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Immaterielle rettigheter</h2>
                <p>Innholdet, programvaren, designet, navnet IntelligentForce og tilhørende materiale på nettstedet kan ikke kopieres, distribueres eller brukes kommersielt uten skriftlig tillatelse fra rettighetshaveren. Dine egne henvendelser og materialer forblir dine, med forbehold om nødvendig behandling for å besvare henvendelsen.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Oppdateringer og kontakt</h2>
                <p>Disse overgangsvilkårene kan oppdateres når den fremtidige juridiske strukturen er registrert. Da publiseres endelige selskapsopplysninger og avtalebetingelser. For pilot-, partner- eller juridiske henvendelser, kontakt <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>.</p>
              </section>
            </>
          ) : (
            <>
              <section className="bg-cyan-500/5 border border-cyan-500/25 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">Platform status</h2>
                <p>IntelligentForce is an international AI automation platform under establishment. No legal entity named “IntelligentForce AS” is registered, and this website must not be understood as representing a Norwegian supplier or Norwegian company registration. A future London-based holding structure is being planned.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information, not a binding offer</h2>
                <p>This website describes the IntelligentForce concept, AI Office, ALEX and potential services for information, dialogue and pilot assessment. No subscription, licence, data processing agreement, purchase or other binding service agreement is formed solely through use of this website, ALEX chat or an enquiry.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Pilots and future agreements</h2>
                <p>Any pilot, paid service, subscription or processing of customer data will begin only after the appropriate registered legal entity has been identified and a separate written agreement has been entered into. That agreement will state the scope, price, payment terms, data processing, liability, governing law and contact details.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Responsible use</h2>
                <p>You must not use the website or ALEX for unlawful purposes, spam, misleading communications, attempts at unauthorised access, malware or content that infringes third-party rights. Do not submit confidential, sensitive or regulated personal data through public forms or chat before an appropriate agreement and secure data flow are in place.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. AI outputs</h2>
                <p>ALEX and the other AI workspaces are designed to support human judgement. AI-generated outputs may contain errors or omissions and must not be used as the sole basis for legal, financial, medical, regulatory or other material decisions.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual property</h2>
                <p>The content, software, design, IntelligentForce name and related material on this website may not be copied, distributed or used commercially without written permission from the rights holder. Your own enquiries and materials remain yours, subject to the processing necessary to respond to your enquiry.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Updates and contact</h2>
                <p>These transition terms may be updated when the future legal structure is registered. Final company details and contractual terms will then be published. For pilot, partnership or legal enquiries, contact <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>.</p>
              </section>
            </>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="text-white font-bold mb-4">{isNo ? "Andre juridiske dokumenter" : "Other Legal Documents"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: isNo ? "Personvern og data" : "Privacy and Data", href: "/privacy", desc: isNo ? "Midlertidig informasjon om henvendelser og data" : "Transition information for enquiries and data" },
              { label: isNo ? "Informasjonskapsler" : "Cookie Policy", href: "/cookies", desc: isNo ? "Hvordan nettstedet bruker informasjonskapsler" : "How the website uses cookies" },
              { label: isNo ? "Juridisk oversikt" : "Legal Overview", href: "/legal", desc: isNo ? "Viktige forbehold og status" : "Key notices and status" },
            ].map((doc) => (
              <Link key={doc.href} href={doc.href} className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/40 transition-colors group">
                <div className="text-white font-bold text-base mb-1 group-hover:text-cyan-300 transition-colors">{doc.label}</div>
                <div className="text-muted-foreground text-sm">{doc.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
