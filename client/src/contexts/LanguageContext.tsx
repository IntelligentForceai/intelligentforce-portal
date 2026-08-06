import React, { createContext, useContext, useState } from "react";
import { Language, translations } from "@/lib/i18n";

// Auto-detect Norwegian browser language at startup
function getInitialLang(): Language {
  const nav = (navigator.language || (navigator as any).userLanguage || "en").toLowerCase();
  if (nav.startsWith("nb") || nav.startsWith("nn") || nav.startsWith("no")) return "no";
  return "en";
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLang);
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
