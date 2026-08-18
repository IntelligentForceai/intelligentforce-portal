import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { Shield, ArrowLeft } from "lucide-react";

export default function Privacy() {
  useSEO({
    title: "Privacy and Data Notice – IntelligentForce",
    description: "Transition information about enquiries and data submitted to the IntelligentForce platform.",
    canonical: "https://intelligentforce.ai/privacy",
  });
  usePageTracker("/privacy");
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
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">
              {isNo ? "Overgangsinformasjon" : "Transition Information"}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {isNo ? "Personvern og data" : "Privacy and Data"}
          </h1>
          <p className="text-muted-foreground">{isNo ? `Sist oppdatert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {isNo ? (
            <>
              <section className="bg-cyan-500/5 border border-cyan-500/25 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">Plattform under etablering</h2>
                <p>IntelligentForce er under etablering som internasjonal plattform. En registrert juridisk enhet og endelig behandlingsansvarlig for betalte kundeleveranser er ennå ikke publisert. Denne siden forklarer derfor hvordan vi håndterer enkle henvendelser i overgangsperioden, og erstattes av en full personvernerklæring når London-strukturen er registrert.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Hvilke opplysninger du kan sende</h2>
                <p>Hvis du kontakter oss, kan vi motta kontaktopplysninger og innholdet i henvendelsen, for eksempel navn, e-postadresse, organisasjon, rolle og spørsmål om plattformen. Vi bruker dette kun til å besvare henvendelsen, vurdere mulig pilot- eller partnersamarbeid og forbedre vår dialog.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Ikke send sensitive opplysninger</h2>
                <p>Ikke send konfidensielle forretningsopplysninger, særlige kategorier personopplysninger, finansielle data, helseopplysninger, passord, API-nøkler eller annet regulert materiale gjennom offentlige skjemaer eller ALEX-chatten. Slike data skal først håndteres når riktig juridisk enhet, sikker dataflyt og skriftlig kundeavtale er etablert.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Deling og tjenester</h2>
                <p>Vi bruker tekniske tjenester for nettsted, e-post, analyse, betaling i test- eller fremtidig produksjonsoppsett og AI-funksjoner. Vi selger ikke kontaktopplysninger. Kontaktinformasjon deles ikke for markedsføring med tredjeparter uten at det er nødvendig for en konkret, avtalt tjeneste eller du har samtykket.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Oppbevaring og sletting</h2>
                <p>Henvendelser oppbevares bare så lenge det er rimelig nødvendig for oppfølging, dokumentasjon og etablering av korrekt juridisk struktur. Du kan be om innsyn, retting eller sletting av en henvendelse ved å skrive til <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Vi vurderer og besvarer forespørselen så snart som praktisk mulig.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Fremtidig personvernerklæring</h2>
                <p>Før en betalt kundeavtale eller behandling av kundedata starter, publiseres en fullstendig personvernerklæring med registrert juridisk enhet, kontaktpunkt for personvern, behandlingsformål, rettslig grunnlag, oppbevaring, internasjonale overføringer og klagemuligheter.</p>
              </section>
            </>
          ) : (
            <>
              <section className="bg-cyan-500/5 border border-cyan-500/25 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">Platform under establishment</h2>
                <p>IntelligentForce is being established as an international platform. A registered legal entity and final data controller for paid customer delivery have not yet been published. This page therefore explains how simple enquiries are handled during the transition period and will be replaced by a full privacy policy once the London structure is registered.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information you may submit</h2>
                <p>If you contact us, we may receive contact details and the content of your enquiry, such as name, email address, organisation, role and questions about the platform. We use this only to respond, assess potential pilot or partnership work and improve our dialogue.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Do not submit sensitive information</h2>
                <p>Do not submit confidential business information, special-category personal data, financial data, health information, passwords, API keys or other regulated material through public forms or ALEX chat. Such data should be handled only after the appropriate legal entity, secure data flow and written customer agreement are in place.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Sharing and services</h2>
                <p>We use technical services for the website, email, analytics, payment in test or future production arrangements and AI functionality. We do not sell contact information. Contact information is not shared with third parties for marketing unless necessary for a specific agreed service or you have consented.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Retention and deletion</h2>
                <p>Enquiries are retained only as long as reasonably necessary for follow-up, documentation and establishment of the correct legal structure. You may request access, correction or deletion of an enquiry by writing to <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. We will assess and respond as soon as reasonably practicable.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Future privacy policy</h2>
                <p>Before a paid customer agreement or processing of customer data begins, a complete privacy policy will be published with the registered legal entity, privacy contact point, processing purposes, legal bases, retention, international transfers and complaint routes.</p>
              </section>
            </>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="text-white font-bold mb-4">{isNo ? "Andre juridiske dokumenter" : "Other Legal Documents"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: isNo ? "Vilkår for nettstedet" : "Website Terms", href: "/terms", desc: isNo ? "Status og vilkår under etablering" : "Status and transition terms" },
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
