import { useLocation } from "wouter";
import {
  Shield, ExternalLink, Mail, BarChart2, Globe, Info
} from "lucide-react";

export default function AdminDashboard() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background pt-16 px-4">
      <div className="container max-w-3xl mx-auto py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Shield size={20} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">Admin</h1>
              <p className="text-xs text-muted-foreground">IntelligentForce Portal</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            ← Tilbake til portalen
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 mb-6 flex gap-3">
          <Info size={18} className="text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-cyan-300 font-medium mb-1">Formspree håndterer alle skjemaer</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Alle kontaktskjemaer, investorhenvendelser og health check-leads sendes direkte til{" "}
              <strong className="text-white">hello@intelligentforce.ai</strong> via Formspree.
              Logg inn på Formspree-dashbordet for å se og administrere alle innsendte skjemaer.
            </p>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a
            href="https://formspree.io/login"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col gap-3 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <BarChart2 size={18} className="text-cyan-400" />
              </div>
              <ExternalLink size={14} className="text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Formspree Dashboard</h3>
              <p className="text-xs text-muted-foreground">Se alle innsendte skjemaer, eksporter leads og konfigurere e-postvarsler.</p>
            </div>
            <span className="text-xs text-cyan-400 font-medium">formspree.io/login →</span>
          </a>

          <a
            href="mailto:hello@intelligentforce.ai"
            className="bg-card border border-border hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col gap-3 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <Mail size={18} className="text-purple-400" />
              </div>
              <ExternalLink size={14} className="text-muted-foreground group-hover:text-purple-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">E-post innboks</h3>
              <p className="text-xs text-muted-foreground">Alle skjemainnsendinger leveres til hello@intelligentforce.ai.</p>
            </div>
            <span className="text-xs text-purple-400 font-medium">hello@intelligentforce.ai →</span>
          </a>
        </div>

        {/* Portal links */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Globe size={16} className="text-cyan-400" />
            Portalsider
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: "Hjem", path: "/" },
              { label: "Funksjoner", path: "/features" },
              { label: "Priser", path: "/pricing" },
              { label: "Kontakt", path: "/contact" },
              { label: "Investorer", path: "/investors" },
              { label: "Blogg", path: "/blog" },
              { label: "Health Check", path: "/health-check" },
              { label: "Karriere", path: "/careers" },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-xs text-muted-foreground hover:text-white hover:bg-background/50 rounded-lg px-3 py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 IntelligentForce · Kun for autorisert personell
        </p>
      </div>
    </div>
  );
}
