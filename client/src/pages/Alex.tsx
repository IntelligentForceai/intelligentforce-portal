import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { Clock, Globe, ArrowRight } from "lucide-react";

export default function Alex() {
  const { t } = useLang();
  const a = t.alex;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">{a.hero}</h1>
            <p className="text-muted-foreground text-xl">{a.heroSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Video */}
            <div className="flex justify-center">
              <AlexVideo videoSrc="/manus-storage/alex-video-alex_72e1beba.mp4" className="w-full max-w-sm" />
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
    </div>
  );
}
