import { useState } from "react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { trpc } from "@/lib/trpc";
import { usePageTracker } from "@/hooks/usePageTracker";
import { BarChart2, Headphones, Zap, Shield, Brain, Plug, ArrowRight, ChevronDown } from "lucide-react";

const agents = [
  {
    id: "data-analyst",
    name: "Data Analyst",
    nameNo: "Dataanalytiker",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/40",
    glow: "shadow-blue-500/20",
    badge: "bg-blue-500/20 text-blue-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-data-analyst-J48SW4YK2wujbGbyqBgbpd.webp",
    roiEn: "Saves 40+ hours/month",
    roiNo: "Sparer 40+ timer/mnd",
    descEn: "Analyzes complex datasets and generates predictive models. Transforms raw data into actionable business intelligence for finance, operations, and strategy.",
    descNo: "Analyserer komplekse datasett og lager prediktive modeller. Gjør rådata om til handlingsrettet forretningsintelligens for økonomi, drift og strategi.",
  },
  {
    id: "customer-service",
    name: "Customer Service Specialist",
    nameNo: "Kundeservicespesialist",
    color: "from-cyan-500/20 to-orange-500/20",
    border: "border-cyan-500/40",
    glow: "shadow-cyan-500/20",
    badge: "bg-cyan-500/20 text-cyan-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-customer-service-YviKVseSUs6J9UhRz5NPwC.webp",
    roiEn: "Reduces costs by 60%",
    roiNo: "Reduserer kostnader med 60%",
    descEn: "Handles customer inquiries 24/7 with human-like precision. Resolves issues instantly, escalates complex cases, and continuously learns from every interaction.",
    descNo: "Håndterer kundehenvendelser 24/7 med menneskelig presisjon. Løser problemer umiddelbart, eskalerer komplekse saker og lærer kontinuerlig av hver interaksjon.",
  },
  {
    id: "market-analyst",
    name: "Market Analyst",
    nameNo: "Markedsanalytiker",
    color: "from-green-500/20 to-teal-500/20",
    border: "border-green-500/40",
    glow: "shadow-green-500/20",
    badge: "bg-green-500/20 text-green-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-market-analyst-DFSLHF2rf9kqmUfMn626Un.webp",
    roiEn: "Increases revenue 15–25%",
    roiNo: "Øker inntekter med 15–25%",
    descEn: "Monitors competitors and market trends in real time. Delivers strategic insights that keep your business ahead of the curve in any market condition.",
    descNo: "Overvåker konkurrenter og markedstrender i sanntid. Leverer strategisk innsikt som holder bedriften din i forkant under alle markedsforhold.",
  },
  {
    id: "risk-manager",
    name: "Risk Manager",
    nameNo: "Risikostyrer",
    color: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/20",
    badge: "bg-purple-500/20 text-purple-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-risk-manager-MsGLgAdZLVgrXgyLvKw3nq.webp",
    roiEn: "Reduces compliance costs 50%",
    roiNo: "Reduserer compliance-kostnader med 50%",
    descEn: "Ensures regulatory compliance and identifies business risks before they become problems. Protects your enterprise with continuous monitoring and automated reporting.",
    descNo: "Sikrer regulatorisk compliance og identifiserer forretningsrisikoer før de blir problemer. Beskytter bedriften din med kontinuerlig overvåking og automatisert rapportering.",
  },
  {
    id: "process-optimizer",
    name: "Process Optimizer",
    nameNo: "Prosessoptimaliserer",
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/40",
    glow: "shadow-orange-500/20",
    badge: "bg-orange-500/20 text-orange-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-process-optimizer-M5rXyNTwSa3zjCNEimx8dy.webp",
    roiEn: "Increases productivity 30–40%",
    roiNo: "Øker produktivitet med 30–40%",
    descEn: "Automates repetitive workflows and optimizes business processes end-to-end. Eliminates bottlenecks and frees your team to focus on high-value work.",
    descNo: "Automatiserer repetitive arbeidsflyter og optimaliserer forretningsprosesser fra ende til ende. Eliminerer flaskehalser og frigjør teamet ditt til å fokusere på høyverdiarbeid.",
  },
  {
    id: "content-creator",
    name: "Content Creator",
    nameNo: "Innholdsskaper",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/40",
    glow: "shadow-pink-500/20",
    badge: "bg-pink-500/20 text-pink-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-content-creator-VCZxPvDhj9jUupMbLM6uP3.webp",
    roiEn: "Reduces content costs 70%",
    roiNo: "Reduserer innholdskostnader med 70%",
    descEn: "Generates high-quality marketing content, social media posts, and brand communications at scale. Maintains your brand voice consistently across all channels.",
    descNo: "Genererer markedsinnhold, sosiale medier-poster og merkevare-kommunikasjon i stor skala. Opprettholder merkevaretoneleiet konsekvent på tvers av alle kanaler.",
  },
  {
    id: "supply-chain",
    name: "Supply Chain Coordinator",
    nameNo: "Forsyningskjedekoordinator",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/40",
    glow: "shadow-teal-500/20",
    badge: "bg-teal-500/20 text-teal-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-supply-chain-gtXahePnw5ue6WNrdFL8Tg.webp",
    roiEn: "Saves $100,000+ annually",
    roiNo: "Sparer $100 000+ årlig",
    descEn: "Manages inventory levels and optimizes delivery routes globally. Reduces waste, prevents stockouts, and ensures your supply chain runs at peak efficiency.",
    descNo: "Styrer lagernivåer og optimaliserer leveringsruter globalt. Reduserer svinn, forhindrer tomme lagre og sikrer at forsyningskjeden din kjører med maksimal effektivitet.",
  },
  {
    id: "hr-specialist",
    name: "HR Specialist",
    nameNo: "HR-spesialist",
    color: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/40",
    glow: "shadow-yellow-500/20",
    badge: "bg-yellow-500/20 text-yellow-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-hr-specialist-RTVXDb3xEUDtD2TMcFnFpi.webp",
    roiEn: "Saves 20+ hours/week",
    roiNo: "Sparer 20+ timer/uke",
    descEn: "Automates recruitment, onboarding, and talent management processes. Identifies top candidates faster and improves employee retention through data-driven insights.",
    descNo: "Automatiserer rekruttering, onboarding og talentstyringsprosesser. Identifiserer toppkandidater raskere og forbedrer ansattretensjon gjennom datadrevet innsikt.",
  },
  {
    id: "financial-analyst",
    name: "Financial Analyst",
    nameNo: "Finansanalytiker",
    color: "from-sky-500/20 to-blue-500/20",
    border: "border-sky-500/40",
    glow: "shadow-sky-500/20",
    badge: "bg-sky-500/20 text-sky-300",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-financial-analyst-XhbPHsyZo3mmmH9qrqtyBE.webp",
    roiEn: "Reduces reporting time 80%",
    roiNo: "Reduserer rapporteringstid med 80%",
    descEn: "Delivers real-time financial analysis, forecasting, and automated reporting. Transforms complex financial data into clear strategic recommendations for leadership.",
    descNo: "Leverer sanntids finansanalyse, prognoser og automatisert rapportering. Gjør komplekse finansdata om til klare strategiske anbefalinger for ledelsen.",
  },
];

export default function Features() {
  const { t, lang } = useLang();
  const f = t.features;
  const isNo = lang === "no";
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  usePageTracker("/features");
  const trackAgentMutation = trpc.portal.trackAgentView.useMutation();

  const coreFeatures = [
    { icon: <BarChart2 size={28} className="text-cyan-400" />, title: f.f1Title, desc: f.f1Desc },
    { icon: <Headphones size={28} className="text-blue-400" />, title: f.f2Title, desc: f.f2Desc },
    { icon: <Zap size={28} className="text-yellow-400" />, title: f.f3Title, desc: f.f3Desc },
    { icon: <Shield size={28} className="text-green-400" />, title: f.f4Title, desc: f.f4Desc },
    { icon: <Brain size={28} className="text-purple-400" />, title: f.f5Title, desc: f.f5Desc },
    { icon: <Plug size={28} className="text-pink-400" />, title: f.f6Title, desc: f.f6Desc },
  ];

  const whyItems = [
    { title: f.w1Title, desc: f.w1Desc, icon: "🚀" },
    { title: f.w2Title, desc: f.w2Desc, icon: "💰" },
    { title: f.w3Title, desc: f.w3Desc, icon: "📈" },
    { title: f.w4Title, desc: f.w4Desc, icon: "🛟" },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-10 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{f.hero}</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">{f.heroSub}</p>
        </div>
      </section>

      {/* ALEX video + intro */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <AlexVideo videoSrc="/videos/alex-video-features_344f7073.mp4" className="w-full max-w-xs" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{f.coreTitle}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{f.coreSub}</p>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat) => (
              <div key={feat.title} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <div className="mb-4">{feat.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-muted-foreground text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 AI Agents Section */}
      <section className="py-20 bg-card/10">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <span className="text-cyan-400 text-sm font-semibold">
                {isNo ? "KOORDINERT AV ALEX" : "COORDINATED BY ALEX"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "9 Spesialiserte AI-agenter" : "9 Specialized AI Agents"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isNo
                ? "ALEX koordinerer alle 9 agenter og sørger for at riktig ekspert håndterer hvert spørsmål. Klikk på en agent for å lære mer."
                : "ALEX coordinates all 9 agents, ensuring the right expert handles every request. Click an agent to learn more."}
            </p>
          </div>

          {/* Agent grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const isActive = activeAgent === agent.id;
              return (
                <div
                  key={agent.id}
                  className={`bg-gradient-to-br ${agent.color} border ${agent.border} rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg ${agent.glow} hover:scale-[1.02] hover:shadow-xl`}
                  onClick={() => {
                    if (!isActive) {
                      trackAgentMutation.mutate({ agentId: agent.id, agentName: isNo ? agent.nameNo : agent.name });
                    }
                    setActiveAgent(isActive ? null : agent.id);
                  }}
                >
                  <div className="p-5 flex items-center gap-4">
                    <img
                      src={agent.img}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-tight mb-1">
                        {isNo ? agent.nameNo : agent.name}
                      </h3>
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${agent.badge}`}>
                        {isNo ? agent.roiNo : agent.roiEn}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-white/60 flex-shrink-0 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                    />
                  </div>
                  {isActive && (
                    <div className="px-5 pb-5 border-t border-white/10 pt-4">
                      <p className="text-white/80 text-sm leading-relaxed">
                        {isNo ? agent.descNo : agent.descEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ALEX coordinator note */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 rounded-2xl px-8 py-6 max-w-2xl">
              <p className="text-white/90 text-base">
                {isNo
                  ? "✨ ALEX mottar alle henvendelser og videresender dem til riktig agent – automatisk, øyeblikkelig og alltid tilgjengelig 24/7."
                  : "✨ ALEX receives all requests and routes them to the right agent – automatically, instantly, and always available 24/7."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-20 bg-card/20">
        <div className="container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{f.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6 text-center card-hover">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 p-10 sm:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{f.ctaTitle}</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{f.ctaSub}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white">
                {f.ctaBtn1} <ArrowRight size={18} />
              </Link>
              <Link href="/pricing" className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors">
                {f.ctaBtn2}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
