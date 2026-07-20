import { useState } from "react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { pricingCaptions } from "@/lib/alexCaptions";

import { usePageTracker } from "@/hooks/usePageTracker";
import { Check, ChevronDown, ChevronUp, ArrowRight, Calculator } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

function ROICalculator() {
  const [employees, setEmployees] = useState(20);
  const [avgSalary, setAvgSalary] = useState(600000);
  const automationRate = 0.35;
  const annualSavings = Math.round(employees * avgSalary * automationRate);
  const monthlySavings = Math.round(annualSavings / 12);
  const roi = Math.round((annualSavings / 1499 / 12) * 100);

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-white font-semibold mb-3">
            Number of employees: <span className="text-cyan-400">{employees}</span>
          </label>
          <input
            type="range"
            min={5}
            max={500}
            step={5}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5</span><span>500</span>
          </div>
        </div>
        <div>
          <label className="block text-white font-semibold mb-3">
            Avg. annual salary (NOK): <span className="text-cyan-400">{avgSalary.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min={300000}
            max={1500000}
            step={50000}
            value={avgSalary}
            onChange={(e) => setAvgSalary(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>300k</span><span>1.5M</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-background rounded-xl p-5 text-center border border-border">
          <div className="text-3xl font-extrabold text-cyan-400 mb-1">
            NOK {(annualSavings / 1000).toFixed(0)}k
          </div>
          <div className="text-muted-foreground text-sm">Estimated annual savings</div>
        </div>
        <div className="bg-background rounded-xl p-5 text-center border border-border">
          <div className="text-3xl font-extrabold text-green-400 mb-1">
            NOK {(monthlySavings / 1000).toFixed(0)}k
          </div>
          <div className="text-muted-foreground text-sm">Monthly savings</div>
        </div>
        <div className="bg-gradient-to-b from-blue-900/40 to-card rounded-xl p-5 text-center border border-cyan-500/30">
          <div className="text-3xl font-extrabold text-white mb-1">{roi}x</div>
          <div className="text-muted-foreground text-sm">ROI on Professional plan</div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mb-6">
        Based on 35% automation of manual processes. Actual results vary by industry and implementation scope.
      </p>
      <div className="text-center">
        <Link href="/health-check" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white">
          Get Your Precise ROI Estimate <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function Pricing() {
  useSEO({
    title: "Pricing Plans – IntelligentForce AI Automation",
    description: "Transparent pricing for AI business automation. Choose from Starter, Professional, and Enterprise plans. Start with a free Business Health Check. No hidden fees.",
    keywords: "AI automation pricing, business automation cost, AI SaaS pricing, IntelligentForce plans, enterprise AI pricing",
    canonical: "https://intelligentforce.ai/pricing",
    
  });
  const { t } = useLang();
  const p = t.pricing;
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  usePageTracker("/pricing");

  const starterFeatures = [
    "Up to 3 Expert Specialists",
    "10 hours consulting/month",
    "Basic automation workflows",
    "Email & Slack integration",
    "Standard support",
    "Monthly reporting",
    "API access",
    "14-day free trial",
  ];

  const proFeatures = [
    "Up to 10 Expert Specialists",
    "30 hours consulting/month",
    "Advanced automation workflows",
    "500+ integrations",
    "Priority support",
    "Weekly reporting & analytics",
    "Custom API endpoints",
    "Team collaboration tools",
    "14-day free trial",
  ];

  const entFeatures = [
    "Unlimited Expert Specialists",
    "Unlimited consulting",
    "Custom automation solutions",
    "Dedicated account manager",
    "24/7 priority support",
    "Real-time analytics dashboard",
    "Custom integrations",
    "SLA guarantee",
    "On-premise deployment option",
    "Custom training program",
  ];

  const faqs = [
    { q: p.faq1Q, a: p.faq1A },
    { q: p.faq2Q, a: p.faq2A },
    { q: p.faq3Q, a: p.faq3A },
    { q: p.faq4Q, a: p.faq4A },
  ];

  const getPrice = (monthly: string, discount = 0.83) => {
    if (!yearly) return monthly;
    const num = parseFloat(monthly.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return monthly;
    const discounted = Math.round(num * discount);
    return monthly.replace(/\d+/, discounted.toString());
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-10 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{p.hero}</h1>
          <p className="text-muted-foreground text-xl mb-8">{p.heroSub}</p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !yearly ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              {p.monthly}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              {p.yearly}
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                {p.yearlySave}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ALEX video */}
      <section className="pb-4 bg-background">
        <div className="container flex justify-center">
          <AlexVideo videoSrc="/videos/alex-video-pricing_dc17766c.mp4" className="w-full max-w-sm" captions={pricingCaptions} />
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-card border border-border rounded-2xl p-7 flex flex-col card-hover">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{p.starterName}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.starterDesc}</p>
                <div className="text-3xl font-extrabold text-white">
                  {getPrice(p.starterPrice)}
                </div>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {starterFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={15} className="text-cyan-400 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-gradient px-6 py-3 rounded-full font-semibold text-white text-center">
                {p.startTrial}
              </Link>
            </div>

            {/* Professional – most popular */}
            <div className="bg-gradient-to-b from-blue-900/40 to-card border-2 border-cyan-500/50 rounded-2xl p-7 flex flex-col relative card-hover glow-blue">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {p.proPopular}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{p.proName}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.proDesc}</p>
                <div className="text-3xl font-extrabold text-white">
                  {getPrice(p.proPrice)}
                </div>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={15} className="text-cyan-400 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-gradient px-6 py-3 rounded-full font-semibold text-white text-center">
                {p.startTrial}
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-card border border-border rounded-2xl p-7 flex flex-col card-hover">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{p.entName}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.entDesc}</p>
                <div className="text-3xl font-extrabold text-white">{p.entPrice}</div>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {entFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={15} className="text-purple-400 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="px-6 py-3 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors text-center">
                {p.getQuote}
              </Link>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Spørsmål? Kontakt oss på <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:text-cyan-300 transition-colors">hello@intelligentforce.ai</a> eller chat med <a href="/alex" className="text-cyan-400 hover:text-cyan-300 transition-colors">ALEX</a>.
          </p>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-gradient-to-b from-slate-900/50 to-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <Calculator size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">ROI Calculator</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">How Much Could You Save?</h2>
            <p className="text-muted-foreground text-lg">Estimate your annual savings based on your team size.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card/20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-10">{p.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 p-10 sm:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{p.ctaTitle}</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{p.ctaSub}</p>
            <Link href="/health-check" className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg">
              {p.ctaBtn} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
