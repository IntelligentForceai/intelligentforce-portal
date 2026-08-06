import { useEffect, useState } from "react";
import { X, Globe } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

// Norwegian country codes
const NORWEGIAN_LANGS = ["nb", "nn", "no"];

// English-speaking country codes (language tags)
const ENGLISH_LANGS = [
  "en", "en-US", "en-GB", "en-AU", "en-CA", "en-NZ", "en-IE",
  "en-ZA", "en-IN", "en-SG", "en-PH",
];

function detectUserLanguage(): "no" | "en" | "other" {
  const nav = navigator.language || (navigator as any).userLanguage || "en";
  const base = nav.toLowerCase().split("-")[0];
  if (NORWEGIAN_LANGS.includes(base)) return "no";
  if (ENGLISH_LANGS.some(l => nav.toLowerCase().startsWith(l.toLowerCase()))) return "en";
  if (base === "en") return "en";
  return "other";
}

// Google Translate widget injection
function injectGoogleTranslate() {
  if (document.getElementById("google-translate-script")) return;
  // Add translate element container
  if (!document.getElementById("google_translate_element")) {
    const el = document.createElement("div");
    el.id = "google_translate_element";
    el.style.display = "none";
    document.body.appendChild(el);
  }
  // Define callback
  (window as any).googleTranslateElementInit = function () {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "", // all languages
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: false,
      },
      "google_translate_element"
    );
  };
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

// Trigger Google Translate to a specific language
function triggerTranslate(langCode: string) {
  // Try the cookie method first (most reliable)
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `googtrans=/en/${langCode}; expires=${expires.toUTCString()}; path=/`;
  document.cookie = `googtrans=/en/${langCode}; expires=${expires.toUTCString()}; path=/; domain=.intelligentforce.ai`;
  // Reload to apply
  window.location.reload();
}

export default function GoogleTranslateBanner() {
  const { setLang } = useLang();
  const [show, setShow] = useState(false);
  const [userLang, setUserLang] = useState<string>("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show on admin pages
    if (window.location.pathname.startsWith("/admin") ||
        window.location.pathname.startsWith("/valdi")) return;

    // Check if already dismissed this session
    if (sessionStorage.getItem("translate-dismissed")) return;

    // Check if Google Translate is already active
    if (document.cookie.includes("googtrans")) return;

    const detected = detectUserLanguage();

    if (detected === "no") {
      // Set Norwegian immediately
      setLang("no");
    } else if (detected === "en") {
      // Already in English — nothing to do
      setLang("en");
    } else {
      // Other language — show translation banner
      const nav = navigator.language || "en";
      setUserLang(nav);
      injectGoogleTranslate();
      // Small delay so page renders first
      setTimeout(() => setShow(true), 1200);
    }
  }, []);

  const handleTranslate = () => {
    const langCode = userLang.split("-")[0].toLowerCase();
    triggerTranslate(langCode);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("translate-dismissed", "1");
  };

  if (!show || dismissed) return null;

  // Get native language name if possible
  let langName = userLang;
  try {
    langName = new Intl.DisplayNames([userLang], { type: "language" }).of(
      userLang.split("-")[0]
    ) || userLang;
  } catch {}

  return (
    <>
      {/* Google Translate CSS override — hide the top bar it adds */}
      <style>{`
        .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        body { top: 0 !important; }
        .skiptranslate { display: none !important; }
      `}</style>

      {/* Banner */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 
                   bg-[#0a1628]/95 border border-cyan-500/40 backdrop-blur-md 
                   rounded-2xl px-5 py-3 shadow-2xl shadow-cyan-500/10
                   animate-in slide-in-from-bottom-4 duration-500"
        style={{ maxWidth: "calc(100vw - 2rem)" }}
      >
        <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-white text-sm font-medium">
            Translate this page to{" "}
            <span className="text-cyan-400 font-semibold capitalize">{langName}</span>?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTranslate}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 
                         text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 
                         hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              🌐 Translate with Google
            </button>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white text-sm px-2 py-1.5 rounded-lg 
                         hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              No thanks
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-1 text-slate-500 hover:text-white transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
