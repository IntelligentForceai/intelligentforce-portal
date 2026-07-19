import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { usePageTracker } from "@/hooks/usePageTracker";
import { ArrowRight, User } from "lucide-react";

export default function About() {
  const { t } = useLang();
  const a = t.about;
  usePageTracker("/about");

  const values = [
    { title: a.v1Title, desc: a.v1Desc, icon: "🤝" },
    { title: a.v2Title, desc: a.v2Desc, icon: "📊" },
    { title: a.v3Title, desc: a.v3Desc, icon: "🏆" },
    { title: a.v4Title, desc: a.v4Desc, icon: "🔬" },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{a.hero}</h1>
          <p className="text-muted-foreground text-xl">{a.heroSub}</p>
        </div>
      </section>

      {/* Story + ALEX video */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <AlexVideo videoSrc="/manus-storage/alex-video-about_3f7aa3ba.mp4" className="w-full max-w-xs" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{a.storyTitle}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{a.story1}</p>
                <p>{a.story2}</p>
                <p>{a.story3}</p>
                <p>{a.story4}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card/20">
        <div className="container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{a.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-6 card-hover text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{a.teamTitle}</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col lg:flex-row gap-0 items-stretch">
            {/* CEO Photo */}
            <div className="lg:w-72 shrink-0 relative">
              <img
                src="/images/ceo-founder.png"
                alt="Founder & CEO – IntelligentForce"
                className="w-full h-80 lg:h-full object-cover object-top"
              />
              <div className="absolute top-4 left-4 bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                CEO & Founder
              </div>
            </div>
            {/* CEO Info */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-1">{a.founderName}</h3>
              <p className="text-cyan-400 text-sm font-semibold mb-1 uppercase tracking-wider">{a.founderTitle}</p>
              <p className="text-muted-foreground text-xs mb-4">{a.founderRole}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{a.founderBio}</p>
              <blockquote className="border-l-2 border-cyan-500 pl-4 italic text-white/80 text-sm">
                "{a.founderQuote}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ALEX Team Card */}
      <section className="py-8 bg-background">
        <div className="container max-w-4xl">
          <div className="bg-gradient-to-r from-blue-950/80 to-cyan-950/60 border border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col lg:flex-row gap-0 items-stretch shadow-lg shadow-cyan-900/20">
            {/* ALEX Visual */}
            <div className="lg:w-72 shrink-0 relative flex items-center justify-center bg-gradient-to-b from-blue-900/40 to-cyan-900/20 p-6">
              <AlexVideo videoSrc="/manus-storage/alex-video-about_3f7aa3ba.mp4" className="w-64 h-64" />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                AI Partner
              </div>
            </div>
            {/* ALEX Info */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold text-white">ALEX</h3>
                <span className="inline-flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  Always Online
                </span>
              </div>
              <p className="text-cyan-400 text-sm font-semibold mb-1 uppercase tracking-wider">Chief Operations Partner</p>
              <p className="text-muted-foreground text-xs mb-4">Business Automation Coordinator · Expert Team Lead</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                ALEX is Vlad's dedicated operational partner and the coordinating force behind IntelligentForce. Trained exclusively on business automation, process optimization, and the IntelligentForce platform, she manages and directs all 9 expert specialists on your behalf. ALEX is not a general-purpose assistant – she is a focused professional, available 24/7, whose sole purpose is to deliver measurable results for your business.
              </p>
              <div className="bg-blue-950/60 border border-cyan-500/20 rounded-xl p-3 mb-4">
                <p className="text-cyan-300/80 text-xs font-medium">
                  Note: ALEX specializes exclusively in IntelligentForce services and business automation. She does not engage in general conversation or topics outside the platform's scope.
                </p>
              </div>
              <a href="/alex#chat" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                Chat with ALEX <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-card/20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">{a.visionTitle}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-center text-lg">
            <p>{a.vision1}</p>
            <p>{a.vision2}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 p-10 sm:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{a.ctaTitle}</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{a.ctaSub}</p>
            <Link href="/health-check" className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg">
              {a.ctaBtn} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
