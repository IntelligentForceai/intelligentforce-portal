import { useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import BusinessHealthCheck from "@/components/BusinessHealthCheck";
import { Link } from "wouter";
import { ArrowLeft, Shield, Clock, TrendingUp } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function HealthCheck() {
  useSEO({
    title: "Free Business Health Check – AI Automation Assessment | IntelligentForce",
    description: "Get a free AI-powered assessment of your business automation potential. Discover where AI can save you time and money. Takes only 5 minutes. Instant results.",
    keywords: "business health check, AI automation assessment, free business analysis, automation potential, ROI calculator AI",
    canonical: "https://intelligentforce.ai/health-check",
    
  });
  const { lang } = useLang();
  const isNo = lang === "no";
  usePageTracker("/health-check");

  // Always start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-14 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} />
            {isNo ? "Tilbake til forsiden" : "Back to Home"}
          </Link>
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-5">
            <TrendingUp size={14} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">
              {isNo ? "Gratis – Ingen forpliktelse" : "Free – No Commitment"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {isNo ? (
              <>Business <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Health Check</span></>
            ) : (
              <>Business <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Health Check</span></>
            )}
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8">
            {isNo
              ? "Oppdag nøyaktig hvor mye tid og penger bedriften din kan spare. Basert på reelle bransjestandarder – ikke overdrevne løfter."
              : "Discover exactly how much time and money your business can save. Based on real industry benchmarks – not inflated promises."}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-cyan-400" />
              {isNo ? "Tar kun 5 minutter" : "Takes only 5 minutes"}
            </div>
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-green-400" />
              {isNo ? "Ingen persondata lagres" : "No personal data stored"}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-purple-400" />
              {isNo ? "Konservative, ærlige estimater" : "Conservative, honest estimates"}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10 pb-20 bg-background">
        <div className="container max-w-2xl mx-auto px-4">
          <BusinessHealthCheck />
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 bg-card/20 border-t border-border/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            {[
              {
                value: "60%",
                label: isNo ? "Gjennomsnittlig kostnadsreduksjon" : "Average cost reduction",
                sub: isNo ? "Basert på implementerte løsninger" : "Based on deployed solutions",
              },
              {
                value: "2 uker",
                label: isNo ? "Gjennomsnittlig implementeringstid" : "Average implementation time",
                sub: isNo ? "Fra kontrakt til live" : "From contract to live",
              },
              {
                value: "500+",
                label: isNo ? "Integrasjoner tilgjengelig" : "Integrations available",
                sub: isNo ? "Inkl. Salesforce, SAP, HubSpot" : "Incl. Salesforce, SAP, HubSpot",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card/40 border border-border/30 rounded-2xl p-6">
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {item.value}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
                <div className="text-slate-500 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
