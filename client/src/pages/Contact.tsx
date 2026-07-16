import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { Mail, Phone, MapPin, MessageCircle, FileText, Users, Activity, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", category: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: c.faq1Q, a: c.faq1A },
    { q: c.faq2Q, a: c.faq2A },
    { q: c.faq3Q, a: c.faq3A },
    { q: c.faq4Q, a: c.faq4A },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 text-sm transition-colors";

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-card/40 to-background">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {c.hero1} <span className="gradient-text">{c.hero2}</span>
          </h1>
          <p className="text-muted-foreground text-xl">{c.heroSub}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Info + ALEX */}
            <div className="flex flex-col gap-6">
              {/* ALEX video */}
              <AlexVideo videoSrc="/manus-storage/alex-video-contact_2eb64fa2.mp4" className="w-full max-w-xs mx-auto" />

              {/* Contact info */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-5">{c.infoTitle}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{c.emailLabel}</p>
                      <a href="mailto:hello@intelligentforce.ai" className="text-sm text-white hover:text-cyan-400 transition-colors">hello@intelligentforce.ai</a><br />
                      <a href="mailto:support@intelligentforce.ai" className="text-sm text-white hover:text-cyan-400 transition-colors">support@intelligentforce.ai</a>
                      <p className="text-xs text-muted-foreground mt-1">{c.response}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ALEX</p>
                      <a href="mailto:alex@intelligentforce.ai" className="text-sm text-white hover:text-cyan-400 transition-colors">alex@intelligentforce.ai</a>
                      <p className="text-xs text-muted-foreground">{c.response}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{c.officeLabel}</p>
                      <p className="text-sm text-white">{c.office}</p>
                      <p className="text-xs text-muted-foreground">{c.officeServing}</p>
                    </div>
                  </div>
                </div>

                <hr className="section-divider my-5" />

                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">{c.otherLabel}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <MessageCircle size={14} />, label: c.chat, href: "/alex" },
                    { icon: <FileText size={14} />, label: c.docs, href: "#" },
                    { icon: <Users size={14} />, label: c.forum, href: "#" },
                    { icon: <Activity size={14} />, label: c.status, href: "#" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors bg-background rounded-lg px-3 py-2"
                    >
                      {item.icon} {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">{c.formTitle}</h2>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 size={56} className="text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Melding sendt!</h3>
                    <p className="text-muted-foreground">Vi svarer deg innen 2 timer i arbeidstiden.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-cyan-400 text-sm hover:underline">
                      Send en ny melding
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">{c.name} *</label>
                        <input
                          type="text"
                          required
                          placeholder={c.namePlaceholder}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">{c.email} *</label>
                        <input
                          type="email"
                          required
                          placeholder={c.emailPlaceholder}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">{c.category} *</label>
                        <select
                          required
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className={inputClass + " cursor-pointer"}
                        >
                          <option value="">–</option>
                          {c.categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">{c.company}</label>
                        <input
                          type="text"
                          placeholder={c.companyPlaceholder}
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Suggested prompts */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">💡 Forslag:</p>
                      <div className="flex flex-wrap gap-2">
                        {c.suggestedPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => setForm({ ...form, message: prompt })}
                            className="text-xs bg-background border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-white hover:border-white/30 transition-colors"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">{c.message} *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder={c.messagePlaceholder}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={inputClass + " resize-none"}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-muted-foreground">{c.privacy}</p>
                      <button type="submit" className="btn-gradient px-8 py-3 rounded-full font-semibold text-white shrink-0">
                        {c.send}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Quick response */}
              <div className="mt-4 bg-card border border-border rounded-2xl p-5 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{c.quickResponse}</p>
                  <p className="text-xs text-muted-foreground">{c.quickResponseDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card/20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-10">{c.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
