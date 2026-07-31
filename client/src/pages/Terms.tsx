import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { Scale, ArrowLeft } from "lucide-react";

export default function Terms() {
  useSEO({
    title: "Terms of Service – IntelligentForce",
    description: "Terms of Service for IntelligentForce AS. Read our terms governing the use of our AI automation platform and services.",
    canonical: "https://intelligentforce.ai/terms",
  });
  usePageTracker("/terms");
  const { lang } = useLang();
  const isNo = lang === "no";
  const lastUpdated = "31 July 2026";

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
              {isNo ? "Juridisk dokument" : "Legal Document"}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {isNo ? "Vilkår for bruk" : "Terms of Service"}
          </h1>
          <p className="text-muted-foreground">{isNo ? `Sist oppdatert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {isNo ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Aksept av vilkår</h2>
                <p>Ved å få tilgang til eller bruke tjenestene til IntelligentForce AS («IntelligentForce», «vi», «oss» eller «vår»), aksepterer du å være bundet av disse vilkårene for bruk («Vilkårene»). Dersom du ikke godtar disse Vilkårene, må du ikke bruke tjenestene våre. IntelligentForce AS er et norsk aksjeselskap. Disse Vilkårene er underlagt norsk lov.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Beskrivelse av tjenestene</h2>
                <p>IntelligentForce tilbyr en AI-drevet forretningsautomatiseringsplattform som inkluderer ni spesialiserte AI-agenter, ALEX som AI-koordinator, integrasjoner med tredjepartsverktøy, rapporterings- og analysefunksjoner, samt implementerings- og konsulenttjenester. Vi forbeholder oss retten til å endre, suspendere eller avvikle enhver del av tjenestene med rimelig varsel.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Brukerkontoer og tilgang</h2>
                <p>For å bruke visse funksjoner må du opprette en konto. Du er ansvarlig for å opprettholde konfidensialiteten til kontoopplysningene dine og for all aktivitet under kontoen din. Du må varsle oss umiddelbart om uautorisert bruk. Du må være minst 18 år og ha fullmakt til å inngå bindende avtaler på vegne av virksomheten du representerer.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Abonnement, betaling og fornyelse</h2>
                <p>Tjenestene tilbys på abonnementsbasis. Abonnementsavgifter faktureres månedlig eller årlig. Alle priser er ekskl. mva. med mindre annet er angitt. Abonnementer fornyes automatisk med mindre de sies opp minst 30 dager før fornyelsesdatoen. Du kan si opp via kontoinnstillingene eller ved å kontakte oss på <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Prisendringer varsles 30 dager i forveien og trer i kraft ved neste fornyelse.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Refusjonspolitikk</h2>
                <p>Abonnementsavgifter er generelt ikke refunderbare. Unntak: (a) Dersom tjenesten er utilgjengelig i mer enn 72 sammenhengende timer på grunn av forhold på vår side, kan du ha krav på forholdsmessig kreditering. (b) Dersom du kansellerer innen 14 dager etter første abonnement og ikke har tatt tjenesten i bruk, kan du søke om full refusjon. Refusjoner behandles innen 10 virkedager.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Akseptabel bruk</h2>
                <p>Du samtykker i å ikke bruke tjenestene til å bryte gjeldende lover, sende spam eller villedende kommunikasjon, laste opp skadelig programvare, forsøke uautorisert tilgang til systemer, utgi deg for å være andre, overbelaste vår infrastruktur, videreselge tilgang uten skriftlig tillatelse, eller generere ulovlig, støtende eller diskriminerende innhold. Brudd kan resultere i umiddelbar oppsigelse av kontoen uten refusjon.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Immaterielle rettigheter</h2>
                <p>IntelligentForce og dets lisensgivere eier alle rettigheter til tjenestene, inkludert programvare, algoritmer, AI-modeller, grensesnitt og innhold. Du beholder eierskap til dine Kundedata og gir IntelligentForce en begrenset lisens til å behandle disse utelukkende for å levere tjenestene.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Konfidensialitet</h2>
                <p>Begge parter samtykker i å holde konfidensiell informasjon fra den andre parten konfidensiell og ikke avsløre den til tredjeparter uten forhåndsskriftlig samtykke, med unntak av det som er nødvendig for å levere tjenestene eller som kreves ved lov. Denne forpliktelsen gjelder i 5 år etter avslutning av avtaleforholdet.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Ansvarsfraskrivelse og garantibegrensning</h2>
                <p>Tjenestene leveres «som de er» uten noen form for garantier. IntelligentForce fraskriver seg uttrykkelig alle garantier om salgbarhet, egnethet for et bestemt formål og ikke-krenkelse. AI-genererte resultater er ment å støtte — ikke erstatte — menneskelig vurdering. Ytelsestall og ROI-estimater på nettstedet representerer resultater oppnådd av kunder under spesifikke forhold og utgjør ikke en garanti for fremtidige resultater.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Ansvarsbegrensning</h2>
                <p>IntelligentForce skal ikke være ansvarlig for indirekte, tilfeldige, spesielle, følgeskader eller straffeerstatning, inkludert tap av fortjeneste, data eller goodwill. IntelligentForces totale kumulative ansvar skal ikke overstige det totale beløpet du har betalt i de 12 månedene som forutgår den hendelsen som ga opphav til kravet.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Skadesløsholdelse</h2>
                <p>Du samtykker i å forsvare og holde IntelligentForce, dets styremedlemmer, ansatte og agenter skadesløs fra krav, skader og utgifter (inkludert advokathonorarer) som oppstår fra din bruk av tjenestene, ditt brudd på disse Vilkårene, ditt brudd på tredjeparts rettigheter, eller dine Kundedata.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Oppsigelse</h2>
                <p>IntelligentForce kan si opp eller suspendere tilgangen din umiddelbart ved brudd på disse Vilkårene. IntelligentForce vil oppbevare Kundedata i 30 dager etter oppsigelse, hvoretter de slettes i henhold til vår personvernerklæring.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Gjeldende lov og tvisteløsning</h2>
                <p>Disse Vilkårene er underlagt norsk lov. Tvister forsøkes løst gjennom god tro-forhandlinger. Dersom forhandlinger mislykkes, avgjøres tvisten av Oslo tingrett som eksklusivt verneting.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Endringer i vilkårene</h2>
                <p>Vi forbeholder oss retten til å endre disse Vilkårene. Vesentlige endringer varsles via e-post eller på plattformen minst 30 dager i forveien. Fortsatt bruk etter at endringene trer i kraft utgjør aksept av de reviderte Vilkårene.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Kontaktinformasjon</h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-1">
                  <p className="text-white font-semibold">IntelligentForce AS</p>
                  <p>E-post: <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a></p>
                  <p>Nettsted: <a href="https://intelligentforce.ai" className="text-cyan-400 hover:underline">intelligentforce.ai</a></p>
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>By accessing or using the services of IntelligentForce AS ("IntelligentForce", "we", "us" or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use our services. IntelligentForce AS is a Norwegian limited company. These Terms are governed by Norwegian law.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
                <p>IntelligentForce provides an AI-powered business automation platform including nine specialised AI agents, ALEX as AI coordinator, third-party integrations, reporting and analytics, and implementation and consulting services. We reserve the right to modify, suspend or discontinue any part of the services with reasonable notice.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts and Access</h2>
                <p>To use certain features you must create an account. You are responsible for maintaining the confidentiality of your credentials and all activity under your account. You must notify us immediately of any unauthorised use. You must be at least 18 years of age and have authority to enter into binding agreements on behalf of the business you represent.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Subscriptions, Payment and Renewal</h2>
                <p>Services are provided on a subscription basis, billed monthly or annually. All prices are exclusive of VAT unless otherwise stated. Subscriptions renew automatically unless cancelled at least 30 days before the renewal date. You may cancel via account settings or by contacting us at <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Price changes are notified 30 days in advance and take effect at the next renewal.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Refund Policy</h2>
                <p>Subscription fees are generally non-refundable. Exceptions: (a) If the service is unavailable for more than 72 consecutive hours due to factors within our control, you may be entitled to a pro-rata credit. (b) If you cancel within 14 days of your first subscription and have not used the service, you may apply for a full refund. Refunds are processed within 10 business days.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Acceptable Use</h2>
                <p>You agree not to use the services to violate applicable laws, send spam or misleading communications, upload malware, attempt unauthorised access to systems, impersonate others, overburden our infrastructure, resell access without written permission, or generate unlawful, offensive or discriminatory content. Violations may result in immediate account termination without refund.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
                <p>IntelligentForce and its licensors own all rights to the services, including software, algorithms, AI models, interfaces and content. You retain ownership of your Customer Data and grant IntelligentForce a limited licence to process it solely for the purpose of providing the services.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Confidentiality</h2>
                <p>Both parties agree to keep confidential information received from the other party confidential and not disclose it to third parties without prior written consent, except as necessary to provide the services or as required by law. This obligation applies for 5 years after termination of the contractual relationship.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
                <p>The services are provided "as is" without warranties of any kind. IntelligentForce disclaims all warranties of merchantability, fitness for a particular purpose and non-infringement. AI-generated outputs are intended to support — not replace — human judgement. Performance figures and ROI estimates represent results achieved by clients under specific conditions and do not guarantee future results.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                <p>IntelligentForce shall not be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data or goodwill. IntelligentForce's total cumulative liability shall not exceed the total amount you have paid in the 12 months immediately preceding the event giving rise to the claim.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
                <p>You agree to defend, indemnify and hold harmless IntelligentForce, its directors, employees and agents from any claims, damages and expenses (including legal fees) arising from your use of the services, your breach of these Terms, your infringement of third-party rights, or your Customer Data.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
                <p>IntelligentForce may terminate or suspend your access immediately upon breach of these Terms. IntelligentForce will retain Customer Data for 30 days following termination, after which it will be deleted in accordance with our Privacy Policy.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law and Dispute Resolution</h2>
                <p>These Terms are governed by Norwegian law. Disputes shall first be attempted to be resolved through good faith negotiations. If negotiations fail, the dispute shall be resolved by Oslo District Court as the exclusive venue.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Material changes will be notified via email or on the platform at least 30 days before taking effect. Continued use after changes take effect constitutes acceptance of the revised Terms.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-1">
                  <p className="text-white font-semibold">IntelligentForce AS</p>
                  <p>Email: <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a></p>
                  <p>Website: <a href="https://intelligentforce.ai" className="text-cyan-400 hover:underline">intelligentforce.ai</a></p>
                </div>
              </section>
            </>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="text-white font-bold mb-4">{isNo ? "Andre juridiske dokumenter" : "Other Legal Documents"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: isNo ? "Personvernerklæring" : "Privacy Policy", href: "/privacy", desc: isNo ? "Hvordan vi samler inn og bruker dine data" : "How we collect and use your data" },
              { label: isNo ? "Informasjonskapselpolicy" : "Cookie Policy", href: "/cookies", desc: isNo ? "Hvordan vi bruker informasjonskapsler" : "How we use cookies" },
              { label: isNo ? "Juridisk oversikt" : "Legal Overview", href: "/legal", desc: isNo ? "Ansvarsfraskrivelser og juridisk informasjon" : "Disclaimers and legal information" },
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
