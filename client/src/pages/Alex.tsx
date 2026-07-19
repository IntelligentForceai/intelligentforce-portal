import { useState } from "react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { alexCaptions } from "@/lib/alexCaptions";
import { usePageTracker } from "@/hooks/usePageTracker";
import { Clock, Globe, ArrowRight } from "lucide-react";


const agents = [
  { id: "data-analyst", name: "Data Analyst", nameNo: "Dataanalytiker", color: "bg-blue-500/20 border-blue-500/40 text-blue-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-data-analyst-J48SW4YK2wujbGbyqBgbpd.webp", roiEn: "40+ hrs/month", roiNo: "40+ timer/mnd" },
  { id: "customer-service", name: "Customer Service", nameNo: "Kundeservice", color: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-customer-service-YviKVseSUs6J9UhRz5NPwC.webp", roiEn: "60% cost reduction", roiNo: "60% kostnadsreduksjon" },
  { id: "market-analyst", name: "Market Analyst", nameNo: "Markedsanalytiker", color: "bg-green-500/20 border-green-500/40 text-green-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-market-analyst-DFSLHF2rf9kqmUfMn626Un.webp", roiEn: "+15–25% revenue", roiNo: "+15–25% inntekter" },
  { id: "risk-manager", name: "Risk Manager", nameNo: "Risikostyrer", color: "bg-purple-500/20 border-purple-500/40 text-purple-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-risk-manager-MsGLgAdZLVgrXgyLvKw3nq.webp", roiEn: "50% compliance savings", roiNo: "50% compliance-besparelse" },
  { id: "process-optimizer", name: "Process Optimizer", nameNo: "Prosessoptimaliserer", color: "bg-orange-500/20 border-orange-500/40 text-orange-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-process-optimizer-M5rXyNTwSa3zjCNEimx8dy.webp", roiEn: "+30–40% productivity", roiNo: "+30–40% produktivitet" },
  { id: "content-creator", name: "Content Creator", nameNo: "Innholdsskaper", color: "bg-pink-500/20 border-pink-500/40 text-pink-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-content-creator-VCZxPvDhj9jUupMbLM6uP3.webp", roiEn: "70% content cost savings", roiNo: "70% innholdskostbesparelse" },
  { id: "supply-chain", name: "Supply Chain", nameNo: "Forsyningskjede", color: "bg-teal-500/20 border-teal-500/40 text-teal-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-supply-chain-gtXahePnw5ue6WNrdFL8Tg.webp", roiEn: "$100K+ annual savings", roiNo: "$100K+ årlig besparelse" },
  { id: "hr-specialist", name: "HR Specialist", nameNo: "HR-spesialist", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-hr-specialist-RTVXDb3xEUDtD2TMcFnFpi.webp", roiEn: "20+ hrs/week saved", roiNo: "20+ timer/uke spart" },
  { id: "financial-analyst", name: "Financial Analyst", nameNo: "Finansanalytiker", color: "bg-sky-500/20 border-sky-500/40 text-sky-300", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/agent-financial-analyst-XhbPHsyZo3mmmH9qrqtyBE.webp", roiEn: "80% less reporting time", roiNo: "80% kortere rapporteringstid" },
];

export default function Alex() {
  const { t, lang } = useLang();
  const a = t.alex;
  const isNo = lang === "no";
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  usePageTracker("/alex");

  return (
    <div className="min-h-screen pt-16">
      {/* Professional Identity Banner */}
      <section className="py-6 bg-gradient-to-r from-blue-950/90 to-cyan-950/70 border-b border-cyan-500/20">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">ALEX</span>
                  <span className="inline-flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Always Online
                  </span>
                </div>
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Chief Operations Partner · IntelligentForce</p>
              </div>
            </div>
            <div className="bg-blue-950/60 border border-cyan-500/20 rounded-xl px-4 py-2 max-w-md">
              <p className="text-cyan-300/80 text-xs text-center sm:text-left">
                ALEX is a dedicated business automation partner. She operates exclusively within the IntelligentForce platform and does not engage in general conversation or topics outside her professional scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section id="chat" className="py-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">{a.hero}</h1>
            <p className="text-muted-foreground text-xl">{a.heroSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Video */}
            <div className="flex justify-center">
              <AlexVideo videoSrc="/videos/alex-video-alex_72e1beba.mp4" className="w-full max-w-sm" captions={alexCaptions} />
            </div>

            {/* Info panel */}
            <div className="flex flex-col gap-6">
              {/* About */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">{a.aboutTitle}</h2>
                <p className="text-muted-foreground leading-relaxed">{a.aboutDesc}</p>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} className="text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-white font-medium">{a.duration}</div>
                      <div>{a.durationVal}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe size={16} className="text-blue-400 shrink-0" />
                    <div>
                      <div className="text-white font-medium">{a.language}</div>
                      <div>{a.languageVal}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat CTA */}
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{a.questionsTitle}</h3>
                <p className="text-muted-foreground text-sm mb-4">{a.questionsDesc}</p>
                <Link
                  href="/contact"
                  className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white"
                >
                  💬 {a.chatBtn}
                </Link>
              </div>

              {/* Quick links */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {a.quickLinks}
                </h3>
                <div className="flex flex-col gap-2">
                  <Link href="/features" className="flex items-center gap-2 text-white/80 hover:text-white hover:translate-x-1 transition-all text-sm">
                    <ArrowRight size={14} className="text-cyan-400" /> {a.link1}
                  </Link>
                  <Link href="/pricing" className="flex items-center gap-2 text-white/80 hover:text-white hover:translate-x-1 transition-all text-sm">
                    <ArrowRight size={14} className="text-cyan-400" /> {a.link2}
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-white/80 hover:text-white hover:translate-x-1 transition-all text-sm">
                    <ArrowRight size={14} className="text-cyan-400" /> {a.link3}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Agents Section */}
      <section className="py-20 bg-card/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "ALEX koordinerer 9 spesialiserte eksperter" : "ALEX Coordinates 9 Expert Specialists"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isNo
                ? "Hver ekspert er spesialist på sitt felt. ALEX sikrer at riktig ekspert håndterer hvert oppdrag – automatisk og øyeblikkelig."
                : "Each specialist is an expert in their field. ALEX ensures the right expert handles every assignment – automatically and instantly."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`border rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:scale-105 ${agent.color}`}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                <img
                  src={agent.img}
                  alt={agent.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20 mb-3"
                />
                <h3 className="text-white font-bold text-sm mb-1">
                  {isNo ? agent.nameNo : agent.name}
                </h3>
                <span className="text-xs font-medium opacity-80">
                  {isNo ? agent.roiNo : agent.roiEn}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/features"
              className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white"
            >
              {isNo ? "Se alle funksjoner" : "Explore All Features"} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
