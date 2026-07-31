import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { BookOpen, Scale, Shield, Cookie, AlertTriangle } from "lucide-react";

export default function Legal() {
  useSEO({
    title: "Legal – IntelligentForce",
    description: "Legal information, disclaimers and policies for IntelligentForce AS. AI disclaimer, website disclaimer, governing law and more.",
    canonical: "https://intelligentforce.ai/legal",
  });
  usePageTracker("/legal");
  const { lang } = useLang();
  const isNo = lang === "no";
  const lastUpdated = "31 July 2026";

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

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {[
            { label: isNo ? "Vilkår for bruk" : "Terms of Service", href: "/terms", icon: Scale, desc: isNo ? "Regler for bruk av plattformen" : "Rules governing use of our platform" },
            { label: isNo ? "Personvernerklæring" : "Privacy Policy", href: "/privacy", icon: Shield, desc: isNo ? "Hvordan vi behandler dine data" : "How we handle your data" },
            { label: isNo ? "Informasjonskapsler" : "Cookie Policy", href: "/cookies", icon: Cookie, desc: isNo ? "Vår bruk av informasjonskapsler" : "Our use of cookies" },
            { label: isNo ? "Ansvarsfraskrivelse" : "Disclaimer", href: "#disclaimer", icon: AlertTriangle, desc: isNo ? "Viktige forbehold og begrensninger" : "Important caveats and limitations" },
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
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Selskapsinformasjon</h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-1">
                  <p className="text-white font-semibold">IntelligentForce AS</p>
                  <p>Registrert i Norge</p>
                  <p>E-post: <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a></p>
                  <p>Nettsted: <a href="https://intelligentforce.ai" className="text-cyan-400 hover:underline">intelligentforce.ai</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Nettstedsansvarsfraskrivelse</h2>
                <p>Informasjonen på intelligentforce.ai er gitt for generelle informasjonsformål. Selv om vi gjør alt vi kan for å sikre nøyaktigheten og fullstendigheten av informasjonen, gir IntelligentForce AS ingen garantier, verken uttrykkelige eller underforståtte, om fullstendigheten, nøyaktigheten, påliteligheten, egnetheten eller tilgjengeligheten av informasjonen, produktene, tjenestene eller relatert grafikk på nettstedet. Enhver tillit du setter til slik informasjon er derfor utelukkende på din egen risiko.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">AI og automatiseringsansvarsfraskrivelse</h2>
                <p>IntelligentForce tilbyr AI-drevne automatiseringstjenester designet for å forbedre forretningseffektiviteten. Resultatene fra AI-agentene er ment å støtte — ikke erstatte — menneskelig vurdering og beslutningstaking. Forretningsresultater varierer avhengig av spesifikk kontekst, kvaliteten på inndata og implementering.</p>
                <p className="mt-3">Statistikk og ytelsestall sitert på dette nettstedet representerer resultater oppnådd av kunder under spesifikke forhold og utgjør ikke en garanti for fremtidig ytelse for noen bestemt kunde. ROI-estimater er basert på historiske klientdata og bransjegjennomsnittet, og faktiske resultater kan variere betydelig.</p>
                <p className="mt-3">AI-generert innhold, inkludert svar fra ALEX, er automatisk generert og kan inneholde unøyaktigheter. Brukere bør alltid verifisere viktig informasjon fra autoritative kilder og konsultere kvalifiserte fagpersoner for juridiske, finansielle, medisinske eller andre spesialiserte råd.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Investerings- og finansiell informasjon</h2>
                <p>Ingenting på dette nettstedet utgjør finansiell, investerings- eller juridisk rådgivning. Informasjon om IntelligentForces virksomhet, vekst og investeringsmuligheter er gitt for informasjonsformål. Enhver investeringsbeslutning bør tas basert på din egen uavhengige vurdering og, der det er hensiktsmessig, med råd fra kvalifiserte finansielle og juridiske rådgivere. IntelligentForce foretar ikke offentlige tilbud om verdipapirer. Partnerskaps- og investeringsdiskusjoner gjennomføres på privat, konfidensiell basis.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Tredjepartslenker</h2>
                <p>Nettstedet vårt kan inneholde lenker til tredjepartsnettsted. Disse lenkene er kun gitt for din bekvemmelighet. IntelligentForce har ingen kontroll over innholdet på disse nettstedene og aksepterer intet ansvar for dem eller for tap eller skade som kan oppstå fra din bruk av dem.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Immaterielle rettigheter</h2>
                <p>Alt innhold på intelligentforce.ai — inkludert tekst, grafikk, logoer, bilder og programvare — er eiendommen til IntelligentForce AS eller dets innholdsleverandører og er beskyttet av norsk og internasjonal immaterialrett. Reproduksjon, distribusjon eller bruk av innhold uten uttrykkelig skriftlig tillatelse fra IntelligentForce AS er forbudt.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Gjeldende lov</h2>
                <p>Dette nettstedet og dets innhold er underlagt norsk lov. Eventuelle tvister knyttet til bruk av dette nettstedet skal være underlagt eksklusiv jurisdiksjon for domstolene i Oslo, Norge.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Kontakt for juridiske henvendelser</h2>
                <p>For juridiske henvendelser, kontakt oss på <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Vi tar sikte på å svare på all juridisk korrespondanse innen 5 virkedager.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-1">
                  <p className="text-white font-semibold">IntelligentForce AS</p>
                  <p>Registered in Norway</p>
                  <p>Email: <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a></p>
                  <p>Website: <a href="https://intelligentforce.ai" className="text-cyan-400 hover:underline">intelligentforce.ai</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Website Disclaimer</h2>
                <p>The information on intelligentforce.ai is provided for general informational purposes only. While we make every effort to ensure the accuracy and completeness of the information presented, IntelligentForce AS makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability of the information, products, services or related graphics on the website. Any reliance you place on such information is therefore strictly at your own risk.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">AI and Automation Disclaimer</h2>
                <p>IntelligentForce provides AI-powered automation services designed to improve business efficiency. The outputs of our AI agents are intended to support — not replace — human judgement and decision-making. Business results vary depending on the specific context, quality of input data and implementation.</p>
                <p className="mt-3">Statistics and performance figures cited on this website represent results achieved by clients under specific conditions and do not constitute a guarantee of future performance for any particular client. ROI estimates are based on historical client data and industry averages, and actual results may vary significantly.</p>
                <p className="mt-3">AI-generated content, including responses from ALEX, is automatically generated and may contain inaccuracies. Users should always verify important information from authoritative sources and consult qualified professionals for legal, financial, medical or other specialised advice.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Investment and Financial Information</h2>
                <p>Nothing on this website constitutes financial, investment or legal advice. Information about IntelligentForce's business, growth and investment opportunities is provided for informational purposes only. Any investment decision should be made based on your own independent assessment and, where appropriate, with the advice of qualified financial and legal advisers. IntelligentForce does not make public offerings of securities. Partnership and investment discussions are conducted on a private, confidential basis.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. These links are provided for your convenience only. IntelligentForce has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p>All content on intelligentforce.ai — including text, graphics, logos, images and software — is the property of IntelligentForce AS or its content suppliers and is protected by Norwegian and international intellectual property laws. Reproduction, distribution or use of any content without express written permission from IntelligentForce AS is prohibited.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <p>This website and its content are governed by the laws of Norway. Any disputes relating to the use of this website shall be subject to the exclusive jurisdiction of the courts of Oslo, Norway.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Legal Enquiries</h2>
                <p>For legal enquiries, please contact us at <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. We aim to respond to all legal correspondence within 5 business days.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
