import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoZoomed, setLogoZoomed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Logo — klikk for zoom */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo-white.png?v=1"
              alt="IntelligentForce"
              onClick={(e) => {
                e.preventDefault();
                setLogoZoomed(!logoZoomed);
                setTimeout(() => setLogoZoomed(false), 2000);
              }}
              className={`w-auto object-contain cursor-pointer transition-all duration-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] ${
                logoZoomed
                  ? "h-24 scale-125 drop-shadow-[0_0_16px_rgba(6,182,212,0.8)]"
                  : "h-12 sm:h-14 hover:scale-105"
              }`}
              style={{ maxWidth: logoZoomed ? "180px" : "120px" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-white font-medium"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/investors"
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                isActive("/investors")
                  ? "text-amber-400 font-medium"
                  : "text-amber-400/70 hover:text-amber-400"
              }`}
            >
              Investors
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            {/* Language toggle */}
            <div className="flex items-center gap-0.5 bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setLang("en")}
                title="Switch to English"
                className={`text-base px-1.5 py-0.5 rounded-full transition-all ${
                  lang === "en" ? "bg-white/20 scale-110" : "opacity-50 hover:opacity-100"
                }`}
              >
                🇬🇧
              </button>
              <button
                onClick={() => setLang("no")}
                title="Bytt til norsk"
                className={`text-base px-1.5 py-0.5 rounded-full transition-all ${
                  lang === "no" ? "bg-white/20 scale-110" : "opacity-50 hover:opacity-100"
                }`}
              >
                🇳🇴
              </button>
            </div>

            {/* Meet ALEX button — skjult på veldig små skjermer */}
            <Link
              href="/alex"
              className="hidden sm:flex items-center gap-1.5 btn-gradient px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
            >
              {t.nav.meetAlex}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu — full skjerm overlay */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-0">
            <div className="flex flex-col gap-0.5 pt-2">
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
                className={`px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive("/investors")
                    ? "text-amber-400 font-semibold bg-amber-400/10"
                    : "text-amber-400/80 hover:text-amber-400 hover:bg-amber-400/5"
                }`}
              >
                Investors
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
