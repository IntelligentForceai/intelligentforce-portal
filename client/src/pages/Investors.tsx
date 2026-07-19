import { useEffect } from "react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import AlexVideo from "@/components/AlexVideo";
import { usePageTracker } from "@/hooks/usePageTracker";
import {
  ArrowRight,
  TrendingUp,
  Globe,
  Users,
  Shield,
  Zap,
  BarChart2,
  Lock,
  Mail,
  ChevronRight,
  Building2,
  Target,
  Layers,
} from "lucide-react";

export default function Investors() {
  const { lang } = useLang();
  const isNo = lang === "no";
  usePageTracker("/investors");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen pt-16">

      {/* ── ALEX Identity Banner ─────────────────────────────────────── */}
      <section className="py-5 bg-gradient-to-r from-blue-950/90 to-cyan-950/70 border-b border-cyan-500/20">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">ALEX</span>
                  <span className="inline-flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {isNo ? "Alltid tilgjengelig" : "Always Available"}
                  </span>
                </div>
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  Chief Operations Partner · IntelligentForce
                </p>
              </div>
            </div>
            <div className="bg-blue-950/60 border border-cyan-500/20 rounded-xl px-4 py-2 max-w-md">
              <p className="text-cyan-300/80 text-xs text-center sm:text-left">
                {isNo
                  ? "Denne siden er forbeholdt seriøse investorer og strategiske partnere. All henvendelse behandles konfidensielt."
                  : "This page is reserved for serious investors and strategic partners. All enquiries are handled with full confidentiality."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Lock size={13} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">
                {isNo ? "Eksklusiv investormulighet" : "Exclusive Investment Opportunity"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              {isNo ? (
                <>Invester i <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">fremtidens</span> forretningsplattform</>
              ) : (
                <>Invest in the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">intelligence</span> that runs tomorrow's enterprise</>
              )}
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed">
              {isNo
                ? "IntelligentForce er ikke et softwareprodukt. Det er en profesjonell tjenesteplattform drevet av AI-ekspertise – bygget for å levere målbare resultater til mellomstore og store bedrifter globalt."
                : "IntelligentForce is not a software product. It is a professional services platform powered by AI expertise – built to deliver measurable results to mid-market and enterprise clients worldwide."}
            </p>
          </div>

          {/* ALEX Video – full width, prominent */}
          <div className="max-w-sm mx-auto mb-14">
            <AlexVideo
              videoSrc="/manus-storage/alex-investors-compressed.mp4"
              className="w-full"
            />
          </div>

          {/* Intro cards – two columns below video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* ALEX quote */}
            <div className="bg-card border border-border rounded-2xl p-7">
              <h2 className="text-xl font-bold text-white mb-4">
                {isNo ? "Et ord fra ALEX" : "A Message from ALEX"}
              </h2>
              <blockquote className="text-slate-300 leading-relaxed text-base italic border-l-2 border-cyan-500/50 pl-4">
                {isNo
                  ? "\'Du er her fordi du ser det vi ser: det neste tiåret tilhører bedrifter som opererer med intelligens i kjernen. IntelligentForce er plattformen som gjør det mulig – og vi inviterer nå selektivt strategiske partnere til å bli med oss i å skalere dette til sitt fulle potensial.\'"
                  : "\'You are here because you see what we see: the next decade belongs to businesses that operate with intelligence at their core. IntelligentForce is the platform that makes that possible – and we are now selectively inviting strategic partners to join us in scaling this to its full potential.\'"}
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-sm">A</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">ALEX</div>
                  <div className="text-cyan-400 text-xs">Chief Operations Partner</div>
                </div>
              </div>
            </div>

            {/* Confidentiality note */}
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-7 flex flex-col justify-center gap-4">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-amber-300 font-semibold text-sm mb-2">
                    {isNo ? "Strengt konfidensielt" : "Strictly Confidential"}
                  </div>
                  <p className="text-amber-200/80 text-sm leading-relaxed">
                    {isNo
                      ? "Finansielle detaljer, betingelser og vekstprognoser deles utelukkende under NDA. Kontakt ALEX for å starte en konfidensiell dialog."
                      : "Financial details, terms, and growth projections are shared exclusively under NDA. Contact ALEX to initiate a confidential dialogue."}
                  </p>
                </div>
              </div>
              <a
                href="mailto:alex@intelligentforce.ai?subject=Investor%20Enquiry%20%E2%80%93%20IntelligentForce"
                className="inline-flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold px-5 py-3 rounded-xl text-sm transition-all"
              >
                <Mail size={15} />
                alex@intelligentforce.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKET OPPORTUNITY ───────────────────────────────────────── */}
      <section className="py-20 bg-card/10">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "Markedsmuligheten" : "The Market Opportunity"}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {isNo
                ? "AI-automatisering er ikke en trend – det er en fundamental omstrukturering av hvordan bedrifter opererer."
                : "AI automation is not a trend – it is a fundamental restructuring of how businesses operate."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Globe size={28} className="text-cyan-400" />,
                value: "$500B+",
                label: isNo ? "Global markedsstørrelse" : "Global Market Size",
                sub: isNo ? "AI i forretningsprosesser globalt innen 2028" : "AI in business processes globally by 2028",
              },
              {
                icon: <TrendingUp size={28} className="text-green-400" />,
                value: "38%",
                label: isNo ? "Årlig vekstrate (CAGR)" : "Annual Growth Rate (CAGR)",
                sub: isNo ? "Raskest voksende segment i global enterprise-software" : "Fastest growing segment in global enterprise software",
              },
              {
                icon: <Building2 size={28} className="text-purple-400" />,
                value: "€2.4T",
                label: isNo ? "Globalt bedriftsmarked" : "Global Enterprise Market",
                sub: isNo ? "Underservert av eksisterende AI-løsninger" : "Underserved by existing AI solutions",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-7 text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {item.value}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
                <div className="text-slate-500 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 rounded-2xl p-8">
            <p className="text-slate-300 text-base leading-relaxed text-center max-w-3xl mx-auto">
              {isNo
                ? "De fleste AI-løsninger på markedet er enten generiske verktøy uten bransjespesifikk dybde, eller kostbare enterprise-systemer som tar måneder å implementere. IntelligentForce fyller dette gapet – globalt – med profesjonell ekspertise, rask implementering og dokumentert ROI."
                : "Most AI solutions on the market are either generic tools without industry-specific depth, or expensive enterprise systems that take months to deploy. IntelligentForce fills this gap – globally – with professional expertise, rapid implementation, and documented ROI."}
            </p>
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODEL ───────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "Forretningsmodellen" : "The Business Model"}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {isNo
                ? "Skalerbar, forutsigbar og designet for høy margin."
                : "Scalable, predictable, and designed for high margins."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Layers size={22} className="text-cyan-400" />,
                title: isNo ? "Abonnementsbasert SaaS" : "Subscription-Based SaaS",
                desc: isNo
                  ? "Månedlige og årlige abonnementer gir forutsigbar, gjentakende inntekt. Lav churn takket være høy integrasjonsdybde og dokumentert ROI for kunden."
                  : "Monthly and annual subscriptions provide predictable, recurring revenue. Low churn driven by deep integration and documented client ROI.",
              },
              {
                icon: <Target size={22} className="text-green-400" />,
                title: isNo ? "Profesjonelle tjenester" : "Professional Services",
                desc: isNo
                  ? "Implementeringspakker, skreddersydde integrasjoner og strategisk rådgivning. Høy margin, høy verdi – og bygger langsiktige kundeforhold."
                  : "Implementation packages, custom integrations, and strategic advisory. High margin, high value – and builds long-term client relationships.",
              },
              {
                icon: <BarChart2 size={22} className="text-purple-400" />,
                title: isNo ? "Resultatbasert prising" : "Performance-Based Pricing",
                desc: isNo
                  ? "For utvalgte kunder tilbyr vi resultatbaserte avtaler der kompensasjonen er direkte knyttet til dokumentert ROI. Dette differensierer oss fundamentalt fra konkurrentene."
                  : "For select clients, we offer performance-based agreements where compensation is directly tied to documented ROI. This fundamentally differentiates us from competitors.",
              },
              {
                icon: <Globe size={22} className="text-blue-400" />,
                title: isNo ? "Partnernettverk" : "Partner Network",
                desc: isNo
                  ? "Et voksende nettverk av sertifiserte implementeringspartnere globalt muliggjør skalering uten proporsjonal økning i direkte kostnader."
                  : "A growing network of certified implementation partners worldwide enables scaling without proportional increase in direct costs.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-7 flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE TEAM WE ARE BUILDING ─────────────────────────────────── */}
      <section className="py-20 bg-card/10">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "Teamet vi bygger" : "The Team We Are Building"}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {isNo
                ? "Vi søker ikke bare kapital. Vi søker partnere som bringer kompetanse, nettverk og ambisjoner om å bygge noe som varer."
                : "We are not just seeking capital. We are seeking partners who bring expertise, networks, and the ambition to build something that endures."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Users size={24} className="text-cyan-400" />,
                title: isNo ? "Lederskap & strategi" : "Leadership & Strategy",
                desc: isNo
                  ? "Erfarne forretningsledere med dokumentert track record fra skalering av B2B-selskaper i Europa og internasjonalt."
                  : "Experienced business leaders with a documented track record of scaling B2B companies across Europe and internationally.",
              },
              {
                icon: <Zap size={24} className="text-yellow-400" />,
                title: isNo ? "Teknologi & produkt" : "Technology & Product",
                desc: isNo
                  ? "Seniorutviklere og AI-arkitekter som bygger robuste, skalerbare systemer – ikke proof-of-concepts, men produksjonsklare løsninger."
                  : "Senior engineers and AI architects building robust, scalable systems – not proof-of-concepts, but production-ready solutions.",
              },
              {
                icon: <TrendingUp size={24} className="text-green-400" />,
                title: isNo ? "Salg & vekst" : "Sales & Growth",
                desc: isNo
                  ? "Erfarne enterprise-selgere og partnerskapsledere med etablerte nettverk i målmarkedene våre."
                  : "Experienced enterprise sales professionals and partnership managers with established networks in our target markets.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-7 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Founder note */}
          <div className="bg-gradient-to-r from-slate-900/80 to-blue-950/60 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="shrink-0">
              <img
                src="https://intelligentforce.ai/images/founder_with_bg.png"
                alt="Vlad Joffcheff"
                className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20"
              />
            </div>
            <div>
              <p className="text-slate-300 leading-relaxed text-base italic mb-4">
                {isNo
                  ? "\"Vi bygger ikke teknologi for teknologiens skyld. Vi bygger et selskap som leverer reell forretningsverdi – med et team av profesjonelle som er like dedikerte til resultater som vi er. Riktig partner i denne fasen er ikke bare kapital. Det er kompetanse, nettverk og en felles forståelse av hva som kreves for å lykkes i enterprise-markedet.\""
                  : "\"We are not building technology for technology's sake. We are building a company that delivers real business value – with a team of professionals who are as committed to results as we are. The right partner at this stage is not just capital. It is expertise, network, and a shared understanding of what it takes to succeed in the enterprise market.\""}
              </p>
              <div>
                <div className="text-white font-bold text-sm">Vlad Joffcheff</div>
                <div className="text-cyan-400 text-xs">
                  {isNo ? "Grunnlegger & CEO · IntelligentForce" : "Founder & CEO · IntelligentForce"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACTION ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "Hva vi har bygget" : "What We Have Built"}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {isNo
                ? "Plattformen er live. Resultatene er reelle. Vi er i en tidlig, men avgjørende fase."
                : "The platform is live. The results are real. We are at an early but decisive stage."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "Live", label: isNo ? "Plattform i produksjon" : "Platform in Production", color: "text-green-400" },
              { value: "9", label: isNo ? "Spesialiserte eksperter" : "Expert Specialists", color: "text-cyan-400" },
              { value: "500+", label: isNo ? "Integrasjoner" : "Integrations", color: "text-blue-400" },
              { value: "2 uker", label: isNo ? "Til live-implementering" : "To Live Deployment", color: "text-purple-400" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className={`text-3xl font-black mb-2 ${item.color}`}>{item.value}</div>
                <div className="text-slate-400 text-xs leading-snug">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Shield size={18} className="text-cyan-400" />,
                title: isNo ? "Enterprise-grade infrastruktur" : "Enterprise-Grade Infrastructure",
                desc: isNo
                  ? "Bygget på skalerbar skyinfrastruktur med full redundans, sikkerhet og compliance-støtte for bedrifter globalt."
                  : "Built on scalable cloud infrastructure with full redundancy, security, and compliance support for enterprises worldwide.",
              },
              {
                icon: <Zap size={18} className="text-yellow-400" />,
                title: isNo ? "ALEX – AI-koordinator i produksjon" : "ALEX – AI Coordinator in Production",
                desc: isNo
                  ? "ALEX er ikke et konsept. Hun er en fullt operasjonell AI-koordinator som håndterer klientkommunikasjon, prosessautomatisering og rapportering i sanntid."
                  : "ALEX is not a concept. She is a fully operational AI coordinator handling client communication, process automation, and real-time reporting.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-7 flex gap-4">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE ARE LOOKING FOR ──────────────────────────────────── */}
      <section className="py-20 bg-card/10">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isNo ? "Hva vi ser etter" : "What We Are Looking For"}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {isNo
                ? "Vi er selektive. Ikke alle er riktig partner for denne fasen."
                : "We are selective. Not everyone is the right partner for this stage."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                label: isNo ? "Strategisk kapital" : "Strategic Capital",
                desc: isNo
                  ? "Investorer som forstår enterprise B2B-markedet og verdien av langsiktig posisjonering."
                  : "Investors who understand the enterprise B2B market and the value of long-term positioning.",
              },
              {
                label: isNo ? "Bransjenettverk" : "Industry Networks",
                desc: isNo
                  ? "Partnere med etablerte relasjoner til beslutningstakere i målsegmentene våre: finans, helse, produksjon og profesjonelle tjenester."
                  : "Partners with established relationships with decision-makers in our target segments: finance, healthcare, manufacturing, and professional services.",
              },
              {
                label: isNo ? "Operasjonell kompetanse" : "Operational Expertise",
                desc: isNo
                  ? "Erfaring fra skalering av B2B SaaS eller profesjonelle tjenesteselskaper fra tidlig fase til internasjonal vekst."
                  : "Experience scaling B2B SaaS or professional services companies from early stage to international growth.",
              },
              {
                label: isNo ? "Internasjonal forankring" : "International Reach",
                desc: isNo
                  ? "Forståelse for internasjonale regulatoriske krav, GDPR og enterprise-salgssykluser på tvers av markeder globalt."
                  : "Understanding of international regulatory requirements, GDPR, and enterprise sales cycles across global markets.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
                <ChevronRight size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 rounded-2xl p-7 text-center">
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
              {isNo
                ? "Inngangsbilletten reflekterer seriøsiteten i det vi bygger. Detaljer om investeringsbetingelser, eierstruktur og vekstprognoser deles utelukkende i direkte dialog under NDA."
                : "The entry threshold reflects the seriousness of what we are building. Details on investment terms, ownership structure, and growth projections are shared exclusively in direct dialogue under NDA."}
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/30">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {isNo ? "Start en konfidensiell dialog" : "Initiate a Confidential Dialogue"}
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {isNo
              ? "ALEX er ditt første kontaktpunkt. Hun kvalifiserer henvendelser og koordinerer videre dialog med ledelsen. Alle samtaler behandles med full konfidensialitet."
              : "ALEX is your first point of contact. She qualifies enquiries and coordinates further dialogue with leadership. All conversations are handled with full confidentiality."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="mailto:alex@intelligentforce.ai?subject=Investor%20Enquiry%20–%20IntelligentForce&body=Hello%20ALEX%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20investment%20and%20partnership%20opportunities%20at%20IntelligentForce.%0A%0APlease%20treat%20this%20enquiry%20as%20confidential.%0A%0AKind%20regards%2C"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
            >
              <Mail size={18} />
              {isNo ? "Send konfidensiell henvendelse" : "Send Confidential Enquiry"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:bg-white/5"
            >
              {isNo ? "Bruk kontaktskjema" : "Use Contact Form"}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-green-400" />
              {isNo ? "Full konfidensialitet garantert" : "Full confidentiality guaranteed"}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-cyan-400" />
              alex@intelligentforce.ai
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-yellow-400" />
              {isNo ? "Svar innen 24 timer" : "Response within 24 hours"}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
