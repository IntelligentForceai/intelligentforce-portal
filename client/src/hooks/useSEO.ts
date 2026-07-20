import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLd?: object;
}

const DEFAULT_OG_IMAGE = "https://intelligentforce.ai/og-image.png";
const BASE_URL = "https://intelligentforce.ai";

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set/create meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector.replace("meta[", "").replace("]", "").split('="');
        el.setAttribute(attrName, attrVal?.replace('"', "") || attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // Primary meta
    setMeta('meta[name="description"]', "name", description);
    if (keywords) setMeta('meta[name="keywords"]', "name", keywords);
    setMeta('meta[name="robots"]', "name", noIndex ? "noindex, nofollow" : "index, follow");

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical || `${BASE_URL}${window.location.pathname}`;

    // Open Graph
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:image"]', "property", ogImage);
    setMeta('meta[property="og:url"]', "property", canonical || `${BASE_URL}${window.location.pathname}`);
    setMeta('meta[property="og:type"]', "property", ogType);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", ogImage);

    // JSON-LD
    if (jsonLd) {
      const existingScript = document.getElementById("page-jsonld");
      if (existingScript) existingScript.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup JSON-LD on unmount
    return () => {
      const s = document.getElementById("page-jsonld");
      if (s) s.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, jsonLd]);
}
