import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { trpc } from "@/lib/trpc";
import { usePageTracker } from "@/hooks/usePageTracker";
import { Mail, MapPin, MessageCircle, FileText, Users, Activity, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  usePageTracker("/contact");

  const [form, setForm] = useState({ name: "", email: "", category: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const submitMutation = trpc.portal.submitContact.useMutation({
    onSuccess: () => setSent(true),
    onError: () => setSent(true),
  });

  const faqs = [
    { q: c.faq1Q, a: c.faq1A },
    { q: c.faq2Q, a: c.faq2A },
    { q: c.faq3Q, a: c.faq3A },
    { q: c.faq4Q, a: c.faq4A },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      category: form.category || undefined,
      message: form.message,
    });
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
              <AlexVideo videoSrc="/videos/alex-video-contact_2eb64fa2.mp4" className="w-full max-w-xs mx-auto" />

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
                      <p className="text-xs text-muted-foreground mb-1">AI-assistent</p>
                      <a href="mailto:alex@intelligentforce.ai" className="text-sm text-white hover:text-cyan-400 transition-colors">alex@intelligentforce.ai</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{c.officeLabel}</p>
                      <p className="text-sm text-white">{c.office}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-base font-bold text-white mb-4">{c.otherLabel}</h2>
                <div className="space-y-2">
                  {[
                    { icon: <FileText size={15} />, label: c.docs },
                    { icon: <Users size={15} />, label: c.forum },
                    { icon: <Activity size={15} />, label: c.status },
                    { icon: <MessageCircle size={15} />, label: c.chat },
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-3 text-sm text-muted-foreground hover:text-white hover:bg-background/50 rounded-xl px-3 py-2.5 transition-colors text-left">
                      <span className="text-cyan-400">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 size={56} className="text-emerald-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{c.quickResponse}</h3>
                    <p className="text-muted-foreground">{c.quickResponseDesc}</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", category: "", company: "", message: "" }); }}
                      className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Send ny melding
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-white mb-6">{c.formTitle}</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1.5">{c.name}</label>
                          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={c.namePlaceholder} required className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1.5">{c.email}</label>
                          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder={c.emailPlaceholder} required className={inputClass} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1.5">{c.company}</label>
                          <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder={c.companyPlaceholder} className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1.5">{c.category}</label>
                          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass + " appearance-none"}>
                            {c.categories.map((cat, i) => (
                              <option key={i} value={i === 0 ? "" : cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">{c.message}</label>
                        <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={c.messagePlaceholder} required rows={6} className={inputClass + " resize-none"} />
                      </div>
                      <button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 text-black font-bold py-3.5 rounded-xl transition-all duration-200 text-sm"
                      >
                        {submitMutation.isPending ? "Sender..." : c.send}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* FAQ */}
              <div className="mt-6 bg-card border border-border rounded-2xl p-6">
                <h2 className="text-base font-bold text-white mb-4">{c.faqTitle}</h2>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-background/50 transition-colors"
                      >
                        <span className="text-sm font-medium text-white">{faq.q}</span>
                        {openFaq === i ? <ChevronUp size={15} className="text-muted-foreground shrink-0" /> : <ChevronDown size={15} className="text-muted-foreground shrink-0" />}
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/50">
                          <p className="pt-3">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
