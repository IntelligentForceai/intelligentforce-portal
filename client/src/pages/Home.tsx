import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { Search, BarChart2, Zap, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLang();
  const h = t.home;

  const whyCards = [
    { title: h.why1Title, desc: h.why1Desc, icon: "🧩" },
    { title: h.why2Title, desc: h.why2Desc, icon: "📊" },
    { title: h.why3Title, desc: h.why3Desc, icon: "⚡" },
    { title: h.why4Title, desc: h.why4Desc, icon: "✅" },
    { title: h.why5Title, desc: h.why5Desc, icon: "🤖" },
    { title: h.why6Title, desc: h.why6Desc, icon: "🛟" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="relative z-10 container text-center pt-24 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-white/90 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {h.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            {h.hero1}{" "}
            <span className="gradient-text">{h.hero2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            {h.heroSub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/contact"
              className="btn-gradient px-8 py-4 rounded-full font-semibold text-white text-base flex items-center justify-center gap-2"
            >
              {h.cta1} <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors text-base"
            >
              {h.cta2}
            </Link>
            <Link
              href="/alex"
              className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors text-base flex items-center justify-center gap-2"
            >
              💬 {h.cta3}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-white/60">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" /> {h.roi}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" /> {h.speed}
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{h.howTitle}</h2>
            <p className="text-muted-foreground text-lg">{h.howSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Search size={32} className="text-cyan-400" />, num: "01", title: h.step1Title, desc: h.step1Desc },
              { icon: <BarChart2 size={32} className="text-blue-400" />, num: "02", title: h.step2Title, desc: h.step2Desc },
              { icon: <Zap size={32} className="text-purple-400" />, num: "03", title: h.step3Title, desc: h.step3Desc },
            ].map((step) => (
              <div key={step.num} className="relative bg-card border border-border rounded-2xl p-8 card-hover">
                <div className="absolute top-4 right-4 text-4xl font-black text-white/5">{step.num}</div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{h.whyTitle}</h2>
            <p className="text-muted-foreground text-lg">{h.whySub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((card) => (
              <div key={card.title} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{h.ctaTitle}</h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{h.ctaSub}</p>
              <Link
                href="/contact"
                className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg"
              >
                {h.ctaBtn} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet ALEX section */}
      <section className="py-20 bg-card/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="flex justify-center">
              <AlexVideo className="w-full max-w-xs" />
            </div>
            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{h.alexTitle}</h2>
              <p className="text-muted-foreground text-lg mb-4">{h.alexDesc}</p>
              <p className="text-muted-foreground mb-8">{h.alexDesc2}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/alex"
                  className="btn-gradient px-6 py-3 rounded-full font-semibold text-white flex items-center justify-center gap-2"
                >
                  💬 {h.alexBtn1}
                </Link>
                <Link
                  href="/features"
                  className="px-6 py-3 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors text-center"
                >
                  {h.alexBtn2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
