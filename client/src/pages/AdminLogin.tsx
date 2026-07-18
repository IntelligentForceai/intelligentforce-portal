import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      navigate("/admin/dashboard");
    },
    onError: (err) => {
      setError(err.message || "Innlogging feilet. Prøv igjen.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Fyll inn brukernavn og passord.");
      return;
    }
    loginMutation.mutate({ username: username.trim(), password });
  };

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
          <p className="text-muted-foreground text-sm mt-1">Admin-panel · Kun autorisert tilgang</p>
        </div>

        {/* Login card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Lock size={18} className="text-cyan-400" />
            Logg inn
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                Brukernavn
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="valdi"
                  autoComplete="username"
                  className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                Passord
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full bg-background border border-border rounded-xl pl-9 pr-10 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl transition-all duration-200 text-sm"
            >
              {loginMutation.isPending ? "Logger inn..." : "Logg inn"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 IntelligentForce · Kun for autorisert personell
        </p>
      </div>
    </div>
  );
}
