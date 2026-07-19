import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import AlexVideo from "@/components/AlexVideo";
import { usePageTracker } from "@/hooks/usePageTracker";
import { ArrowRight, CheckCircle2, Zap, BarChart3, Shield, Users, Clock, Star, TrendingUp, Globe, Award } from "lucide-react";
import { homeCaptions } from "@/lib/alexCaptions";


const whyIcons = [
  <Globe className="w-6 h-6 text-cyan-400" />,
  <BarChart3 className="w-6 h-6 text-cyan-400" />,
  <Zap className="w-6 h-6 text-cyan-400" />,
  <Shield className="w-6 h-6 text-cyan-400" />,
  <Users className="w-6 h-6 text-cyan-400" />,
  <Clock className="w-6 h-6 text-cyan-400" />,
];

const clientLogos = [
  "Fortune 500", "Global 2000", "FTSE 100", "DAX 40", "CAC 40", "Nikkei 225"
];

export default function Home() {
  const { t } = useLang();
  usePageTracker("/");

  const whyItems = [
    { title: t.home.w1Title, desc: t.home.w1Desc },
    { title: t.home.w2Title, desc: t.home.w2Desc },
    { title: t.home.w3Title, desc: t.home.w3Desc },
    { title: t.home.w4Title, desc: t.home.w4Desc },
    { title: t.home.w5Title, desc: t.home.w5Desc },
    { title: t.home.w6Title, desc: t.home.w6Desc },
  ];

  return (
    <div className="min-h-screen bg-[#050a14] text-white">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/37gsm9ZJmAXwwkBHHCppPv/hero-new-PBvKy65j8D37XDeAUauevf.webp')`, backgroundPosition: 'center 30%' }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/75 via-[#050a14]/60 to-[#050a14]/90" />
        {/* Animated pulsing orbs overlay */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">{t.home.badge}</span>
          </div>

          {/* Hero headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">{t.home.hero1}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {t.home.hero2}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.home.heroSub}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/health-check">
              <button className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95">
                {t.home.cta1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 backdrop-blur-sm">
                {t.home.cta2}
              </button>
            </Link>
            <Link href="/alex">
              <button className="flex items-center gap-2 bg-transparent hover:bg-white/5 border border-cyan-500/40 hover:border-cyan-500/70 text-cyan-400 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200">
                💬 {t.home.cta3}
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{t.home.trust1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{t.home.trust2}</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* GLOBAL CLIENTS TICKER */}
      <section className="py-8 border-y border-white/5 bg-white/2">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest">Trusted by enterprises worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {clientLogos.map((logo) => (
              <div key={logo} className="text-slate-600 font-bold text-sm tracking-wider hover:text-slate-400 transition-colors">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.home.howTitle}</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">{t.home.howSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "01", title: t.home.step1Title, desc: t.home.step1Desc, icon: <BarChart3 className="w-8 h-8" />, href: "/health-check", cta: "→ Start your diagnosis" },
              { num: "02", title: t.home.step2Title, desc: t.home.step2Desc, icon: <TrendingUp className="w-8 h-8" />, href: "/health-check", cta: "→ See your ROI" },
              { num: "03", title: t.home.step3Title, desc: t.home.step3Desc, icon: <Zap className="w-8 h-8" />, href: "/alex#chat", cta: "→ Chat with ALEX" },
            ].map((step, i) => (
              <Link key={i} href={step.href}>
                <div className="relative group cursor-pointer h-full">
                  <div className="h-full bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/15 group-hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-5xl font-black text-cyan-500/20 leading-none">{step.num}</span>
                      <div className="text-cyan-400">{step.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">{step.desc}</p>
                    <span className="text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors">{step.cta}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INTELLIGENTFORCE */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.home.whyTitle}</h2>
            <p className="text-slate-400 text-xl">{t.home.whySub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyItems.map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-white/8 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className="mb-4">{whyIcons[i]}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-blue-950/30 to-indigo-950/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "60%", label: "Cost reduction" },
              { value: "2 weeks", label: "Time to deploy" },
              { value: "9", label: "Expert Specialists" },
              { value: "24/7", label: "ALEX availability" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-indigo-900/40 border border-cyan-500/20 rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Award className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.home.ctaTitle}</h2>
              <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto">{t.home.ctaSub}</p>
              <Link href="/health-check">
                <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95">
                  {t.home.ctaBtn}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ALEX SECTION */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <AlexVideo videoSrc="/videos/alex-video-main_a07cc531.mp4" captions={homeCaptions} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1 mb-6">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 text-xs font-medium uppercase tracking-wider">Meet ALEX</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">{t.home.alexTitle}</h2>
              <p className="text-slate-300 text-lg mb-4 leading-relaxed">{t.home.alexDesc}</p>
              <p className="text-slate-400 mb-8 leading-relaxed">{t.home.alexSub}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/alex">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
                    💬 {t.home.alexBtn1}
                  </button>
                </Link>
                <Link href="/features">
                  <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200">
                    {t.home.alexBtn2}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
