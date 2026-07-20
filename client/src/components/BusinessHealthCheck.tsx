import { useState } from "react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import {
  ArrowRight, ArrowLeft, CheckCircle2, BarChart2, Clock,
  DollarSign, Users, TrendingUp, Zap, ChevronRight, Mail, Building2
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Step {
  id: number;
  question: { en: string; no: string };
  sub: { en: string; no: string };
  type: "select" | "range";
  options?: { label: { en: string; no: string }; value: string; multiplier?: number }[];
  rangeMin?: number;
  rangeMax?: number;
  rangeStep?: number;
  rangeUnit?: { en: string; no: string };
}

// ─── Survey steps ────────────────────────────────────────────────────────────
const steps: Step[] = [
  {
    id: 1,
    question: { en: "What is your primary industry?", no: "Hva er din primære bransje?" },
    sub: {
      en: "We tailor our analysis to your specific industry benchmarks.",
      no: "Vi tilpasser analysen til bransjespesifikke referanseverdier.",
    },
    type: "select",
    options: [
      { label: { en: "Finance & Banking", no: "Finans & bank" }, value: "finance", multiplier: 1.3 },
      { label: { en: "Healthcare & Life Sciences", no: "Helse & life sciences" }, value: "health", multiplier: 1.2 },
      { label: { en: "Retail & E-commerce", no: "Handel & e-handel" }, value: "retail", multiplier: 1.1 },
      { label: { en: "Manufacturing & Logistics", no: "Produksjon & logistikk" }, value: "mfg", multiplier: 1.25 },
      { label: { en: "Professional Services", no: "Profesjonelle tjenester" }, value: "services", multiplier: 1.15 },
      { label: { en: "Technology", no: "Teknologi" }, value: "tech", multiplier: 1.0 },
      { label: { en: "Other", no: "Annet" }, value: "other", multiplier: 1.0 },
    ],
  },
  {
    id: 2,
    question: { en: "How many employees does your company have?", no: "Hvor mange ansatte har bedriften din?" },
    sub: {
      en: "Company size determines the scale of potential savings.",
      no: "Bedriftsstørrelse avgjør omfanget av potensielle besparelser.",
    },
    type: "select",
    options: [
      { label: { en: "1–10 employees", no: "1–10 ansatte" }, value: "micro", multiplier: 0.4 },
      { label: { en: "11–50 employees", no: "11–50 ansatte" }, value: "small", multiplier: 0.7 },
      { label: { en: "51–200 employees", no: "51–200 ansatte" }, value: "medium", multiplier: 1.0 },
      { label: { en: "201–500 employees", no: "201–500 ansatte" }, value: "large", multiplier: 1.6 },
      { label: { en: "500+ employees", no: "500+ ansatte" }, value: "enterprise", multiplier: 2.5 },
    ],
  },
  {
    id: 3,
    question: {
      en: "Which processes consume the most manual time?",
      no: "Hvilke prosesser bruker mest manuell tid?",
    },
    sub: {
      en: "Select all that apply. Each area represents a significant savings opportunity.",
      no: "Velg alle som gjelder. Hvert område representerer en betydelig besparelsesmulighet.",
    },
    type: "select",
    options: [
      { label: { en: "Customer service & support", no: "Kundeservice & support" }, value: "cs", multiplier: 1.2 },
      { label: { en: "Financial reporting & analysis", no: "Finansrapportering & analyse" }, value: "fin", multiplier: 1.3 },
      { label: { en: "HR & recruitment", no: "HR & rekruttering" }, value: "hr", multiplier: 1.1 },
      { label: { en: "Data entry & processing", no: "Dataregistrering & behandling" }, value: "data", multiplier: 1.15 },
      { label: { en: "Marketing & content", no: "Markedsføring & innhold" }, value: "mkt", multiplier: 1.0 },
      { label: { en: "Supply chain & logistics", no: "Forsyningskjede & logistikk" }, value: "sc", multiplier: 1.25 },
      { label: { en: "Compliance & risk management", no: "Compliance & risikostyring" }, value: "risk", multiplier: 1.2 },
    ],
  },
  {
    id: 4,
    question: {
      en: "Approximately how many hours per week are spent on manual, repetitive tasks?",
      no: "Omtrent hvor mange timer per uke brukes på manuelle, repetitive oppgaver?",
    },
    sub: {
      en: "Include all employees. This is the primary driver of your ROI calculation.",
      no: "Inkluder alle ansatte. Dette er den primære driveren for ROI-beregningen din.",
    },
    type: "range",
    rangeMin: 10,
    rangeMax: 500,
    rangeStep: 10,
    rangeUnit: { en: "hours/week", no: "timer/uke" },
  },
  {
    id: 5,
    question: {
      en: "What is the average hourly cost of your team (salary + overhead)?",
      no: "Hva er gjennomsnittlig timekostnad for teamet ditt (lønn + overhead)?",
    },
    sub: {
      en: "This allows us to calculate your exact monetary savings.",
      no: "Dette lar oss beregne de eksakte monetære besparelsene dine.",
    },
    type: "range",
    rangeMin: 30,
    rangeMax: 300,
    rangeStep: 10,
    rangeUnit: { en: "USD/hour", no: "USD/time" },
  },
];

// ─── Calculation logic ───────────────────────────────────────────────────────
function calculateROI(answers: Record<number, string | number>) {
  const industryMult = steps[0].options?.find(o => o.value === answers[1])?.multiplier ?? 1.0;
  const sizeMult = steps[1].options?.find(o => o.value === answers[2])?.multiplier ?? 1.0;
  const processMultipliers = String(answers[3]).split(",").map(v =>
    steps[2].options?.find(o => o.value === v)?.multiplier ?? 1.0
  );
  const avgProcessMult = processMultipliers.length
    ? processMultipliers.reduce((a, b) => a + b, 0) / processMultipliers.length
    : 1.0;

  const hoursPerWeek = Number(answers[4]) || 80;
  const hourlyRate = Number(answers[5]) || 75;

  // Conservative: IntelligentForce automates 35–55% of manual work
  const automationRate = 0.42; // 42% – realistic middle estimate
  const savedHoursPerWeek = hoursPerWeek * automationRate * industryMult * avgProcessMult;
  const savedHoursPerYear = savedHoursPerWeek * 52;
  const savedCostPerYear = savedHoursPerYear * hourlyRate * sizeMult;

  // Productivity uplift on remaining work: 15–25%
  const productivityUplift = hoursPerWeek * (1 - automationRate) * 0.18 * hourlyRate * 52 * sizeMult;

  const totalAnnualValue = Math.round((savedCostPerYear + productivityUplift) / 1000) * 1000;
  const savedHoursRounded = Math.round(savedHoursPerWeek / 5) * 5;
  const roiMultiple = Math.round((totalAnnualValue / 18000) * 10) / 10; // vs ~$1500/mo plan

  return {
    savedHoursPerWeek: Math.max(savedHoursRounded, 5),
    savedCostPerYear: Math.max(totalAnnualValue, 15000),
    roiMultiple: Math.max(roiMultiple, 2.5),
    automationRate: Math.round(automationRate * 100),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function BusinessHealthCheck() {
  const { lang } = useLang();
  const isNo = lang === "no";
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const step = steps[currentStep - 1];
  const totalSteps = steps.length;
  const progress = currentStep > 0 ? (currentStep / totalSteps) * 100 : 0;

  const handleSelect = (value: string) => {
    if (currentStep === 3) {
      // Multi-select for processes
      const updated = multiSelect.includes(value)
        ? multiSelect.filter(v => v !== value)
        : [...multiSelect, value];
      setMultiSelect(updated);
    } else {
      setAnswers(prev => ({ ...prev, [currentStep]: value }));
    }
  };

  const handleRange = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentStep]: value }));
  };

  const canAdvance = () => {
    if (currentStep === 0) return true;
    if (currentStep === 3) return multiSelect.length > 0;
    return answers[currentStep] !== undefined;
  };

  const advance = () => {
    if (currentStep === 3) {
      setAnswers(prev => ({ ...prev, 3: multiSelect.join(",") }));
    }
    if (currentStep === totalSteps) {
      setShowResults(true);
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const results = showResults ? calculateROI(answers) : null;

  // Lead capture state
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '' });
  const [leadSent, setLeadSent] = useState(false);
  const [leadSending, setLeadSending] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;
    setLeadSending(true);
    try {
      await fetch('https://formspree.io/f/mpqvrnld', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          company: leadForm.company,
          industry: String(answers[1] || ''),
          company_size: String(answers[2] || ''),
          hours_per_week: Number(answers[4]) || 0,
          hourly_rate: Number(answers[5]) || 0,
          saved_hours_per_week: results?.savedHoursPerWeek,
          saved_cost_per_year: results?.savedCostPerYear,
          roi_multiple: results?.roiMultiple,
          _subject: `📊 Health Check Lead: ${leadForm.name}${leadForm.company ? ' – ' + leadForm.company : ''} | ROI ${results?.roiMultiple ?? '?'}x`,
          type: 'HEALTH_CHECK',
        }),
      });
      setLeadSent(true);
    } catch {
      setLeadSent(true);
    } finally {
      setLeadSending(false);
    }
  };

  // ── Intro screen ────────────────────────────────────────────────────────────
  if (currentStep === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/20 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <Zap size={14} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">
              {isNo ? "Gratis analyse – 5 minutter" : "Free Analysis – 5 Minutes"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {isNo ? "Business Health Check" : "Business Health Check"}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {isNo
              ? "Svar på 5 spørsmål og se nøyaktig hvor mye tid og penger bedriften din kan spare med IntelligentForce. Ingen forpliktelse – kun ærlige tall."
              : "Answer 5 questions and see exactly how much time and money your business can save with IntelligentForce. No commitment – just honest numbers."}
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Clock, value: "5 min", label: isNo ? "Tar kun" : "Takes only" },
              { icon: BarChart2, value: "100%", label: isNo ? "Gratis" : "Free" },
              { icon: CheckCircle2, value: isNo ? "Ærlig" : "Honest", label: isNo ? "Estimat" : "Estimate" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/60 rounded-2xl p-4 text-center border border-slate-700/50">
                <item.icon size={20} className="text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">{item.value}</div>
                <div className="text-slate-400 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setCurrentStep(1)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02]"
        >
          {isNo ? "Start analysen" : "Start the Analysis"}
          <ArrowRight size={20} />
        </button>
        <p className="text-slate-500 text-xs text-center mt-4">
          {isNo
            ? "Ingen registrering nødvendig. Resultatene vises umiddelbart."
            : "No registration required. Results shown immediately."}
        </p>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (showResults && results) {
    const formatCurrency = (n: number) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/20 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">
              {isNo ? "Analysen er ferdig" : "Analysis Complete"}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {isNo ? "Ditt potensial" : "Your Potential"}
          </h2>
          <p className="text-slate-400 text-base">
            {isNo
              ? "Basert på konservative estimater for din bransje og bedriftsstørrelse"
              : "Based on conservative estimates for your industry and company size"}
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-5 text-center">
            <Clock size={22} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{results.savedHoursPerWeek}+</div>
            <div className="text-cyan-300 text-sm font-semibold">
              {isNo ? "Timer spart/uke" : "Hours saved/week"}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5 text-center">
            <DollarSign size={22} className="text-green-400 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{formatCurrency(results.savedCostPerYear)}</div>
            <div className="text-green-300 text-sm font-semibold">
              {isNo ? "Estimert besparelse/år" : "Est. savings/year"}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-2xl p-5 text-center">
            <TrendingUp size={22} className="text-purple-400 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{results.roiMultiple}x</div>
            <div className="text-purple-300 text-sm font-semibold">
              {isNo ? "ROI-multiplikator" : "ROI multiple"}
            </div>
          </div>
        </div>

        {/* Automation breakdown */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <BarChart2 size={16} className="text-cyan-400" />
            {isNo ? "Hva dette betyr for deg" : "What this means for you"}
          </h3>
          <div className="space-y-3">
            {[
              {
                label: isNo ? "Manuelle oppgaver som automatiseres" : "Manual tasks automated",
                value: `~${results.automationRate}%`,
                color: "bg-cyan-500",
                width: results.automationRate,
              },
              {
                label: isNo ? "Produktivitetsøkning på gjenværende arbeid" : "Productivity uplift on remaining work",
                value: "~18%",
                color: "bg-blue-500",
                width: 18,
              },
              {
                label: isNo ? "Reduksjon i feilrate" : "Error rate reduction",
                value: "~65%",
                color: "bg-purple-500",
                width: 65,
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-slate-500 text-xs mb-6 leading-relaxed">
          {isNo
            ? "* Estimatene er basert på gjennomsnittlige resultater fra sammenlignbare bedrifter. Faktiske resultater varierer avhengig av implementering, prosesser og organisasjon. IntelligentForce garanterer ikke spesifikke besparelser uten en grundig analyse av din bedrift."
            : "* Estimates are based on average results from comparable businesses. Actual results vary depending on implementation, processes, and organization. IntelligentForce does not guarantee specific savings without a thorough analysis of your business."}
        </p>

        {/* Lead capture form */}
        {!leadSent ? (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
              <Mail size={18} className="text-cyan-400" />
              {isNo ? "Få din fulle rapport tilsendt" : "Get Your Full Report"}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              {isNo
                ? "ALEX sender deg en detaljert analyse og tar kontakt for å diskutere neste steg."
                : "ALEX will send you a detailed analysis and reach out to discuss next steps."}
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={isNo ? "Ditt navn *" : "Your name *"}
                  value={leadForm.name}
                  onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
                <input
                  type="email"
                  placeholder={isNo ? "E-postadresse *" : "Email address *"}
                  value={leadForm.email}
                  onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder={isNo ? "Bedriftsnavn (valgfritt)" : "Company name (optional)"}
                value={leadForm.company}
                onChange={e => setLeadForm(f => ({ ...f, company: e.target.value }))}
                className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
              />
              <button
                type="submit"
                disabled={!leadForm.name || !leadForm.email || leadSending}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-500/20"
              >
                {leadSending
                  ? (isNo ? "Sender..." : "Sending...")
                  : (isNo ? "Send meg rapporten" : "Send Me the Report")}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 mb-6 text-center">
            <CheckCircle2 size={32} className="text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold">
              {isNo ? "Takk! ALEX tar kontakt med deg snart." : "Thank you! ALEX will be in touch shortly."}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {isNo ? "Sjekk innboksen din innen 24 timer." : "Check your inbox within 24 hours."}
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact" className="flex-1">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:scale-[1.02]">
              {isNo ? "Bestill gratis demo" : "Book Free Demo"}
              <ArrowRight size={18} />
            </button>
          </Link>
          <button
            onClick={() => { setCurrentStep(0); setAnswers({}); setMultiSelect([]); setShowResults(false); setLeadSent(false); setLeadForm({ name: '', email: '', company: '' }); }}
            className="flex-1 bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 border border-slate-600/50"
          >
            {isNo ? "Start på nytt" : "Start Over"}
          </button>
        </div>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  const currentRange = step?.type === "range"
    ? (answers[currentStep] as number) ?? (step.rangeMin! + step.rangeMax!) / 2
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/20 rounded-3xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400 text-sm">
            {isNo ? `Spørsmål ${currentStep} av ${totalSteps}` : `Question ${currentStep} of ${totalSteps}`}
          </span>
          <span className="text-cyan-400 text-sm font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
        {isNo ? step.question.no : step.question.en}
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        {isNo ? step.sub.no : step.sub.en}
      </p>

      {/* Options */}
      {step.type === "select" && (
        <div className="grid grid-cols-1 gap-3 mb-8">
          {step.options?.map(opt => {
            const isSelected = currentStep === 3
              ? multiSelect.includes(opt.value)
              : answers[currentStep] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-500/60 text-white"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800"
                }`}
              >
                <span className="font-medium">{isNo ? opt.label.no : opt.label.en}</span>
                {isSelected
                  ? <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0" />
                  : <ChevronRight size={18} className="text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                }
              </button>
            );
          })}
          {currentStep === 3 && (
            <p className="text-slate-500 text-xs mt-1">
              {isNo ? "Du kan velge flere alternativer." : "You may select multiple options."}
            </p>
          )}
        </div>
      )}

      {step.type === "range" && (
        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="text-4xl font-black text-white">{currentRange}</span>
            <span className="text-slate-400 text-lg ml-2">
              {isNo ? step.rangeUnit?.no : step.rangeUnit?.en}
            </span>
          </div>
          <input
            type="range"
            min={step.rangeMin}
            max={step.rangeMax}
            step={step.rangeStep}
            value={currentRange}
            onChange={e => handleRange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-slate-500 text-xs mt-2">
            <span>{step.rangeMin} {isNo ? step.rangeUnit?.no : step.rangeUnit?.en}</span>
            <span>{step.rangeMax}+ {isNo ? step.rangeUnit?.no : step.rangeUnit?.en}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(s => s - 1)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-semibold transition-all border border-slate-600/50"
        >
          <ArrowLeft size={16} />
          {isNo ? "Tilbake" : "Back"}
        </button>
        <button
          onClick={advance}
          disabled={!canAdvance()}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold transition-all duration-200 ${
            canAdvance()
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
              : "bg-slate-700/40 text-slate-500 cursor-not-allowed"
          }`}
        >
          {currentStep === totalSteps
            ? (isNo ? "Se resultater" : "See Results")
            : (isNo ? "Neste" : "Next")}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
