import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, ChevronDown, ChevronUp, Bot } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AlexChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "God dag, Valdi. Jeg er klar og online. Hva jobber vi med i dag?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const alexMutation = trpc.alex.chat.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Use admin-specific system override via language field
      // We pass "no" to trigger Norwegian + admin persona
      const result = await alexMutation.mutateAsync({
        messages: updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        language: "no",
        adminMode: true,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result.content || "Beklager, jeg fikk ikke svar fra serveren.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Beklager, Valdi — jeg har et midlertidig teknisk problem. Prøv igjen om et øyeblikk.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });

  const suggestedPrompts = [
    "Hva er status på plattformen?",
    "Hvilke agenter er aktive?",
    "Gi meg en rapport for i dag",
  ];

  return (
    <div className="bg-card border border-cyan-500/30 rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center">
              <Sparkles size={18} className="text-cyan-400" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">ALEX</p>
            <p className="text-xs text-cyan-400">Chief AI Coordinator · Online</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={16} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto px-4 py-3 space-y-3 border-t border-border">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-cyan-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500/20 border border-cyan-500/30 text-white"
                      : "bg-background border border-border text-white/90"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={12} className="text-cyan-400" />
                </div>
                <div className="bg-background border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="text-cyan-400 animate-spin" />
                  <span className="text-xs text-muted-foreground">ALEX tenker...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts (only when few messages) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="text-xs text-cyan-400 border border-cyan-500/30 rounded-full px-3 py-1 hover:bg-cyan-500/10 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Skriv til ALEX... (Enter for å sende)"
              rows={1}
              className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted-foreground resize-none focus:outline-none focus:border-cyan-500/50 transition-colors"
              style={{ minHeight: "38px", maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={14} className="text-cyan-400" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
