import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Menu, X, TrendingUp } from "lucide-react";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Main nav links shown in desktop row
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/features", label: t.nav.features },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const isInvestors = location.startsWith("/investors");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center h-16 gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/45LJMhfcviNxpRv8Tz77Wr/logo-handshake-transparent-v3-Zr2h65ErvHj5jTWGZ4vfKi.webp"
              alt="IntelligentForce"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-sm tracking-widest text-white hidden md:block">
              INTELLIGENTFORCE
            </span>
          </Link>

          {/* ── Desktop nav – takes remaining space, centered ── */}
          {/* Shown from lg (1024px). Uses flex-1 so it fills available space */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
                  isActive(link.href)
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Investors link – amber tint */}
            <Link
              href="/investors"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                isInvestors
                  ? "text-amber-300"
                  : "text-amber-400/80 hover:text-amber-300"
              }`}
            >
              <TrendingUp size={13} />
              {lang === "no" ? "Investorer" : "Investors"}
            </Link>
          </div>

          {/* ── Right side – language + CTA + hamburger ── */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0 shrink-0">
            {/* Language toggle */}
            <div className="flex items-center gap-0.5 bg-white/10 rounded-full px-1 py-1">
              <button
                onClick={() => setLang("en")}
                title="Switch to English"
                className={`text-base px-1.5 py-0.5 rounded-full transition-all leading-none ${
                  lang === "en" ? "bg-white/20" : "opacity-50 hover:opacity-100"
                }`}
              >
                🇬🇧
              </button>
              <button
                onClick={() => setLang("no")}
                title="Bytt til norsk"
                className={`text-base px-1.5 py-0.5 rounded-full transition-all leading-none ${
                  lang === "no" ? "bg-white/20" : "opacity-50 hover:opacity-100"
                }`}
              >
                🇳🇴
              </button>
            </div>

            {/* Meet ALEX – shown from sm */}
            <Link
              href="/alex"
              className="hidden sm:flex items-center gap-1.5 btn-gradient px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
            >
              {t.nav.meetAlex}
            </Link>

            {/* Hamburger – hidden on lg+ */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile / tablet dropdown menu ── */}
        {menuOpen && (
          <div className="lg:hidden mobile-menu-enter pb-4 border-t border-border mt-0">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-sm rounded-md transition-colors ${
                    isActive(link.href)
                      ? "text-white font-semibold bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/investors"
                className={`px-4 py-3 text-sm rounded-md transition-colors flex items-center gap-2 ${
                  isInvestors
                    ? "text-amber-300 font-semibold bg-amber-500/10"
                    : "text-amber-400 hover:text-amber-300 hover:bg-amber-500/5"
                }`}
              >
                <TrendingUp size={14} />
                {lang === "no" ? "Investorer" : "Investors"}
              </Link>
              <Link
                href="/alex"
                className="mx-4 mt-2 btn-gradient px-4 py-3 rounded-full text-sm font-medium text-center"
              >
                {t.nav.meetAlex}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
