import { Link } from "wouter";
import { usePageTracker } from "@/hooks/usePageTracker";
import { MapPin, Clock, ArrowRight, Users, Zap, Globe, Heart } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const openRoles = [
  {
    title: "Senior AI Implementation Consultant",
    department: "Delivery",
    location: "Oslo / Remote",
    type: "Full-time",
    description: "Lead end-to-end AI automation deployments for mid-market and enterprise clients. You will own the client relationship from onboarding through go-live, ensuring every deployment delivers measurable ROI within 14 days.",
    requirements: [
      "5+ years in enterprise software implementation or management consulting",
      "Strong understanding of business process automation",
      "Experience with CRM, ERP, or workflow platforms (Salesforce, SAP, HubSpot)",
      "Excellent communication and stakeholder management skills",
    ],
  },
  {
    title: "Business Development Manager",
    department: "Sales",
    location: "Oslo / London / Remote",
    type: "Full-time",
    description: "Build and manage relationships with mid-market and enterprise prospects across Europe and beyond. You will be the first point of human contact for qualified leads, converting ALEX-initiated conversations into long-term partnerships.",
    requirements: [
      "4+ years in B2B enterprise sales or business development",
      "Track record of closing deals in the $50K–$500K range",
      "Experience selling to C-suite and senior operations leaders",
      "Fluency in English; additional European languages a strong advantage",
    ],
  },
  {
    title: "AI Platform Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain the technical infrastructure that powers our nine AI agents. You will work on integration connectors, agent orchestration, and the reliability systems that ensure our platform operates at enterprise grade.",
    requirements: [
      "4+ years in backend or platform engineering",
      "Experience with LLM APIs, agent frameworks, or workflow automation",
      "Strong TypeScript/Python skills",
      "Experience with cloud infrastructure (AWS, GCP, or Azure)",
    ],
  },
  {
    title: "Client Success Manager",
    department: "Client Success",
    location: "Oslo / Remote",
    type: "Full-time",
    description: "Own the post-deployment relationship with our clients. You will monitor performance, identify expansion opportunities, and ensure every client achieves the ROI they were promised — and more.",
    requirements: [
      "3+ years in client success, account management, or consulting",
      "Strong analytical skills and comfort with operational metrics",
      "Experience in SaaS or professional services",
      "Proactive, relationship-driven approach to client management",
    ],
  },
  {
    title: "Content & Communications Strategist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Own the IntelligentForce content strategy — from thought leadership articles and case studies to investor communications and product narratives. You will shape how the world understands what we are building.",
    requirements: [
      "4+ years in B2B content marketing or communications",
      "Strong writing skills with a clear, authoritative voice",
      "Experience creating content for technical or enterprise audiences",
      "Understanding of SEO, distribution, and content performance metrics",
    ],
  },
];

const values = [
  {
    icon: <Zap size={28} className="text-cyan-400" />,
    title: "Speed with Substance",
    description: "We move fast — but never at the expense of quality or client outcomes. Every decision is grounded in what delivers real value.",
  },
  {
    icon: <Users size={28} className="text-purple-400" />,
    title: "Human-AI Partnership",
    description: "We believe the best outcomes come from humans and AI working together. This is not just our product philosophy — it is how we work internally.",
  },
  {
    icon: <Globe size={28} className="text-blue-400" />,
    title: "Global Ambition",
    description: "We are building for the world, not just one market. Our team is distributed, our clients are international, and our thinking is global.",
  },
  {
    icon: <Heart size={28} className="text-rose-400" />,
    title: "Ownership & Trust",
    description: "We hire exceptional people and trust them to do exceptional work. No micromanagement. No unnecessary process. Just outcomes.",
  },
];

export default function Careers() {
  useSEO({
    title: "Careers at IntelligentForce – Join the AI Revolution",
    description: "Join IntelligentForce and help build the future of AI business automation. Open positions in engineering, sales, and operations. Based in Oslo, Norway.",
    keywords: "IntelligentForce careers, AI jobs Norway, Oslo tech jobs, AI automation jobs, join AI company",
    canonical: "https://intelligentforce.ai/careers",
    
  });
  usePageTracker("/careers");

  return (
    <div className="min-h-screen pt-16">

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 text-cyan-400 text-sm font-medium mb-6">
            We're Hiring
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Build the Future of <span className="gradient-text">Intelligent Work</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            IntelligentForce is assembling a world-class team of professionals to scale AI-driven business automation globally. If you are exceptional at what you do and want to work on something that matters, we want to hear from you.
          </p>
          <a href="#open-roles" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base">
            See Open Roles <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              We are a small, high-performance team. Every person here has significant ownership and significant impact.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-7">
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 bg-card/20">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              ["Competitive compensation", "Base salary + performance bonus + equity participation for senior roles"],
              ["Flexible location", "Remote-first with optional presence in Oslo. Work from where you do your best work."],
              ["Direct impact", "Small team means your work is visible and your decisions matter from day one"],
              ["Learning & development", "Budget for conferences, courses, and tools that make you better at what you do"],
              ["Modern tooling", "Access to the latest AI tools, platforms, and infrastructure — we eat our own cooking"],
              ["Meaningful work", "We are solving a real problem for real businesses. The results are documented and visible."],
            ].map(([title, desc], i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <h4 className="text-white font-bold text-base mb-2">{title}</h4>
                <p className="text-muted-foreground text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Open Roles</h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We are building a team of exceptional professionals across delivery, sales, engineering, and client success.
            </p>
          </div>
          <div className="space-y-5">
            {openRoles.map((role, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-8 card-hover">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin size={13} /> {role.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock size={13} /> {role.type}
                      </span>
                      <span className="text-sm text-cyan-400 font-medium">{role.department}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:hello@intelligentforce.ai?subject=Application: ${role.title}`}
                    className="btn-gradient px-6 py-3 rounded-full font-semibold text-white text-sm shrink-0"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed mb-5">{role.description}</p>
                <div>
                  <p className="text-white font-semibold text-sm mb-3">What we're looking for:</p>
                  <ul className="space-y-2">
                    {role.requirements.map((req, j) => (
                      <li key={j} className="flex items-start gap-2 text-muted-foreground text-base">
                        <span className="text-cyan-400 mt-1 shrink-0">→</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative applications */}
      <section className="py-20 bg-card/20">
        <div className="container max-w-3xl text-center">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We are always interested in hearing from exceptional people, even if we do not have a specific opening right now. If you believe you can contribute to what we are building, reach out directly.
            </p>
            <a
              href="mailto:hello@intelligentforce.ai?subject=Speculative Application"
              className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base"
            >
              Send a Speculative Application <ArrowRight size={18} />
            </a>
            <p className="text-muted-foreground text-sm mt-5">hello@intelligentforce.ai</p>
          </div>
        </div>
      </section>
    </div>
  );
}
