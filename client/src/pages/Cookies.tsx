import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { Cookie, ArrowLeft } from "lucide-react";

export default function Cookies() {
  useSEO({
    title: "Cookie Policy – IntelligentForce",
    description: "Cookie Policy for IntelligentForce AS. Learn how we use cookies and how to manage your preferences.",
    canonical: "https://intelligentforce.ai/cookies",
  });
  usePageTracker("/cookies");
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
              <Cookie className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">
              {isNo ? "Juridisk dokument" : "Legal Document"}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {isNo ? "Informasjonskapselpolicy" : "Cookie Policy"}
          </h1>
          <p className="text-muted-foreground">{isNo ? `Sist oppdatert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {isNo ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Hva er informasjonskapsler?</h2>
                <p>Informasjonskapsler (cookies) er små tekstfiler som lagres på enheten din når du besøker et nettsted. De brukes til å huske dine preferanser, forbedre brukeropplevelsen og gi oss innsikt i hvordan nettstedet brukes. Vi bruker også lignende teknologier som lokal lagring og sesjonslagring.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Informasjonskapsler vi bruker</h2>
                <div className="space-y-6 mt-3">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Nødvendige informasjonskapsler</h3>
                    <p className="text-sm">Disse er essensielle for at nettstedet skal fungere korrekt. De kan ikke deaktiveres. De brukes til å huske innloggingsstatus, språkpreferanser og sikkerhetstokens.</p>
                    <p className="text-xs text-cyan-400 mt-2">Rettslig grunnlag: Berettiget interesse / Nødvendig for tjenesten</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Funksjonelle informasjonskapsler</h3>
                    <p className="text-sm">Disse husker dine valg og preferanser (f.eks. språkinnstilling, mørk/lys modus) for å gi en mer personlig opplevelse.</p>
                    <p className="text-xs text-cyan-400 mt-2">Rettslig grunnlag: Samtykke</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Analytiske informasjonskapsler</h3>
                    <p className="text-sm">Vi bruker analyseverktøy for å forstå hvordan besøkende bruker nettstedet. Dataene er anonymiserte og brukes til å forbedre innhold og brukeropplevelse. Vi bruker ikke Google Analytics med full IP-sporing.</p>
                    <p className="text-xs text-cyan-400 mt-2">Rettslig grunnlag: Samtykke</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Markedsføringsinformasjonskapsler</h3>
                    <p className="text-sm">Disse brukes til å spore besøkende på tvers av nettsteder for å vise relevante annonser. Vi bruker disse kun dersom du har gitt eksplisitt samtykke.</p>
                    <p className="text-xs text-cyan-400 mt-2">Rettslig grunnlag: Samtykke</p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Tredjepartsinformasjonskapsler</h2>
                <p>Nettstedet vårt kan inneholde innhold fra tredjeparter som kan sette egne informasjonskapsler. Dette inkluderer betalingsbehandlere (Stripe), kommunikasjonsverktøy og integrasjoner. Vi har ikke kontroll over disse informasjonskapslene og anbefaler at du leser personvernerklæringene til de aktuelle tredjepartene.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Administrere dine preferanser</h2>
                <p>Du kan administrere informasjonskapsler på følgende måter:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Nettleserinnstillinger:</strong> De fleste nettlesere lar deg se, slette og blokkere informasjonskapsler via innstillingene.</li>
                  <li><strong className="text-white">Samtykkebannervalg:</strong> Når du besøker nettstedet for første gang, kan du velge hvilke kategorier av informasjonskapsler du godtar.</li>
                  <li><strong className="text-white">Opt-out-lenker:</strong> For spesifikke tredjepartstjenester kan du bruke deres egne opt-out-mekanismer.</li>
                </ul>
                <p className="mt-3">Merk at deaktivering av visse informasjonskapsler kan påvirke funksjonaliteten til nettstedet.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Oppbevaringstid</h2>
                <p>Sesjonsbaserte informasjonskapsler slettes automatisk når du lukker nettleseren. Varige informasjonskapsler oppbevares i inntil 12 måneder, med mindre du sletter dem tidligere.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Kontakt</h2>
                <p>For spørsmål om vår bruk av informasjonskapsler, kontakt oss på <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
                <p>Cookies are small text files stored on your device when you visit a website. They are used to remember your preferences, improve the user experience and provide us with insights into how the website is used. We also use similar technologies such as local storage and session storage.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Cookies We Use</h2>
                <div className="space-y-6 mt-3">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Strictly Necessary Cookies</h3>
                    <p className="text-sm">These are essential for the website to function correctly and cannot be disabled. They are used to remember login status, language preferences and security tokens.</p>
                    <p className="text-xs text-cyan-400 mt-2">Legal basis: Legitimate interest / Necessary for the service</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Functional Cookies</h3>
                    <p className="text-sm">These remember your choices and preferences (e.g. language setting, dark/light mode) to provide a more personalised experience.</p>
                    <p className="text-xs text-cyan-400 mt-2">Legal basis: Consent</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Analytical Cookies</h3>
                    <p className="text-sm">We use analytics tools to understand how visitors use the website. Data is anonymised and used to improve content and user experience. We do not use Google Analytics with full IP tracking.</p>
                    <p className="text-xs text-cyan-400 mt-2">Legal basis: Consent</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-white font-bold mb-2">Marketing Cookies</h3>
                    <p className="text-sm">These are used to track visitors across websites to display relevant advertisements. We only use these where you have given explicit consent.</p>
                    <p className="text-xs text-cyan-400 mt-2">Legal basis: Consent</p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Cookies</h2>
                <p>Our website may contain content from third parties that may set their own cookies. This includes payment processors (Stripe), communication tools and integrations. We do not control these cookies and recommend that you read the privacy policies of the relevant third parties.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Managing Your Preferences</h2>
                <p>You can manage cookies in the following ways: through your browser settings, which allow you to view, delete and block cookies; through the consent banner when you first visit the website; and through opt-out mechanisms provided by specific third-party services. Note that disabling certain cookies may affect website functionality.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Retention</h2>
                <p>Session cookies are deleted automatically when you close your browser. Persistent cookies are retained for up to 12 months unless deleted earlier.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Contact</h2>
                <p>For questions about our use of cookies, contact us at <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>.</p>
              </section>
            </>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="text-white font-bold mb-4">{isNo ? "Andre juridiske dokumenter" : "Other Legal Documents"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: isNo ? "Vilkår for bruk" : "Terms of Service", href: "/terms", desc: isNo ? "Regler for bruk av plattformen" : "Rules governing use of our platform" },
              { label: isNo ? "Personvernerklæring" : "Privacy Policy", href: "/privacy", desc: isNo ? "Hvordan vi samler inn og bruker dine data" : "How we collect and use your data" },
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
