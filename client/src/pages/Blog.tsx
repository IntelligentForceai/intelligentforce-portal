import { useState } from "react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { usePageTracker } from "@/hooks/usePageTracker";
import { Clock, ArrowRight, Mail } from "lucide-react";

export default function Blog() {
  const { t } = useLang();
  const b = t.blog;
  const [activeCategory, setActiveCategory] = useState(b.categories[0]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  usePageTracker("/blog");

  const filtered =
    activeCategory === b.categories[0]
      ? b.articles
      : b.articles.filter((a) => a.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const categoryColors: Record<string, string> = {
    "Bransjeinnsikt": "text-cyan-400 bg-cyan-400/10",
    "Industry Solutions": "text-cyan-400 bg-cyan-400/10",
    "Raske gevinster": "text-green-400 bg-green-400/10",
    "Quick Wins": "text-green-400 bg-green-400/10",
    "Implementeringsguider": "text-blue-400 bg-blue-400/10",
    "Implementation Guides": "text-blue-400 bg-blue-400/10",
    "Team & selskap": "text-purple-400 bg-purple-400/10",
    "Team & Company": "text-purple-400 bg-purple-400/10",
    "Sammenligninger": "text-orange-400 bg-orange-400/10",
    "Comparisons": "text-orange-400 bg-orange-400/10",
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{b.hero}</h1>
          <p className="text-muted-foreground text-xl">{b.heroSub}</p>
        </div>
      </section>

      {/* ALEX video */}
      <section className="pb-8 bg-background">
        <div className="container flex justify-center">
          <AlexVideo videoSrc="/manus-storage/alex-video-blog_9514bfdb.mp4" className="w-full max-w-xs" />
        </div>
      </section>

      {/* Category filters */}
      <section className="py-8 bg-background">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {b.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "btn-gradient text-white"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <article key={article.id} className="bg-card border border-border rounded-2xl overflow-hidden card-hover flex flex-col">
                {/* Article image placeholder */}
                <div className="h-44 bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                  <span className="text-5xl">
                    {article.category.includes("Bransje") || article.category.includes("Industry") ? "📊" :
                     article.category.includes("Raske") || article.category.includes("Quick") ? "⚡" :
                     article.category.includes("Implementer") || article.category.includes("Implement") ? "🛠️" :
                     article.category.includes("Team") ? "👥" : "🔄"}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category] || "text-white/60 bg-white/10"}`}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={11} /> {article.readTime} {b.minRead}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <button className="flex items-center gap-1 text-cyan-400 text-sm font-medium hover:gap-2 transition-all">
                      {b.readMore} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-card/20">
        <div className="container max-w-2xl text-center">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-10">
            <Mail size={40} className="text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">{b.newsletter}</h2>
            <p className="text-muted-foreground mb-6">{b.newsletterSub}</p>
            {subscribed ? (
              <div className="text-green-400 font-semibold">✅ Takk for abonnementet!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={b.newsletterPlaceholder}
                  required
                  className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 text-sm"
                />
                <button type="submit" className="btn-gradient px-6 py-3 rounded-full font-semibold text-white text-sm shrink-0">
                  {b.subscribe}
                </button>
              </form>
            )}
            <p className="text-xs text-muted-foreground mt-3">{b.newsletterDisclaimer}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 p-10 sm:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{b.ctaTitle}</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{b.ctaSub}</p>
            <Link href="/contact" className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-lg">
              {b.ctaBtn} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
