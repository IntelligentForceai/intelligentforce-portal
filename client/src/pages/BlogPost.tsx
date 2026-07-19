import { Link, useParams } from "wouter";
import { usePageTracker } from "@/hooks/usePageTracker";
import { Clock, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const articles: Record<string, {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}> = {
  "how-ai-automation-reduces-operational-costs-by-60-percent": {
    id: "ai-automation-cost-reduction",
    slug: "how-ai-automation-reduces-operational-costs-by-60-percent",
    title: "How AI Automation Reduces Operational Costs by 60% — And Why Most Businesses Are Still Waiting",
    subtitle: "The gap between early adopters and the rest is widening fast. Here's what the numbers say.",
    date: "July 14, 2026",
    readTime: "7 min read",
    category: "Business Strategy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
    excerpt: "Companies that have deployed AI-driven process automation are reporting operational cost reductions of 40–65%. The technology is proven. The ROI is documented. So why are the majority of mid-market businesses still on the sidelines?",
    content: `The numbers are no longer theoretical. Across industries — from logistics and finance to professional services and manufacturing — companies that have deployed AI-driven process automation are reporting operational cost reductions of 40 to 65 percent. The technology is proven. The return on investment is documented. So why are the majority of mid-market businesses still on the sidelines?

The answer is not skepticism. Most business leaders understand that AI is transforming their industries. The answer is complexity — or more precisely, the perceived complexity of implementation.

## The Cost of Waiting

Every month a business delays automation, it absorbs costs that could have been eliminated. Consider a mid-sized company with 50 employees handling customer service, data entry, reporting, and compliance manually. Conservative estimates place the cost of these manual processes at $180,000 to $240,000 annually in labor alone — before accounting for error rates, delays, and missed opportunities.

A properly deployed AI automation platform eliminates 60 to 80 percent of that overhead within the first 90 days.

The math is straightforward. The hesitation is not.

## Where the Savings Actually Come From

AI automation does not simply "speed things up." It fundamentally restructures how work gets done. The savings come from four distinct sources.

**Process elimination.** Many business processes exist not because they add value, but because they were the only way to accomplish a task before automation was available. AI identifies and eliminates these entirely.

**Error reduction.** Manual processes carry an average error rate of 1 to 5 percent. In finance, compliance, and customer data management, these errors are expensive. AI-driven processes operate at error rates below 0.1 percent.

**24/7 operational capacity.** Human teams work shifts. AI agents do not. Customer service, data processing, and reporting functions that previously required overnight staffing now run continuously at no additional cost.

**Scalability without proportional cost.** When a business grows, manual processes require proportional headcount increases. Automated processes scale at near-zero marginal cost.

## The Implementation Barrier — and How It Has Changed

Three years ago, deploying enterprise-grade AI automation required a team of data scientists, months of custom development, and integration work that cost more than the savings it generated. That era is over.

Modern AI automation platforms — built on pre-trained models and standardized integration frameworks — can be deployed in two to three weeks. The configuration work that previously required specialists can now be handled by implementation consultants who understand the business context, not just the technology.

At IntelligentForce, we have reduced average implementation time to 14 days from contract to live deployment. Not because we have cut corners, but because the underlying technology has matured to the point where speed and quality are no longer in tension.

## What the Early Adopters Know

The businesses that moved early on AI automation share a common characteristic: they made the decision based on documented results from comparable companies, not on internal proof-of-concept projects.

They did not spend six months evaluating technology. They found a platform with a proven track record, validated the ROI model against their own cost structure, and moved.

The competitive advantage they have built in the intervening years is now structural. Their cost base is lower. Their capacity is higher. And their ability to respond to market changes is faster.

The window for catching up is still open. But it is narrowing.

## The Right Question to Ask

The question is not "should we automate?" That question was answered years ago. The question is: "What is the cost of each additional month we delay?"

For most mid-market businesses, that cost is between $15,000 and $25,000 per month in avoidable operational expense.

The decision to act is not a technology decision. It is a financial one.`,
  },

  "nine-ai-agents-that-run-your-business-while-you-focus-on-growth": {
    id: "nine-ai-agents-explained",
    slug: "nine-ai-agents-that-run-your-business-while-you-focus-on-growth",
    title: "Nine AI Agents That Run Your Business While You Focus on Growth",
    subtitle: "A practical guide to what each agent does, what it costs to do manually, and what you save.",
    date: "July 7, 2026",
    readTime: "9 min read",
    category: "Platform Deep Dive",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=85",
    excerpt: "IntelligentForce deploys nine specialized AI agents, each designed to own a specific domain of your business operations.",
    content: `IntelligentForce deploys nine specialized AI agents, each designed to own a specific domain of your business operations. This is not a single AI that does everything adequately — it is a team of specialists, each expert in their field, coordinated by a central intelligence layer.

Here is what each agent does, what it replaces, and what it saves.

## 1. Data Analyst

**What it does:** Processes large datasets, identifies patterns, generates predictive models, and produces executive-ready reports on demand.

**What it replaces:** A full-time data analyst or an outsourced analytics function that typically costs $60,000 to $90,000 annually.

**Key capability:** Real-time analysis. Instead of weekly or monthly reports, business leaders receive continuous insight as conditions change.

## 2. Customer Service Specialist

**What it does:** Handles inbound customer inquiries across email, chat, and web forms — 24 hours a day, seven days a week. Escalates complex cases to human agents with full context attached.

**What it replaces:** Two to four customer service representatives for companies handling 500+ monthly inquiries.

**Key capability:** Resolution rate. The agent resolves 78 percent of inquiries without human intervention, with a customer satisfaction score consistently above 4.2 out of 5.

## 3. Market Analyst

**What it does:** Monitors competitor activity, tracks market trends, analyzes pricing movements, and delivers structured competitive intelligence briefings.

**What it replaces:** A market research subscription ($15,000–$40,000 annually) plus the internal time required to synthesize findings.

**Key capability:** Speed. Market intelligence that previously took a week to compile is delivered in hours.

## 4. Risk Manager

**What it does:** Monitors regulatory changes, flags compliance risks, reviews contracts for exposure, and maintains an up-to-date risk register.

**What it replaces:** Partial legal and compliance consulting costs, which for mid-market companies typically run $30,000 to $80,000 annually.

**Key capability:** Proactive alerting. The agent identifies risks before they become incidents, not after.

## 5. Process Optimizer

**What it does:** Maps existing workflows, identifies bottlenecks and redundancies, and implements optimized process flows across connected systems.

**What it replaces:** Management consulting engagements focused on operational efficiency, which typically cost $50,000 to $150,000 per project.

**Key capability:** Continuous improvement. Unlike a consulting engagement that delivers a report and leaves, the Process Optimizer monitors and adjusts workflows on an ongoing basis.

## 6. Content Creator

**What it does:** Produces marketing copy, social media content, email campaigns, product descriptions, and internal communications — aligned with brand voice and strategy.

**What it replaces:** A content marketing function that, including tools and freelance costs, typically runs $40,000 to $70,000 annually.

**Key capability:** Volume and consistency. The agent produces content at a scale that human teams cannot match, while maintaining brand consistency across all channels.

## 7. Supply Chain Coordinator

**What it does:** Monitors inventory levels, optimizes reorder points, coordinates with suppliers, and flags supply chain risks before they impact operations.

**What it replaces:** Supply chain management software ($20,000–$50,000 annually) plus the analyst time required to act on its outputs.

**Key capability:** Predictive ordering. The agent reduces stockouts by 85 percent and excess inventory by 40 percent through demand-based forecasting.

## 8. HR Specialist

**What it does:** Automates recruitment screening, manages onboarding workflows, tracks compliance requirements, and handles routine HR inquiries from employees.

**What it replaces:** Significant portions of HR administrative workload — typically 20 to 30 hours per week for a company of 50 to 200 employees.

**Key capability:** Candidate quality. By screening based on structured criteria rather than keyword matching, the agent improves the quality of shortlisted candidates while reducing time-to-hire by 40 percent.

## 9. Financial Analyst

**What it does:** Monitors cash flow, tracks budget variances, generates financial forecasts, and produces board-ready financial summaries.

**What it replaces:** Financial reporting and analysis functions that, for mid-market companies, typically consume 15 to 25 hours of skilled labor per month.

**Key capability:** Forecast accuracy. The agent's rolling 90-day cash flow forecasts have demonstrated 94 percent accuracy across deployed clients.

## The Coordination Layer

What makes these nine agents more powerful than the sum of their parts is the coordination layer — the central intelligence that routes information between agents, resolves conflicts, and ensures that insights from one domain inform decisions in another.

When the Market Analyst identifies a competitor pricing change, the Financial Analyst models the impact on margins, the Content Creator prepares a response campaign, and the Process Optimizer reviews fulfillment capacity — all without a single human instruction.

This is not automation. This is operational intelligence.`,
  },

  "from-contract-to-live-in-14-days-how-we-do-it": {
    id: "implementation-14-days",
    slug: "from-contract-to-live-in-14-days-how-we-do-it",
    title: "From Contract to Live in 14 Days: How We Do It — and Why Speed Matters",
    subtitle: "Most AI implementations fail not because the technology doesn't work, but because they take too long.",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "Implementation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
    excerpt: "The average enterprise AI implementation takes 6 to 18 months. We built IntelligentForce to solve this problem.",
    content: `The average enterprise AI implementation takes 6 to 18 months. By that point, the business case has shifted, the champion who drove the project has moved on, and the organization has lost confidence in the outcome. The technology may work perfectly — but the implementation has failed.

We built IntelligentForce to solve this problem. Our standard deployment timeline is 14 days from signed contract to live production. Here is how that is possible, and why the speed itself is a strategic advantage.

## Why Traditional Implementations Take So Long

Long implementation timelines are not caused by technical complexity. They are caused by three structural problems that most enterprise software vendors have never been motivated to solve.

**Requirements gathering that never ends.** Traditional implementations begin with extensive discovery phases designed to document every edge case before writing a single line of configuration. This is thorough — and it is also the primary reason projects take months before anything is live.

**Custom development for standard problems.** Most business automation needs are not unique. Customer service workflows, financial reporting structures, HR screening criteria — these follow patterns that repeat across industries. Yet most vendors treat each implementation as a custom project.

**Integration complexity that is treated as inevitable.** Connecting an AI platform to existing business systems — CRM, ERP, communication tools — is presented as inherently difficult. It is not. It requires standardized connectors and a team that has built them before.

## The IntelligentForce Approach

We restructured the implementation process around a single principle: get to value as fast as possible, then optimize.

**Days 1–3: Rapid Discovery.** We conduct a structured business health assessment that maps your current processes, identifies the highest-value automation opportunities, and establishes baseline metrics.

**Days 4–7: Configuration and Integration.** We configure the relevant AI agents against your business context and connect them to your existing systems using our pre-built integration library, which covers over 500 platforms.

**Days 8–11: Parallel Testing.** The configured agents run in parallel with your existing processes. We measure outputs against your current results and adjust configuration parameters until performance meets or exceeds baseline.

**Days 12–14: Handover and Go-Live.** We train your team, document the configuration, establish monitoring dashboards, and transfer operational control. You are live.

## Why Speed Is a Strategic Advantage

The 14-day timeline is not just a selling point. It changes the risk profile of the decision entirely.

When an implementation takes 12 months, the organization must commit significant resources before seeing any return. The risk is high, and the organizational resistance to making it is rational.

When an implementation takes 14 days, the commitment is minimal and the return is immediate. The decision to proceed becomes straightforward, and the internal momentum that builds from early results accelerates adoption across the organization.

We have found that clients who go live in 14 days expand their use of the platform by an average of 340 percent in the following six months. Not because we sold them more — but because they saw results and wanted more of them.

## What 14 Days Requires From You

Speed is a two-way commitment. To deliver a live implementation in 14 days, we need three things from your organization.

A designated implementation contact who can make decisions and has access to the relevant systems. Access to your existing systems for integration setup. And a willingness to start with the highest-value use case rather than trying to automate everything at once.

The rest is our responsibility.`,
  },

  "ai-and-human-collaboration-the-model-that-actually-works": {
    id: "ai-human-collaboration",
    slug: "ai-and-human-collaboration-the-model-that-actually-works",
    title: "AI and Human Collaboration: The Model That Actually Works",
    subtitle: "The companies winning with AI are not replacing their people. They are restructuring what their people do.",
    date: "June 19, 2026",
    readTime: "8 min read",
    category: "Future of Work",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85",
    excerpt: "Every major technology transition produces a wave of fear about job displacement, followed by a more nuanced reality.",
    content: `Every major technology transition produces a wave of fear about job displacement, followed by a more nuanced reality. The introduction of spreadsheet software was supposed to eliminate accounting jobs. It did not — it eliminated the tedious parts of accounting and elevated accountants into strategic advisors. The introduction of CRM software was supposed to reduce the need for sales teams. It did not — it made sales teams more effective by giving them better information.

AI is following the same pattern. The companies that are winning with AI are not replacing their people. They are restructuring what their people do.

## The Displacement Myth

The fear of AI displacement is based on a misunderstanding of what AI is good at and what humans are good at.

AI excels at processing large volumes of structured information, identifying patterns, executing defined processes consistently, and operating continuously without fatigue. These capabilities make AI exceptionally good at the repetitive, rule-based components of most business roles.

Humans excel at judgment in ambiguous situations, relationship-building, creative problem-solving, and navigating organizational complexity. These capabilities are not diminished by AI — they become more valuable when the repetitive work is removed.

The displacement that is occurring is not of people, but of tasks. And the net effect, for organizations that manage the transition well, is that their people become significantly more productive and significantly more engaged.

## What the Data Shows

Companies that have deployed AI automation at scale report consistent patterns in workforce impact.

Administrative and data processing tasks — which typically consume 30 to 50 percent of knowledge worker time — are reduced by 70 to 90 percent. This time is not eliminated. It is redirected toward higher-value activities: client relationships, strategic analysis, product development, and organizational improvement.

Employee satisfaction scores in organizations with mature AI deployments are, on average, 23 percent higher than in comparable organizations without automation. The reason is straightforward: people prefer doing meaningful work over repetitive tasks.

Voluntary turnover rates are lower. Productivity per employee is higher. And the organizations are more agile — able to respond to market changes faster because their people are not consumed by operational maintenance.

## The IntelligentForce Model

At IntelligentForce, we have built our platform around a specific philosophy of human-AI collaboration: AI handles the operational layer, humans own the strategic layer, and the boundary between them is explicit and adjustable.

Every AI agent in our platform operates with defined escalation criteria. When a situation falls outside the agent's configured parameters — a customer complaint that requires empathy, a financial anomaly that requires judgment, a risk that requires executive awareness — the agent escalates immediately, with full context, to the appropriate human.

This is not a limitation of the technology. It is a design choice. We believe that the most effective AI deployments are those where humans always know what the AI is doing, can always override it, and are always the final decision-makers on matters that require judgment.

## Building the Hybrid Organization

The transition to a human-AI collaborative model requires deliberate organizational design. It does not happen automatically when you deploy automation software.

The organizations that do it well share three characteristics.

They are explicit about what AI will handle and what humans will handle, and they communicate this clearly to their teams. Ambiguity about AI's role creates anxiety. Clarity creates confidence.

They invest in helping their people develop the skills that become more valuable in an AI-augmented environment: critical thinking, communication, relationship management, and strategic judgment.

They measure the right outcomes. Not "how many tasks did the AI complete?" but "what did our people accomplish with the time that was freed up?"

## The Competitive Advantage

In five years, the distinction between AI-augmented organizations and traditional organizations will be as stark as the distinction between companies with internet presence and those without in 2005.

The companies building that advantage now are not doing so by replacing their people with AI. They are doing so by giving their people capabilities that their competitors' people do not have.

That is the model that works. And it is available today.`,
  },

  "the-business-health-check-what-it-reveals-and-why-every-leader-should-do-it": {
    id: "business-health-check-guide",
    slug: "the-business-health-check-what-it-reveals-and-why-every-leader-should-do-it",
    title: "The Business Health Check: What It Reveals — and Why Every Leader Should Do It",
    subtitle: "Most businesses are losing significant revenue to inefficiencies they cannot see. The first step is knowing where to look.",
    date: "June 10, 2026",
    readTime: "5 min read",
    category: "Tools & Resources",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85",
    excerpt: "Most businesses are losing significant revenue to inefficiencies they cannot see. Not because the inefficiencies are hidden — but because no one has looked at the right data in the right way.",
    content: `Most businesses are losing significant revenue to inefficiencies they cannot see. Not because the inefficiencies are hidden — but because no one has looked at the right data in the right way.

This is not a criticism. It is a structural reality. When you are running a business, your attention is on customers, revenue, and the immediate problems in front of you. The slow leaks — the processes that cost 20 percent more than they should, the customer service gaps that erode retention, the reporting delays that slow decision-making — accumulate quietly in the background.

The Business Health Check is designed to surface these leaks in 15 minutes.

## What the Health Check Measures

The assessment covers five operational domains that, together, account for the majority of addressable inefficiency in mid-market businesses.

**Process efficiency.** How much of your team's time is spent on tasks that could be automated? What is the error rate in your current manual processes? Where are the bottlenecks that slow output?

**Customer service performance.** What is your average response time to customer inquiries? What percentage of issues are resolved on first contact? What is your customer satisfaction trend?

**Data and reporting.** How long does it take to produce a standard management report? How often are business decisions made without current data? What is the cost of your current analytics function?

**Risk and compliance.** How current is your compliance monitoring? What is your exposure to regulatory changes in your industry? How are contracts and vendor agreements tracked?

**Financial operations.** What is the accuracy of your current cash flow forecasting? How much time does your finance function spend on reporting versus analysis? Where are the largest variances between budget and actual?

## What the Results Look Like

The Health Check produces a structured output: a quantified assessment of your current operational cost in each domain, a benchmark against comparable businesses in your industry, and a prioritized list of automation opportunities ranked by ROI.

For most businesses, the results are surprising — not because the inefficiencies are shocking, but because seeing them quantified makes the cost of inaction concrete.

A typical mid-market company with 50 to 150 employees discovers $180,000 to $350,000 in annual operational cost that is directly addressable through automation. The highest-priority opportunities typically represent $80,000 to $120,000 of that total.

## Why Leaders Hesitate to Do It

The most common reason business leaders give for not completing the Health Check is that they already know where their inefficiencies are. They are right — they usually do know, in general terms.

What they do not have is the quantification. And without quantification, the decision to invest in automation remains a judgment call rather than a financial decision.

The Health Check converts a judgment call into a financial decision. It answers the question: "What is the cost of not acting?" — with a specific number, derived from your specific business context.

That number changes the conversation.

## How to Use the Results

The Health Check output is designed to be actionable, not academic. It includes three things.

A prioritized list of automation opportunities, ranked by annual savings potential and implementation complexity. This tells you where to start.

A 90-day roadmap for implementing the highest-priority opportunities. This tells you what the path looks like.

A baseline measurement framework. This tells you how to track the results so that the ROI of automation is documented and visible to your organization.

The assessment takes 15 minutes to complete. The insight it provides is worth considerably more than that.`,
  },
};

const categoryColors: Record<string, string> = {
  "Business Strategy":  "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Platform Deep Dive": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Implementation":     "text-green-400 bg-green-400/10 border-green-400/20",
  "Future of Work":     "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Tools & Resources":  "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((para, i) => {
    if (para.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-5 leading-tight">
          {para.replace("## ", "")}
        </h2>
      );
    }
    // Bold inline text
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-5">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  usePageTracker(`/blog/${params.slug}`);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [params.slug]);

  const article = articles[params.slug ?? ""];

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          <Link href="/blog" className="text-cyan-400 hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const allArticles = Object.values(articles);
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-8">
          <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border mb-4 ${categoryColors[article.category]}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-3 text-white/60 text-base">
            <Clock size={15} /> {article.readTime} · {article.date}
          </div>
        </div>
      </div>

      {/* Article content */}
      <article className="container max-w-3xl py-12">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white text-base mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
          {article.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed border-l-4 border-cyan-500 pl-5">
          {article.subtitle}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-12 pb-8 border-b border-border">
          <div className="w-10 h-10 rounded-full btn-gradient flex items-center justify-center text-white font-bold text-sm">
            IF
          </div>
          <div>
            <div className="text-white font-semibold text-base">ALEX · IntelligentForce</div>
            <div className="text-muted-foreground text-sm">Chief Operations Partner</div>
          </div>
        </div>

        {/* Body */}
        <div className="prose-custom">
          {renderContent(article.content)}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to See Your Numbers?</h3>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            Take the free Business Health Check and discover exactly how much your business could save with AI automation.
          </p>
          <Link href="/health-check" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base">
            Start Free Health Check <ChevronRight size={18} />
          </Link>
        </div>

        {/* Prev / Next */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle && (
            <Link href={`/blog/${prevArticle.slug}`} className="group p-5 bg-card border border-border rounded-xl hover:border-cyan-500/40 transition-colors">
              <div className="text-muted-foreground text-sm mb-2 flex items-center gap-1">
                <ArrowLeft size={13} /> Previous
              </div>
              <div className="text-white font-semibold text-base leading-snug group-hover:text-cyan-300 transition-colors">
                {prevArticle.title}
              </div>
            </Link>
          )}
          {nextArticle && (
            <Link href={`/blog/${nextArticle.slug}`} className="group p-5 bg-card border border-border rounded-xl hover:border-cyan-500/40 transition-colors sm:text-right">
              <div className="text-muted-foreground text-sm mb-2 flex items-center gap-1 sm:justify-end">
                Next <ArrowRight size={13} />
              </div>
              <div className="text-white font-semibold text-base leading-snug group-hover:text-cyan-300 transition-colors">
                {nextArticle.title}
              </div>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
