import { useState } from "react";
import { Link } from "wouter";
import AlexVideo from "@/components/AlexVideo";
import { blogCaptions } from "@/lib/alexCaptions";
import { usePageTracker } from "@/hooks/usePageTracker";
import { Clock, ArrowRight, Mail, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const articles = [
  {
    id: "ai-automation-cost-reduction",
    slug: "how-ai-automation-reduces-operational-costs-by-60-percent",
    title: "How AI Automation Reduces Operational Costs by 60% — And Why Most Businesses Are Still Waiting",
    subtitle: "The gap between early adopters and the rest is widening fast. Here's what the numbers say.",
    date: "July 14, 2026",
    readTime: "7 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    excerpt: "Companies that have deployed AI-driven process automation are reporting operational cost reductions of 40–65%. The technology is proven. The ROI is documented. So why are the majority of mid-market businesses still on the sidelines?",
  },
  {
    id: "nine-ai-agents-explained",
    slug: "nine-ai-agents-that-run-your-business-while-you-focus-on-growth",
    title: "Nine AI Agents That Run Your Business While You Focus on Growth",
    subtitle: "A practical guide to what each agent does, what it costs to do manually, and what you save.",
    date: "July 7, 2026",
    readTime: "9 min read",
    category: "Platform Deep Dive",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    excerpt: "IntelligentForce deploys nine specialized AI agents, each designed to own a specific domain of your business operations. This is not a single AI that does everything adequately — it is a team of specialists, each expert in their field.",
  },
  {
    id: "implementation-14-days",
    slug: "from-contract-to-live-in-14-days-how-we-do-it",
    title: "From Contract to Live in 14 Days: How We Do It — and Why Speed Matters",
    subtitle: "Most AI implementations fail not because the technology doesn't work, but because they take too long.",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "Implementation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    excerpt: "The average enterprise AI implementation takes 6 to 18 months. By that point, the business case has shifted, the champion who drove the project has moved on, and the organization has lost confidence in the outcome.",
  },
  {
    id: "ai-human-collaboration",
    slug: "ai-and-human-collaboration-the-model-that-actually-works",
    title: "AI and Human Collaboration: The Model That Actually Works",
    subtitle: "The companies winning with AI are not replacing their people. They are restructuring what their people do.",
    date: "June 19, 2026",
    readTime: "8 min read",
    category: "Future of Work",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    excerpt: "Every major technology transition produces a wave of fear about job displacement, followed by a more nuanced reality. The companies that are winning with AI are not replacing their people — they are restructuring what their people do.",
  },
  {
    id: "business-health-check-guide",
    slug: "the-business-health-check-what-it-reveals-and-why-every-leader-should-do-it",
    title: "The Business Health Check: What It Reveals — and Why Every Leader Should Do It",
    subtitle: "Most businesses are losing significant revenue to inefficiencies they cannot see. The first step is knowing where to look.",
    date: "June 10, 2026",
    readTime: "5 min read",
    category: "Tools & Resources",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    excerpt: "Most businesses are losing significant revenue to inefficiencies they cannot see. Not because the inefficiencies are hidden — but because no one has looked at the right data in the right way.",
  },
  {
    id: "ai-automation-norway",
    slug: "ai-automation-norway-nordic-business-case",
    title: "AI Automation in Norway: The Business Case for Nordic Companies",
    subtitle: "Why Norwegian businesses are uniquely positioned to lead in AI automation — and how to get started.",
    date: "July 20, 2026",
    readTime: "8 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    excerpt: "Norwegian and Nordic businesses face a unique combination of high labour costs, strong digital infrastructure, and a culture of trust that makes AI automation not just viable — but strategically essential. Here is why the time to act is now.",
  },
  {
    id: "ai-customer-service-automation",
    slug: "ai-customer-service-automation-reduce-costs-improve-satisfaction",
    title: "How AI Customer Service Automation Cuts Costs by 60% While Improving Satisfaction",
    subtitle: "The counterintuitive truth: customers prefer faster AI responses over slow human ones for most inquiries.",
    date: "July 22, 2026",
    readTime: "7 min read",
    category: "Platform Deep Dive",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    excerpt: "Most businesses assume that replacing human customer service with AI will damage customer relationships. The data tells a different story. Companies that have deployed AI customer service agents are reporting both lower costs and higher satisfaction scores — simultaneously.",
  },
  {
    id: "smb-ai-automation-guide",
    slug: "small-medium-business-ai-automation-complete-guide-2026",
    title: "The Complete Guide to AI Automation for Small and Medium Businesses in 2026",
    subtitle: "AI automation is no longer just for enterprise. Here is everything SMBs need to know to get started.",
    date: "July 24, 2026",
    readTime: "10 min read",
    category: "Tools & Resources",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80",
    excerpt: "For years, AI automation was the exclusive domain of large enterprises with dedicated IT teams and million-dollar budgets. That era is over. In 2026, small and medium businesses can deploy enterprise-grade AI automation in 14 days, at a fraction of the cost.",
  },
  {
    id: "roi-ai-automation-calculation",
    slug: "how-to-calculate-roi-ai-automation-business-case",
    title: "How to Calculate the ROI of AI Automation: A Practical Framework for Business Leaders",
    subtitle: "Stop guessing. Here is the exact framework used by CFOs to build the business case for AI automation.",
    date: "July 26, 2026",
    readTime: "8 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    excerpt: "The number one reason businesses delay AI automation is not cost — it is uncertainty about ROI. This guide provides a concrete, step-by-step framework for calculating the financial return on AI automation investment, with real numbers from real implementations.",
  },
  {
    id: "enterprise-ai-workflow-automation",
    slug: "enterprise-ai-workflow-automation-guide-2026",
    title: "Enterprise AI Workflow Automation: The Complete Guide for 2026",
    subtitle: "How the world's most competitive companies are using AI agents to eliminate manual workflows — and what it takes to do the same.",
    date: "July 28, 2026",
    readTime: "9 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    excerpt: "Enterprise workflow automation has entered a new era. The question is no longer whether AI can handle complex business processes — it is how quickly your organisation can deploy it before competitors do.",
  },
  {
    id: "ai-agents-finance-accounting",
    slug: "ai-agents-finance-accounting-automation-enterprise",
    title: "AI Agents for Finance and Accounting: How Enterprises Are Cutting Reporting Time by 80%",
    subtitle: "The finance function is one of the highest-ROI targets for AI automation. Here is what the transformation looks like in practice.",
    date: "July 29, 2026",
    readTime: "8 min read",
    category: "Platform Deep Dive",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    excerpt: "Finance teams at mid-to-large enterprises spend an estimated 60 to 70 percent of their time on data gathering, reconciliation, and routine reporting. AI financial agents eliminate this burden — and the results are transformative.",
  },
  {
    id: "ai-hr-recruitment-automation",
    slug: "ai-hr-recruitment-automation-enterprise-guide",
    title: "AI in HR and Recruitment: How Enterprises Are Saving 20+ Hours Per Week",
    subtitle: "HR teams are drowning in administrative work. AI HR agents are changing that — and the impact goes beyond cost savings.",
    date: "July 30, 2026",
    readTime: "7 min read",
    category: "Future of Work",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    excerpt: "The average HR professional spends more than half their working week on administrative tasks. AI HR agents are eliminating this burden — and freeing HR to do the work that actually matters.",
  },
  {
    id: "digital-transformation-ai-agents-2026",
    slug: "digital-transformation-ai-agents-enterprise-2026",
    title: "Digital Transformation in 2026: Why AI Agents Are the Missing Piece",
    subtitle: "Most digital transformation programmes fail to deliver their promised returns. AI agents are changing the equation — but only when deployed correctly.",
    date: "July 31, 2026",
    readTime: "8 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    excerpt: "An estimated 70 percent of digital transformation programmes fail to meet their objectives. The reason is almost always the same: technology without intelligence. AI agents are the missing piece.",
  },
  {
    id: "ai-supply-chain-automation",
    slug: "ai-supply-chain-automation-procurement-logistics",
    title: "AI Supply Chain Automation: How Enterprises Are Saving $100K+ Annually on Procurement and Logistics",
    subtitle: "Supply chain complexity is increasing. Manual management is no longer viable. Here is how AI agents are transforming procurement and logistics operations.",
    date: "August 1, 2026",
    readTime: "7 min read",
    category: "Platform Deep Dive",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    excerpt: "Supply chain disruptions cost businesses an average of 45 percent of annual profits over a decade. AI supply chain agents are changing the risk profile — and delivering $100,000 or more in annual savings for mid-sized enterprises.",
  },
  {
    id: "ai-competitive-intelligence-market-analysis",
    slug: "ai-competitive-intelligence-market-analysis-enterprise",
    title: "AI-Powered Competitive Intelligence: How Enterprises Are Gaining a 15–25% Revenue Advantage",
    subtitle: "The businesses winning in their markets are not just competing harder — they are competing smarter, with AI-driven intelligence that their competitors cannot match.",
    date: "August 2, 2026",
    readTime: "7 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    excerpt: "Competitive intelligence has always been valuable. What has changed is the scale and speed at which AI can gather, synthesise, and act on it. Enterprises deploying AI market analysis agents are reporting 15 to 25 percent revenue improvements.",
  },
];

const categories = ["All", "Business Strategy", "Platform Deep Dive", "Implementation", "Future of Work", "Tools & Resources"];

const categoryColors: Record<string, string> = {
  "Business Strategy":  "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Platform Deep Dive": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Implementation":     "text-green-400 bg-green-400/10 border-green-400/20",
  "Future of Work":     "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Tools & Resources":  "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function Blog() {
  useSEO({
    title: "Blog – AI Automation Insights | IntelligentForce",
    description: "Read the latest insights on AI business automation, digital transformation, and how AI agents are reshaping enterprise operations. Expert articles from IntelligentForce.",
    keywords: "AI automation blog, business automation articles, AI insights, digital transformation, AI agents blog",
    canonical: "https://intelligentforce.ai/blog",
    
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  usePageTracker("/blog");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  const featured = articles[0];
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <div className="min-h-screen pt-16">

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 text-cyan-400 text-sm font-medium mb-6">
            IntelligentForce Insights
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            AI. Business. <span className="gradient-text">Results.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practical insights on AI automation, business strategy, and the future of work — written for leaders who want to act, not just read.
          </p>
        </div>
      </section>

      {/* ALEX video + Featured article */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* ALEX */}
            <div className="flex flex-col items-center gap-4">
              <AlexVideo videoSrc="/videos/alex-video-blog_9514bfdb.mp4" className="w-full max-w-xs" captions={blogCaptions} />
              <p className="text-muted-foreground text-base text-center max-w-xs leading-relaxed">
                "Every article on this blog is written to give you one thing: a clear, actionable insight you can use in your business today."
              </p>
              <p className="text-cyan-400 text-sm font-semibold">— ALEX, Chief Operations Partner</p>
            </div>

            {/* Featured article */}
            <Link href={`/blog/${featured.slug}`}>
              <article className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden card-hover h-full">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[featured.category]}`}>
                      {featured.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                      <Clock size={13} /> {featured.readTime} · {featured.date}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center gap-1 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                    Featured Article
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read article <ArrowRight size={15} />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-4 bg-background border-t border-border/40">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-base font-medium transition-all ${
                  activeCategory === cat
                    ? "btn-gradient text-white shadow-lg"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <article className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden card-hover flex flex-col h-full">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[article.category]}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Clock size={13} /> {article.readTime} · {article.date}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed flex-1 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                      Read article <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-card/20">
        <div className="container max-w-2xl text-center">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-10 sm:p-14">
            <Mail size={44} className="text-cyan-400 mx-auto mb-5" />
            <h2 className="text-3xl font-bold text-white mb-3">Stay Ahead of the Curve</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              New articles every week. Practical insights on AI automation, business strategy, and the future of work. No noise — just signal.
            </p>
            {subscribed ? (
              <div className="text-green-400 font-semibold text-lg">✅ You're subscribed. Welcome aboard.</div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-background border border-border rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 text-base"
                />
                <button type="submit" className="btn-gradient px-8 py-4 rounded-full font-bold text-white text-base shrink-0">
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-sm text-muted-foreground mt-4">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-white/10 p-12 sm:p-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-5">Ready to See Your Numbers?</h2>
            <p className="text-white/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Take the free Business Health Check and discover exactly how much your business could save with AI automation.
            </p>
            <Link href="/health-check" className="btn-gradient inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white text-lg">
              Start Free Health Check <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
