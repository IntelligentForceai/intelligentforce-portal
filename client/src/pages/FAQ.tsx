import { useState } from "react";
import { ChevronDown, ChevronUp, Search, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { useSEO } from "../hooks/useSEO";

const faqData = {
  no: {
    hero1: "Ofte stilte",
    hero2: "spørsmål",
    heroSub: "Alt du trenger å vite om IntelligentForce og AI-automatisering",
    searchPlaceholder: "Søk i spørsmål...",
    categories: ["Alle", "Kom i gang", "Prising", "Teknisk", "Sikkerhet", "Resultater"],
    faqs: [
      {
        category: "Kom i gang",
        q: "Hvor lang tid tar implementeringen?",
        a: "De fleste kunder er live innen 14 dager. Vår rekord er 11 dager. Vi håndterer all teknisk oppsett, integrasjon og opplæring — du trenger ikke IT-ressurser internt."
      },
      {
        category: "Kom i gang",
        q: "Hva skjer i onboarding-prosessen?",
        a: "Uke 1: Behovsanalyse, systemtilgang og konfigurasjon. Uke 2: Testing, opplæring av teamet ditt og go-live. Etter lansering følger vi deg opp med ukentlige statusrapporter de første 30 dagene."
      },
      {
        category: "Kom i gang",
        q: "Trenger vi teknisk ekspertise internt?",
        a: "Nei. IntelligentForce er designet for ikke-tekniske brukere. Vårt team håndterer all integrasjon og vedlikehold. Du og teamet ditt bruker plattformen via et enkelt dashboard."
      },
      {
        category: "Prising",
        q: "Hva koster IntelligentForce?",
        a: "Starter-planen begynner på kr 5 490/mnd og Professional på kr 16 490/mnd. Enterprise-prising er skreddersydd etter behov. Vi tilbyr 20% rabatt ved årlig betaling. Start med en gratis Business Health Check for å se nøyaktig ROI."
      },
      {
        category: "Prising",
        q: "Er det bindingstid?",
        a: "Nei. Alle planer er løpende månedlige abonnementer uten bindingstid. Du kan si opp når som helst. Vi er trygge på at resultatene vil tale for seg selv."
      },
      {
        category: "Prising",
        q: "Tilbyr dere refusjon?",
        a: "Vi tilbyr ikke refusjon for allerede fakturerte perioder, men du kan si opp abonnementet ditt når som helst og beholde tilgangen ut inneværende betalingsperiode."
      },
      {
        category: "Teknisk",
        q: "Hvilke systemer integrerer IntelligentForce med?",
        a: "Vi integrerer med 500+ forretningsverktøy inkludert Salesforce, HubSpot, SAP, Microsoft 365, Google Workspace, Slack, Tripletex, Visma, og mer. Har du et spesifikt system? Spør oss."
      },
      {
        category: "Teknisk",
        q: "Hva er ALEX?",
        a: "ALEX er IntelligentForce sin AI Operations Partner — en intelligent assistent som koordinerer alle 9 AI-agentene, svarer på spørsmål, genererer rapporter og hjelper teamet ditt 24/7. ALEX er tilgjengelig via chat på nettsiden og i plattformen."
      },
      {
        category: "Teknisk",
        q: "Kan vi tilpasse AI-agentene til vår bransje?",
        a: "Ja. Alle 9 AI-agenter kan konfigureres med bransjespesifikke regler, terminologi og arbeidsflyter. Enterprise-kunder får dedikert konfigurasjonsstøtte."
      },
      {
        category: "Sikkerhet",
        q: "Hvordan håndteres dataene våre?",
        a: "Alle data behandles i henhold til GDPR. Vi bruker kryptering i transit (TLS 1.3) og i hvile (AES-256). Data lagres i EU-baserte datasentre. Vi signerer Databehandleravtale (DPA) med alle kunder."
      },
      {
        category: "Sikkerhet",
        q: "Deler dere data med tredjeparter?",
        a: "Nei. Vi selger aldri kundedata. Vi bruker et begrenset sett underleverandører (OpenAI, Cloudflare, hostingleverandør) som alle er bundet av konfidensialitetsavtaler og GDPR-krav. Full liste er tilgjengelig i vår DPA."
      },
      {
        category: "Sikkerhet",
        q: "Er IntelligentForce GDPR-kompatibel?",
        a: "Ja. Vi er fullt GDPR-kompatible med norsk lov som gjeldende rett. Vi tilbyr standard Databehandleravtale (DPA) for alle betalende kunder. Last ned vår DPA på /legal."
      },
      {
        category: "Resultater",
        q: "Hva slags resultater kan vi forvente?",
        a: "Typiske resultater: 40–60% kostnadsreduksjon i automatiserte prosesser, 30–40% produktivitetsøkning, og ROI synlig innen første faktureringssyklus. En norsk logistikkbedrift sparte NOK 2,4M i første år."
      },
      {
        category: "Resultater",
        q: "Hva skjer hvis vi ikke ser resultater?",
        a: "Vi er trygge på plattformen vår. Hvis du ikke ser målbare forbedringer innen 30 dager, vil vi jobbe gratis med deg til vi finner løsningen. Kontakt supportteamet vårt."
      },
      {
        category: "Resultater",
        q: "Kan vi se en demo før vi kjøper?",
        a: "Absolutt! Book en gratis 30-minutters demo på /contact, eller start med vår gratis Business Health Check på /health-check for å se konkrete ROI-tall for din bedrift."
      },
    ],
    ctaTitle: "Fant du ikke svaret?",
    ctaSub: "ALEX svarer deg umiddelbart, eller book en demo med teamet vårt.",
    ctaAlex: "Spør ALEX",
    ctaDemo: "Book demo",
  },
  en: {
    hero1: "Frequently asked",
    hero2: "questions",
    heroSub: "Everything you need to know about IntelligentForce and AI automation",
    searchPlaceholder: "Search questions...",
    categories: ["All", "Getting Started", "Pricing", "Technical", "Security", "Results"],
    faqs: [
      {
        category: "Getting Started",
        q: "How long does implementation take?",
        a: "Most clients go live within 14 days. Our record is 11 days. We handle all technical setup, integration, and training — no internal IT resources required."
      },
      {
        category: "Getting Started",
        q: "What happens during onboarding?",
        a: "Week 1: Needs analysis, system access and configuration. Week 2: Testing, team training and go-live. After launch, we follow up with weekly status reports for the first 30 days."
      },
      {
        category: "Getting Started",
        q: "Do we need internal technical expertise?",
        a: "No. IntelligentForce is designed for non-technical users. Our team handles all integration and maintenance. You and your team use the platform via a simple dashboard."
      },
      {
        category: "Pricing",
        q: "How much does IntelligentForce cost?",
        a: "The Starter plan begins at $499/month and Professional at $1,499/month. Enterprise pricing is tailored to your needs. We offer 20% discount for annual billing. Start with a free Business Health Check to see your exact ROI."
      },
      {
        category: "Pricing",
        q: "Is there a contract or lock-in period?",
        a: "No. All plans are month-to-month subscriptions with no lock-in. You can cancel at any time. We're confident the results will speak for themselves."
      },
      {
        category: "Pricing",
        q: "Do you offer refunds?",
        a: "We don't offer refunds for already-billed periods, but you can cancel your subscription at any time and retain access through the end of your current billing period."
      },
      {
        category: "Technical",
        q: "What systems does IntelligentForce integrate with?",
        a: "We integrate with 500+ business tools including Salesforce, HubSpot, SAP, Microsoft 365, Google Workspace, Slack, and more. Have a specific system in mind? Ask us."
      },
      {
        category: "Technical",
        q: "What is ALEX?",
        a: "ALEX is IntelligentForce's AI Operations Partner — an intelligent assistant that coordinates all 9 AI agents, answers questions, generates reports, and supports your team 24/7. ALEX is available via chat on the website and inside the platform."
      },
      {
        category: "Technical",
        q: "Can we customize the AI agents for our industry?",
        a: "Yes. All 9 AI agents can be configured with industry-specific rules, terminology, and workflows. Enterprise customers receive dedicated configuration support."
      },
      {
        category: "Security",
        q: "How is our data handled?",
        a: "All data is processed in accordance with GDPR. We use encryption in transit (TLS 1.3) and at rest (AES-256). Data is stored in EU-based data centers. We sign a Data Processing Agreement (DPA) with all customers."
      },
      {
        category: "Security",
        q: "Do you share data with third parties?",
        a: "No. We never sell customer data. We use a limited set of sub-processors (OpenAI, Cloudflare, hosting provider) all bound by confidentiality agreements and GDPR requirements. Full list available in our DPA."
      },
      {
        category: "Security",
        q: "Is IntelligentForce GDPR compliant?",
        a: "Yes. We are fully GDPR compliant with Norwegian law as governing law. We provide a standard Data Processing Agreement (DPA) for all paying customers. Download our DPA at /legal."
      },
      {
        category: "Results",
        q: "What kind of results can we expect?",
        a: "Typical results: 40–60% cost reduction in automated processes, 30–40% productivity increase, and ROI visible within the first billing cycle. A Norwegian logistics company saved NOK 2.4M in year one."
      },
      {
        category: "Results",
        q: "What if we don't see results?",
        a: "We're confident in our platform. If you don't see measurable improvements within 30 days, we'll work with you at no charge until we find the solution. Contact our support team."
      },
      {
        category: "Results",
        q: "Can we see a demo before buying?",
        a: "Absolutely! Book a free 30-minute demo at /contact, or start with our free Business Health Check at /health-check to see concrete ROI figures for your business."
      },
    ],
    ctaTitle: "Didn't find your answer?",
    ctaSub: "ALEX answers you instantly, or book a demo with our team.",
    ctaAlex: "Ask ALEX",
    ctaDemo: "Book a demo",
  }
};

export default function FAQ() {
  const { lang } = useLang();
  const c = faqData[lang as keyof typeof faqData] || faqData.en;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useSEO({
    title: lang === "no" ? "Ofte stilte spørsmål | IntelligentForce" : "FAQ | IntelligentForce",
    description: lang === "no"
      ? "Svar på de vanligste spørsmålene om IntelligentForce AI-automatisering — prising, implementering, sikkerhet og resultater."
      : "Answers to the most common questions about IntelligentForce AI automation — pricing, implementation, security and results.",
    canonical: "https://intelligentforce.ai/faq",
  });

  const allCategory = c.categories[0];

  const filtered = c.faqs.filter(faq => {
    const matchesSearch = search === "" ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === allCategory || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {c.hero1} <span className="gradient-text">{c.hero2}</span>
          </h1>
          <p className="text-muted-foreground text-xl mb-8">{c.heroSub}</p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={c.searchPlaceholder}
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 text-sm transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 bg-background border-b border-border sticky top-16 z-10">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {c.categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-black"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-cyan-500/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 bg-background">
        <div className="container max-w-3xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MessageCircle size={40} className="mx-auto mb-4 opacity-30" />
              <p>{lang === "no" ? "Ingen spørsmål funnet. Prøv et annet søkeord." : "No questions found. Try a different search term."}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden transition-all hover:border-cyan-500/30">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-start justify-between px-6 py-5 text-left gap-4"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-cyan-400 font-medium mb-1 block">{faq.category}</span>
                      <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                    </div>
                    {openIndex === i
                      ? <ChevronUp size={18} className="text-cyan-400 shrink-0 mt-1" />
                      : <ChevronDown size={18} className="text-muted-foreground shrink-0 mt-1" />
                    }
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="bg-card border border-border rounded-3xl p-10">
            <MessageCircle size={40} className="text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">{c.ctaTitle}</h2>
            <p className="text-muted-foreground mb-8">{c.ctaSub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/alex">
                <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold px-6 py-3 rounded-xl transition-all text-sm">
                  {c.ctaAlex} <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-2 bg-card border border-border hover:border-cyan-500/50 text-white font-medium px-6 py-3 rounded-xl transition-all text-sm">
                  {c.ctaDemo} <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
