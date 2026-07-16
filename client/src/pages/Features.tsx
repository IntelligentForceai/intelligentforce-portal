import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { BarChart2, Headphones, Zap, Shield, Brain, Plug, ArrowRight } from "lucide-react";

export default function Features() {
  const { t } = useLang();
  const f = t.features;

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
      <section className="py-20 bg-gradient-to-b from-card/40 to-background">
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
              <AlexVideo className="w-full max-w-xs" />
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
