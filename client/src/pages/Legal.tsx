import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { BookOpen, Scale, Shield, Cookie, AlertTriangle } from "lucide-react";

export default function Legal() {
  useSEO({
    title: "Legal Information – IntelligentForce",
    description: "Legal information and important transition notices for the IntelligentForce platform.",
    canonical: "https://intelligentforce.ai/legal",
  });
  usePageTracker("/legal");
  const { lang } = useLang();
  const isNo = lang === "no";
  const lastUpdated = "18 August 2026";

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">
              {isNo ? "Juridisk informasjon" : "Legal Information"}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {isNo ? "Juridisk oversikt" : "Legal Overview"}
          </h1>
          <p className="text-muted-foreground">{isNo ? `Sist oppdatert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {[
            { label: isNo ? "Vilkår for nettstedet" : "Website Terms", href: "/terms", icon: Scale, desc: isNo ? "Status og vilkår under etablering" : "Status and transition terms" },
            { label: isNo ? "Personvern og data" : "Privacy and Data", href: "/privacy", icon: Shield, desc: isNo ? "Henvendelser og data før kundeleveranse" : "Enquiries and data before service delivery" },
            { label: isNo ? "Informasjonskapsler" : "Cookie Policy", href: "/cookies", icon: Cookie, desc: isNo ? "Nettstedets informasjonskapsler" : "Website cookies" },
            { label: isNo ? "Ansvarsfraskrivelse" : "Disclaimer", href: "#disclaimer", icon: AlertTriangle, desc: isNo ? "Viktige forbehold" : "Important limitations" },
          ].map((doc) => (
            <Link key={doc.href} href={doc.href} className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/40 transition-colors group">
              <doc.icon className="w-5 h-5 text-cyan-400 mb-3" />
              <div className="text-white font-bold text-sm mb-1 group-hover:text-cyan-300 transition-colors">{doc.label}</div>
              <div className="text-muted-foreground text-xs">{doc.desc}</div>
            </Link>
          ))}
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed" id="disclaimer">
          {isNo ? (
            <>
              <section className="bg-cyan-500/5 border border-cyan-500/25 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-3">Selskapsstatus</h2>
                <p>IntelligentForce er en internasjonal plattform under etablering. Ingen juridisk enhet med navnet «IntelligentForce AS» er registrert, og nettstedet representerer ikke et norsk aksjeselskap eller en norsk leverandør. En London-basert holdingsstruktur er under planlegging. Endelig juridisk selskapsnavn, nummer, registrert adresse, behandlingsansvarlig og lovvalg publiseres før betalte kundeleveranser starter.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Nettstedsansvarsfraskrivelse</h2>
                <p>Innholdet på intelligentforce.ai er gitt for generell informasjon, produktdemonstrasjon og dialog om mulig pilot- eller partnersamarbeid. Det er ikke et bindende tilbud, et løfte om bestemt funksjonalitet eller et løfte om bestemt økonomisk resultat. Du bruker informasjonen på eget ansvar og bør innhente selvstendig faglig vurdering der det er nødvendig.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">AI og automatisering</h2>
                <p>ALEX og de øvrige AI-arbeidsflatene er ment å støtte menneskelig vurdering, ikke erstatte den. AI-generert innhold kan inneholde feil, mangler eller upassende forslag. Viktig informasjon må verifiseres fra relevante kilder, og juridiske, finansielle, medisinske, regulatoriske og andre vesentlige beslutninger må vurderes av kvalifiserte fagpersoner.</p>
                <p className="mt-3">Ytelsestall, tidsbesparelser, kostnadsreduksjoner og ROI-eksempler er illustrative estimater eller scenarioavhengige eksempler. De utgjør ikke garanti for fremtidige resultater for en bestemt kunde.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Piloter, betaling og personopplysninger</h2>
                <p>IntelligentForce tar for tiden imot henvendelser og vurderer mulige piloter. Betalte tjenester, abonnementer, behandling av kundedata og databehandleravtaler starter først etter at relevant juridisk enhet og separat skriftlig avtale er på plass. Ikke send konfidensielle, sensitive eller regulerte opplysninger gjennom offentlige skjemaer eller chat før en passende sikker dataflyt og avtale er etablert.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Investering, tredjepartslenker og immaterielle rettigheter</h2>
                <p>Ingenting på nettstedet utgjør investerings-, finans- eller juridisk rådgivning, eller et offentlig tilbud om verdipapirer. Tredjepartslenker er kun gitt av praktiske grunner. Innholdet, designet, IntelligentForce-navnet og programvarematerialet kan ikke kopieres eller brukes kommersielt uten skriftlig tillatelse fra rettighetshaveren.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Kontakt</h2>
                <p>For pilot-, partner-, investor- eller juridiske henvendelser, kontakt <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Endelige selskaps- og avtaleopplysninger publiseres når London-strukturen er registrert.</p>
              </section>
            </>
          ) : (
            <>
              <section className="bg-cyan-500/5 border border-cyan-500/25 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-3">Company status</h2>
                <p>IntelligentForce is an international platform under establishment. No legal entity named “IntelligentForce AS” is registered, and this website does not represent a Norwegian limited company or Norwegian supplier. A London-based holding structure is being planned. The final legal company name, number, registered address, data controller and governing law will be published before paid customer delivery begins.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Website disclaimer</h2>
                <p>The content on intelligentforce.ai is provided for general information, product demonstration and dialogue about potential pilot or partnership work. It is not a binding offer, promise of particular functionality or promise of a particular economic outcome. You use the information at your own risk and should obtain independent professional advice where needed.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">AI and automation</h2>
                <p>ALEX and the other AI workspaces are intended to support human judgement, not replace it. AI-generated content may contain errors, omissions or unsuitable suggestions. Important information must be verified from relevant sources, and legal, financial, medical, regulatory and other material decisions must be assessed by qualified professionals.</p>
                <p className="mt-3">Performance figures, time savings, cost reductions and ROI examples are illustrative estimates or scenario-dependent examples. They do not guarantee future results for any particular customer.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Pilots, payment and personal data</h2>
                <p>IntelligentForce currently accepts enquiries and evaluates potential pilots. Paid services, subscriptions, processing of customer data and data processing agreements will begin only after the relevant legal entity and a separate written agreement are in place. Do not submit confidential, sensitive or regulated information through public forms or chat before an appropriate secure data flow and agreement have been established.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Investment, third-party links and intellectual property</h2>
                <p>Nothing on this website constitutes investment, financial or legal advice, or a public offer of securities. Third-party links are provided only for convenience. Content, design, the IntelligentForce name and software material may not be copied or used commercially without written permission from the rights holder.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
                <p>For pilot, partnership, investor or legal enquiries, contact <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Final company and contractual information will be published once the London structure is registered.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
