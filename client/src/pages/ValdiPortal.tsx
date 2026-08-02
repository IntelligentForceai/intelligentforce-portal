import { useState } from "react";
import { Sparkles, Eye, EyeOff, Loader2, Bot, Send, ChevronDown, ChevronUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

const PASSWORD = "IF@Admin2026!Secure";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function AlexChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "God dag, Valdi! Jeg er ALEX — din Chief AI Coordinator hos IntelligentForce. Hva jobber vi med i dag?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const alexMutation = trpc.alex.chat.useMutation();

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const result = await alexMutation.mutateAsync({
        messages: updated.map((m) => ({ role: m.role, content: m.content })),
        language: "no",
        adminMode: true,
      });
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: result.content || "Beklager, teknisk problem. Prøv igjen.",
        timestamp: new Date(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Beklager, Valdi — midlertidig teknisk problem. Prøv igjen.",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatTime = (d: Date) => d.toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });

  const suggested = ["Hva er status på plattformen?", "Hvilke agenter er aktive?", "Gi meg en daglig rapport"];

  return (
    <div className="bg-[#0d1829] border border-cyan-500/30 rounded-2xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center">
              <Sparkles size={18} className="text-cyan-400" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d1829] animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">ALEX</p>
            <p className="text-xs text-cyan-400">Chief AI Coordinator · Online</p>
          </div>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>

      {isOpen && (
        <>
          <div className="h-96 overflow-y-auto px-4 py-3 space-y-3 border-t border-white/10">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-cyan-400" />
                  </div>
                )}
                <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-500/20 border border-cyan-500/30 text-white"
                    : "bg-[#0a1020] border border-white/10 text-white/90"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">{formatTime(msg.timestamp)}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={12} className="text-cyan-400" />
                </div>
                <div className="bg-[#0a1020] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="text-cyan-400 animate-spin" />
                  <span className="text-xs text-gray-400">ALEX tenker...</span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggested.map((p, i) => (
                <button key={i} onClick={() => setInput(p)}
                  className="text-xs text-cyan-400 border border-cyan-500/30 rounded-full px-3 py-1 hover:bg-cyan-500/10 transition-colors">
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-white/10 p-3 flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Skriv til ALEX... (Enter for å sende)"
              rows={1}
              className="flex-1 bg-[#0a1020] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-cyan-500/50 transition-colors"
              style={{ minHeight: "38px", maxHeight: "120px" }}
            />
            <button onClick={sendMessage} disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors disabled:opacity-40 shrink-0">
              <Send size={14} className="text-cyan-400" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function ValdiPortal() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    if (password === PASSWORD) {
      setLoggedIn(true);
    } else {
      setError("Feil passord. Prøv igjen.");
    }
    setLoading(false);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050a14] px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-4">
              <Sparkles size={28} className="text-cyan-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">IntelligentForce</h1>
            <p className="text-gray-400 text-sm mt-1">Privat portal · Kun for Valdi</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#0d1829] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-5">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Passord</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  required
                  autoFocus
                  className="w-full bg-[#0a1020] border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading || !password}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Logger inn...</> : "Logg inn"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">© 2026 IntelligentForce</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="IntelligentForce" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="text-lg font-extrabold text-white">Valdi's Portal</h1>
              <p className="text-xs text-cyan-400">IntelligentForce · Admin</p>
            </div>
          </div>
          <button onClick={() => setLoggedIn(false)}
            className="text-xs text-gray-500 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5">
            Logg ut
          </button>
        </div>

        {/* ALEX Chat */}
        <AlexChatPanel />

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a href="https://formspree.io/login" target="_blank" rel="noopener noreferrer"
            className="bg-[#0d1829] border border-white/10 hover:border-cyan-500/40 rounded-xl p-4 transition-colors">
            <p className="text-sm font-bold text-white mb-1">Formspree</p>
            <p className="text-xs text-gray-400">Se innsendte skjemaer og leads</p>
          </a>
          <a href="mailto:hello@intelligentforce.ai"
            className="bg-[#0d1829] border border-white/10 hover:border-cyan-500/40 rounded-xl p-4 transition-colors">
            <p className="text-sm font-bold text-white mb-1">E-post</p>
            <p className="text-xs text-gray-400">hello@intelligentforce.ai</p>
          </a>
          <a href="/" className="bg-[#0d1829] border border-white/10 hover:border-cyan-500/40 rounded-xl p-4 transition-colors">
            <p className="text-sm font-bold text-white mb-1">Portalen</p>
            <p className="text-xs text-gray-400">intelligentforce.ai</p>
          </a>
          <a href="/health-check" className="bg-[#0d1829] border border-white/10 hover:border-cyan-500/40 rounded-xl p-4 transition-colors">
            <p className="text-sm font-bold text-white mb-1">Health Check</p>
            <p className="text-xs text-gray-400">Business Health Check-siden</p>
          </a>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">© 2026 IntelligentForce · Privat portal</p>
      </div>
    </div>
  );
}
