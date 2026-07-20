import { Shield, ExternalLink, Mail, BarChart2 } from "lucide-react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4">
            <Shield size={32} className="text-cyan-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            IntelligentForce
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Admin · Kun autorisert tilgang</p>
        </div>

        {/* Info card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-cyan-300 text-sm leading-relaxed">
              Alle innsendte skjemaer (kontakt, investorer, health check) sendes til{" "}
              <strong className="text-white">hello@intelligentforce.ai</strong> via Formspree.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Administrer innsendte skjemaer
            </h2>

            <a
              href="https://formspree.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-3 px-5 rounded-xl transition-all duration-200 text-sm"
            >
              <span className="flex items-center gap-2">
                <BarChart2 size={16} />
                Åpne Formspree Dashboard
              </span>
              <ExternalLink size={14} />
            </a>

            <a
              href="mailto:hello@intelligentforce.ai"
              className="flex items-center justify-between w-full bg-card border border-border hover:border-cyan-500/50 text-white font-medium py-3 px-5 rounded-xl transition-all duration-200 text-sm"
            >
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />
                hello@intelligentforce.ai
              </span>
              <ExternalLink size={14} className="text-muted-foreground" />
            </a>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Logg inn på <strong className="text-white">formspree.io</strong> med kontoen knyttet til{" "}
              <strong className="text-white">hello@intelligentforce.ai</strong> for å se alle innsendte skjemaer,
              eksportere leads og konfigurere varsler.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 IntelligentForce · Kun for autorisert personell
        </p>
      </div>
    </div>
  );
}
