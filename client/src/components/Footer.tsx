import { Link } from "wouter";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  const [logoZoomed, setLogoZoomed] = useState(false);

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <img
                src="/logo-white.png?v=1"
                alt="IntelligentForce"
                onClick={(e) => {
                  e.preventDefault();
                  setLogoZoomed(!logoZoomed);
                  setTimeout(() => setLogoZoomed(false), 2000);
                }}
                className={`w-auto object-contain cursor-pointer transition-all duration-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] ${
                  logoZoomed
                    ? "h-24 scale-125 drop-shadow-[0_0_16px_rgba(6,182,212,0.8)]"
                    : "h-14 hover:scale-105"
                }`}
                style={{ maxWidth: logoZoomed ? "180px" : "120px" }}
              />
            </Link>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              AI-drevet forretningsautomatisering for norske bedrifter.
            </p>
            {/* Social media */}
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/intelligentforce"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://instagram.com/intelligentforce.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/intelligentforce"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.product}</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.solutions}</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.pricing}</Link></li>
              <li><Link href="/health-check" className="text-sm text-muted-foreground hover:text-white transition-colors">Business Health Check</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.company}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.about}</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.blog}</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.careers}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.privacy}</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.terms}</Link></li>
              <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.cookies}</Link></li>
              <li><Link href="/legal" className="text-sm text-muted-foreground hover:text-white transition-colors">Legal</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.contact}</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.contact}</Link></li>
              <li><a href="mailto:hello@intelligentforce.ai" className="text-sm text-muted-foreground hover:text-white transition-colors">hello@intelligentforce.ai</a></li>
              <li><a href="mailto:alex@intelligentforce.ai" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">alex@intelligentforce.ai</a></li>
            </ul>
          </div>
        </div>

        <hr className="section-divider my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t.footer.rights}</p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Oslo, Norway
          </p>
        </div>
      </div>
    </footer>
  );
}
