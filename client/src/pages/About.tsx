import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { ArrowRight, User } from "lucide-react";

export default function About() {
  const { t } = useLang();
  const a = t.about;

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
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{a.teamTitle}</h2>
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-center">
            {/* Photo placeholder */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 relative">
              <User size={40} className="text-white/60" />
              {/* TODO: Erstatt med ekte bilde */}
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                CEO
              </div>
            </div>
            <div className="text-center sm:text-left">
              {/* TODO: Erstatt [NAVN] med ekte navn */}
              <h3 className="text-xl font-bold text-white mb-0.5">{a.founderName}</h3>
              <p className="text-cyan-400 text-sm font-medium mb-1">{a.founderTitle}</p>
              <p className="text-muted-foreground text-xs mb-3">{a.founderRole}</p>
              <p className="text-muted-foreground text-sm mb-4">{a.founderBio}</p>
              <blockquote className="border-l-2 border-cyan-500 pl-4 italic text-white/70 text-sm">
                "{a.founderQuote}"
              </blockquote>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            📸 {/* TODO: Erstatt plassholder-bilde med ekte foto */}
            Erstatt sirkel-ikonet over med ekte profilbilde
          </p>
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
            <Link href="/contact" className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg">
              {a.ctaBtn} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
