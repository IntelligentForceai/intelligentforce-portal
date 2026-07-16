import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663514335084/45LJMhfcviNxpRv8Tz77Wr/logo-handshake-transparent-v3-Zr2h65ErvHj5jTWGZ4vfKi.webp"
                alt="IntelligentForce"
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-xs tracking-widest text-white">IF</span>
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
              <li>
                <button
                  onClick={() => alert("Dokumentasjon kommer snart!")}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t.footer.documentation}
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.company}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.about}</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-white transition-colors">{t.footer.blog}</Link></li>
              <li>
                <button
                  onClick={() => alert("Karrieresiden kommer snart!")}
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t.footer.careers}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => alert("Personvernside kommer snart!")} className="text-sm text-muted-foreground hover:text-white transition-colors">
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button onClick={() => alert("Vilkårside kommer snart!")} className="text-sm text-muted-foreground hover:text-white transition-colors">
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button onClick={() => alert("Cookieside kommer snart!")} className="text-sm text-muted-foreground hover:text-white transition-colors">
                  {t.footer.cookies}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.contact}</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@intelligentforce.ai" className="text-sm text-muted-foreground hover:text-white transition-colors">hello@intelligentforce.ai</a></li>
              <li><a href="mailto:info@intelligentforce.ai" className="text-sm text-muted-foreground hover:text-white transition-colors">info@intelligentforce.ai</a></li>
              <li><a href="mailto:support@intelligentforce.ai" className="text-sm text-muted-foreground hover:text-white transition-colors">support@intelligentforce.ai</a></li>
              <li><a href="mailto:post@intelligentforce.ai" className="text-sm text-muted-foreground hover:text-white transition-colors">post@intelligentforce.ai</a></li>
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
