import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, User, ArrowRight } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Knowledge base for ALEX
const ALEX_KNOWLEDGE = {
  en: {
    greetings: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    topics: [
      {
        keywords: ["what is intelligentforce", "what do you do", "about intelligentforce", "tell me about"],
        answer: "IntelligentForce is an AI-powered business automation platform. We help mid-market and enterprise companies automate their operations using **9 specialized AI agents** — from customer service and data analysis to HR, finance, and supply chain.\n\n**Key facts:**\n- Deploy in **14 days** (not months)\n- Up to **60% cost reduction**\n- **24/7** AI operations\n- Serving companies with 20–500+ employees\n\nWould you like to see how much your business could save? Try our free [Business Health Check](/health-check).",
      },
      {
        keywords: ["save", "savings", "cost", "roi", "return on investment", "how much", "money"],
        answer: "Great question! The savings depend on your business size and processes, but here are typical results:\n\n| Company Size | Annual Savings |\n|---|---|\n| 20–50 employees | NOK 500k–1.5M |\n| 50–150 employees | NOK 1.5M–4M |\n| 150+ employees | NOK 4M+ |\n\nOne of our Norwegian logistics clients (120 employees) saved **NOK 2.4M in year one**.\n\nFor a precise estimate tailored to your business, try our free **[Business Health Check](/health-check)** — it takes 5 minutes.",
      },
      {
        keywords: ["price", "pricing", "cost", "plan", "plans", "starter", "professional", "enterprise", "how much does it"],
        answer: "IntelligentForce has three plans:\n\n- **Starter** — Entry-level AI automation for smaller businesses\n- **Professional** — Full access to all 9 AI agents (~NOK 1,499/month). Most popular.\n- **Enterprise** — Custom pricing for large organizations with dedicated support\n\nAll plans include the 14-day implementation. See full details on our **[Pricing page](/pricing)** where you can also use the ROI calculator.",
      },
      {
        keywords: ["implement", "implementation", "how long", "14 days", "two weeks", "setup", "deploy", "get started"],
        answer: "Our implementation process takes **14 days** from contract signing to going live:\n\n1. **Days 1–3:** ALEX maps your business processes and identifies automation opportunities\n2. **Days 4–10:** Configuration and integration with your existing tools (500+ integrations)\n3. **Days 11–14:** Testing, training, and go-live\n\nNo lengthy IT projects. No complex training. Your team is up and running in 2 weeks.\n\nReady to start? **[Book a demo](/contact)** or try the free **[Business Health Check](/health-check)**.",
      },
      {
        keywords: ["agent", "agents", "specialist", "specialists", "what agents", "9 agents"],
        answer: "IntelligentForce has **9 specialized AI agents**, each an expert in their field:\n\n1. **Data Analyst** — Automates reporting & analysis (40+ hrs/month saved)\n2. **Customer Service** — Handles inquiries 24/7 (60% cost reduction)\n3. **Market Analyst** — Competitive intelligence (+15–25% revenue)\n4. **Risk Manager** — Compliance monitoring (50% cost savings)\n5. **Process Optimizer** — Workflow automation (+30–40% productivity)\n6. **Content Creator** — Marketing & communications (70% cost savings)\n7. **Supply Chain** — Procurement & logistics ($100K+ annual savings)\n8. **HR Specialist** — Recruitment & admin (20+ hrs/week saved)\n9. **Financial Analyst** — Reporting & forecasting (80% less time)\n\nALEX coordinates all 9 agents automatically. **[Explore all features](/features)**.",
      },
      {
        keywords: ["security", "secure", "data", "gdpr", "privacy", "safe", "protection"],
        answer: "Data security is a top priority at IntelligentForce:\n\n- **GDPR compliant** — Full compliance with European data protection regulations\n- **Data residency** — Your data stays in Europe\n- **Encryption** — All data encrypted in transit and at rest\n- **Access control** — Role-based permissions and audit logs\n- **No data sharing** — Your business data is never used to train AI models\n\nFor specific security questions, contact us at **hello@intelligentforce.ai**.",
      },
      {
        keywords: ["integrate", "integration", "salesforce", "hubspot", "sap", "existing tools", "connect"],
        answer: "IntelligentForce integrates with **500+ business tools**, including:\n\n- **CRM:** Salesforce, HubSpot, Pipedrive\n- **ERP:** SAP, Microsoft Dynamics, Oracle\n- **Communication:** Slack, Teams, Gmail, Outlook\n- **Accounting:** Xero, QuickBooks, Visma, Tripletex\n- **E-commerce:** Shopify, WooCommerce\n- **And many more...**\n\nIf you use a specific tool, ask us and we'll confirm compatibility. **[Contact us](/contact)**.",
      },
      {
        keywords: ["industry", "industries", "sector", "which companies", "who is it for", "suitable"],
        answer: "IntelligentForce works across industries, with particularly strong results in:\n\n- **Professional services** (consulting, law, accounting)\n- **Logistics & supply chain**\n- **Technology & SaaS**\n- **Retail & e-commerce**\n- **Manufacturing**\n- **Healthcare administration**\n- **Financial services**\n\nAny company with 20+ employees and repetitive manual processes is a great fit. **[Start your free Health Check](/health-check)** to see if you qualify.",
      },
      {
        keywords: ["contact", "talk", "speak", "demo", "meeting", "call", "email", "reach"],
        answer: "I'd love to connect you with our team!\n\n- **Email:** hello@intelligentforce.ai\n- **Book a demo:** [intelligentforce.ai/contact](/contact)\n- **Business Health Check:** [intelligentforce.ai/health-check](/health-check) (free, 5 min)\n\nOr you can reach me directly at **alex@intelligentforce.ai** — I respond to all inquiries within 24 hours.",
      },
    ],
    fallback: "That's a great question! For the most accurate answer tailored to your specific situation, I'd recommend:\n\n1. **[Free Business Health Check](/health-check)** — Get a precise ROI estimate in 5 minutes\n2. **[Book a demo](/contact)** — Talk directly with our team\n3. **Email us:** hello@intelligentforce.ai\n\nIs there anything specific about AI automation or IntelligentForce I can help clarify?",
    greeting: "Hi! I'm ALEX, your AI Operations Partner at IntelligentForce. 👋\n\nI'm here to help you understand how AI automation can transform your business. What would you like to know?",
  },
  no: {
    greetings: ["hei", "hallo", "god morgen", "god dag", "hva er", "fortell meg"],
    topics: [
      {
        keywords: ["hva er intelligentforce", "hva gjør dere", "om intelligentforce", "fortell meg om"],
        answer: "IntelligentForce er en AI-drevet forretningsautomatiseringsplattform. Vi hjelper mellomstore og store bedrifter med å automatisere driften ved hjelp av **9 spesialiserte AI-agenter** — fra kundeservice og dataanalyse til HR, finans og forsyningskjede.\n\n**Nøkkelfakta:**\n- Implementering på **14 dager** (ikke måneder)\n- Opptil **60% kostnadsreduksjon**\n- **24/7** AI-drift\n- Betjener bedrifter med 20–500+ ansatte\n\nVil du se hvor mye bedriften din kan spare? Prøv vår gratis [Business Health Check](/health-check).",
      },
      {
        keywords: ["spare", "besparelse", "kostnad", "roi", "avkastning", "hvor mye", "penger"],
        answer: "Godt spørsmål! Besparelsene avhenger av bedriftsstørrelse og prosesser, men her er typiske resultater:\n\n| Bedriftsstørrelse | Årlig besparelse |\n|---|---|\n| 20–50 ansatte | NOK 500k–1,5M |\n| 50–150 ansatte | NOK 1,5M–4M |\n| 150+ ansatte | NOK 4M+ |\n\nEn av våre norske logistikkunder (120 ansatte) sparte **NOK 2,4M i løpet av det første året**.\n\nFor et presist estimat tilpasset din bedrift, prøv vår gratis **[Business Health Check](/health-check)** — det tar 5 minutter.",
      },
      {
        keywords: ["pris", "priser", "kostnad", "plan", "planer", "starter", "professional", "enterprise", "hva koster"],
        answer: "IntelligentForce har tre planer:\n\n- **Starter** — Inngangsautomatisering for mindre bedrifter\n- **Professional** — Full tilgang til alle 9 AI-agenter (~NOK 1 499/mnd). Mest populær.\n- **Enterprise** — Tilpasset prising for store organisasjoner med dedikert support\n\nAlle planer inkluderer 14-dagers implementering. Se full oversikt på **[Prissiden](/pricing)** der du også kan bruke ROI-kalkulatoren.",
      },
      {
        keywords: ["implementer", "implementering", "hvor lang tid", "14 dager", "to uker", "oppsett", "komme i gang"],
        answer: "Implementeringsprosessen tar **14 dager** fra kontraktsignering til go-live:\n\n1. **Dag 1–3:** ALEX kartlegger forretningsprosessene dine og identifiserer automatiseringsmuligheter\n2. **Dag 4–10:** Konfigurasjon og integrasjon med eksisterende verktøy (500+ integrasjoner)\n3. **Dag 11–14:** Testing, opplæring og go-live\n\nIngen lange IT-prosjekter. Ingen kompleks opplæring. Teamet ditt er i gang på 2 uker.\n\nKlar til å starte? **[Bestill en demo](/contact)** eller prøv den gratis **[Business Health Check](/health-check)**.",
      },
      {
        keywords: ["agent", "agenter", "spesialist", "spesialister", "hvilke agenter", "9 agenter"],
        answer: "IntelligentForce har **9 spesialiserte AI-agenter**, hver ekspert på sitt felt:\n\n1. **Dataanalytiker** — Automatiserer rapportering og analyse (40+ timer/mnd spart)\n2. **Kundeservice** — Håndterer henvendelser 24/7 (60% kostnadsreduksjon)\n3. **Markedsanalytiker** — Konkurranseintelligens (+15–25% inntekter)\n4. **Risikostyrer** — Compliance-overvåking (50% kostnadsbesparelse)\n5. **Prosessoptimaliserer** — Arbeidsflytautomatisering (+30–40% produktivitet)\n6. **Innholdsskaper** — Markedsføring og kommunikasjon (70% kostnadsbesparelse)\n7. **Forsyningskjede** — Innkjøp og logistikk (100K+ USD årlig besparelse)\n8. **HR-spesialist** — Rekruttering og administrasjon (20+ timer/uke spart)\n9. **Finansanalytiker** — Rapportering og prognoser (80% kortere tid)\n\nALEX koordinerer alle 9 agenter automatisk. **[Utforsk alle funksjoner](/features)**.",
      },
      {
        keywords: ["sikkerhet", "sikker", "data", "gdpr", "personvern", "trygg", "beskyttelse"],
        answer: "Datasikkerhet er høyeste prioritet hos IntelligentForce:\n\n- **GDPR-kompatibel** — Full overholdelse av europeiske personvernregler\n- **Datalagring** — Dataene dine forblir i Europa\n- **Kryptering** — All data kryptert under overføring og lagring\n- **Tilgangskontroll** — Rollebaserte tillatelser og revisjonslogger\n- **Ingen datadeling** — Forretningsdataene dine brukes aldri til å trene AI-modeller\n\nFor spesifikke sikkerhetsspørsmål, kontakt oss på **hello@intelligentforce.ai**.",
      },
      {
        keywords: ["integrer", "integrasjon", "salesforce", "hubspot", "sap", "eksisterende verktøy", "koble til"],
        answer: "IntelligentForce integrerer med **500+ forretningsverktøy**, inkludert:\n\n- **CRM:** Salesforce, HubSpot, Pipedrive\n- **ERP:** SAP, Microsoft Dynamics, Oracle\n- **Kommunikasjon:** Slack, Teams, Gmail, Outlook\n- **Regnskap:** Xero, QuickBooks, Visma, Tripletex\n- **E-handel:** Shopify, WooCommerce\n- **Og mange flere...**\n\nBruker du et spesifikt verktøy? Spør oss og vi bekrefter kompatibilitet. **[Kontakt oss](/contact)**.",
      },
      {
        keywords: ["bransje", "bransjer", "sektor", "hvilke bedrifter", "hvem passer det for", "egnet"],
        answer: "IntelligentForce fungerer på tvers av bransjer, med spesielt sterke resultater i:\n\n- **Profesjonelle tjenester** (konsulentvirksomhet, jus, regnskap)\n- **Logistikk og forsyningskjede**\n- **Teknologi og SaaS**\n- **Handel og e-handel**\n- **Produksjon**\n- **Helseadministrasjon**\n- **Finansielle tjenester**\n\nEnhver bedrift med 20+ ansatte og repetitive manuelle prosesser er en god kandidat. **[Start din gratis Health Check](/health-check)** for å se om du kvalifiserer.",
      },
      {
        keywords: ["kontakt", "snakke", "demo", "møte", "samtale", "e-post", "nå"],
        answer: "Jeg setter deg gjerne i kontakt med teamet vårt!\n\n- **E-post:** hello@intelligentforce.ai\n- **Bestill en demo:** [intelligentforce.ai/contact](/contact)\n- **Business Health Check:** [intelligentforce.ai/health-check](/health-check) (gratis, 5 min)\n\nEller du kan nå meg direkte på **alex@intelligentforce.ai** — jeg svarer på alle henvendelser innen 24 timer.",
      },
    ],
    fallback: "Det er et godt spørsmål! For det mest nøyaktige svaret tilpasset din spesifikke situasjon, anbefaler jeg:\n\n1. **[Gratis Business Health Check](/health-check)** — Få et presist ROI-estimat på 5 minutter\n2. **[Bestill en demo](/contact)** — Snakk direkte med teamet vårt\n3. **Send e-post:** hello@intelligentforce.ai\n\nEr det noe spesifikt om AI-automatisering eller IntelligentForce jeg kan hjelpe med å avklare?",
    greeting: "Hei! Jeg er ALEX, din AI Operations Partner hos IntelligentForce. 👋\n\nJeg er her for å hjelpe deg forstå hvordan AI-automatisering kan transformere bedriften din. Hva vil du vite?",
  },
};

function findAnswer(query: string, lang: "en" | "no"): string {
  const kb = ALEX_KNOWLEDGE[lang];
  const q = query.toLowerCase();

  // Check for greeting
  if (kb.greetings.some(g => q.includes(g) && q.length < 30)) {
    return kb.greeting;
  }

  // Find best matching topic
  let bestMatch: { answer: string; score: number } | null = null;
  for (const topic of kb.topics) {
    const score = topic.keywords.filter(k => q.includes(k)).length;
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: topic.answer, score };
    }
  }

  return bestMatch?.answer ?? kb.fallback;
}

// Simple markdown-like renderer
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Links
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>');

    if (line.startsWith("- ") || line.startsWith("1. ") || /^\d+\. /.test(line)) {
      return <li key={i} className="ml-4" dangerouslySetInnerHTML={{ __html: line.replace(/^[-\d]+[.)]\s/, "") }} />;
    }
    if (line.startsWith("| ")) {
      // Table row
      const cells = line.split("|").filter(c => c.trim() && c.trim() !== "---");
      if (cells.length > 0 && !cells[0].includes("---")) {
        return (
          <div key={i} className="flex gap-4 text-sm border-b border-white/10 py-1">
            {cells.map((cell, ci) => (
              <span key={ci} className={ci === 0 ? "flex-1 font-medium" : "text-cyan-400 font-semibold"} dangerouslySetInnerHTML={{ __html: cell.trim() }} />
            ))}
          </div>
        );
      }
      return null;
    }
    if (line === "") return <br key={i} />;
    return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: line }} />;
  });
}

const SUGGESTED_EN = [
  "How much could we save with AI?",
  "What does it cost?",
  "How does the 14-day implementation work?",
  "Which processes can be automated?",
  "Which industries are the best fit?",
];

const SUGGESTED_NO = [
  "Hvor mye kan vi spare med AI?",
  "Hva koster det?",
  "Hvordan fungerer implementeringen på 14 dager?",
  "Hvilke prosesser kan automatiseres?",
  "Hvilke bransjer passer best?",
];

type ALEXChatProps = {
  lang?: "en" | "no";
};

export default function ALEXChat({ lang = "en" }: ALEXChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const kb = ALEX_KNOWLEDGE[lang];
  const suggested = lang === "no" ? SUGGESTED_NO : SUGGESTED_EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

    const answer = findAnswer(text, lang);
    setMessages(prev => [...prev, { role: "assistant", content: answer }]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col bg-[#0a1628] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10" style={{ height: "560px" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-950/80 to-cyan-950/60 border-b border-cyan-500/20">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
          <span className="text-white font-black text-sm">A</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">ALEX</span>
            <span className="inline-flex items-center gap-1 bg-green-500/20 border border-green-500/40 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {lang === "no" ? "Alltid tilgjengelig" : "Always Online"}
            </span>
          </div>
          <p className="text-cyan-400/70 text-xs">{lang === "no" ? "Chief Operations Partner · IntelligentForce" : "Chief Operations Partner · IntelligentForce"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
            <div>
              <Sparkles className="w-10 h-10 text-cyan-500/30 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-1">{lang === "no" ? "Hei! Jeg er ALEX. Hva vil du vite?" : "Hi! I'm ALEX. What would you like to know?"}</p>
              <p className="text-slate-600 text-xs">{lang === "no" ? "Klikk på et spørsmål eller skriv ditt eget" : "Click a question or type your own"}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-sm">
              {suggested.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/40 rounded-full px-3 py-1.5 transition-all text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white font-black text-xs">A</span>
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-cyan-600/20 border border-cyan-500/30 text-white"
                    : "bg-slate-800/60 border border-white/8 text-slate-200"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="space-y-1">{renderMarkdown(msg.content)}</div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white font-black text-xs">A</span>
                </div>
                <div className="bg-slate-800/60 border border-white/8 rounded-2xl px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested prompts after first message */}
      {messages.length > 0 && messages.length < 6 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {suggested.slice(0, 3).map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              disabled={isTyping}
              className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 rounded-full px-3 py-1 transition-all disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-white/8 bg-[#050a14]/50">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === "no" ? "Skriv et spørsmål til ALEX..." : "Ask ALEX a question..."}
          className="flex-1 bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-cyan-500/50 max-h-24"
          rows={1}
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 rounded-xl flex items-center justify-center shrink-0 transition-all"
        >
          {isTyping ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
        </button>
      </form>
    </div>
  );
}
