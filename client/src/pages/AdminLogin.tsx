import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

const ADMIN_USERNAME = "valdi";
const ADMIN_PASSWORD = "IF@Admin2026!Secure";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (
      username.toLowerCase() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      navigate("/admin/dashboard");
    } else {
      setError("Feil brukernavn eller passord. Prøv igjen.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4">
            <Shield size={32} className="text-cyan-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">IntelligentForce</h1>
          <p className="text-muted-foreground text-sm mt-1">Admin · Kun autorisert tilgang</p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleLogin}
          className="bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
              Brukernavn
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="brukernavn"
              required
              autoComplete="username"
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
              Passord
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Logger inn...
              </>
            ) : (
              "Logg inn"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 IntelligentForce · Kun for autorisert personell
        </p>
      </div>
    </div>
  );
}
