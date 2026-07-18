import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  Activity, Users, MessageSquare, BarChart2, Shield, LogOut,
  CheckCircle, AlertTriangle, XCircle, RefreshCw, Eye, Mail,
  Clock, TrendingUp, Globe, Bot, ChevronDown, ChevronUp, Check
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type HealthItem = {
  name: string;
  path: string;
  status: "ok" | "warn" | "error";
  statusCode: number;
  responseTime: number;
};

type ContactItem = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  category: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "ok") return (
    <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
      <CheckCircle size={13} /> OK
    </span>
  );
  if (status === "warn") return (
    <span className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
      <AlertTriangle size={13} /> Advarsel
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
      <XCircle size={13} /> Feil
    </span>
  );
}

function StatCard({ icon, label, value, sub, color = "cyan" }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color?: string;
}) {
  const colorMap: Record<string, string> = {
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  };
  const iconColorMap: Record<string, string> = {
    cyan: "text-cyan-400", purple: "text-purple-400",
    emerald: "text-emerald-400", amber: "text-amber-400",
  };
  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5`}>
      <div className={`${iconColorMap[color]} mb-3`}>{icon}</div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      {sub && <div className="text-xs text-muted-foreground/70 mt-1">{sub}</div>}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function OverviewSection({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<Eye size={22} />} label="Besøk siste 24t" value={stats.visitors24h.total} sub={`${stats.visitors24h.unique} unike`} color="cyan" />
      <StatCard icon={<TrendingUp size={22} />} label="Besøk siste 7 dager" value={stats.visitors7d.total} sub={`${stats.visitors7d.unique} unike`} color="purple" />
      <StatCard icon={<MessageSquare size={22} />} label="Uleste henvendelser" value={stats.unreadContacts} sub="Kontaktskjema" color="amber" />
      <StatCard icon={<Bot size={22} />} label="Aktive agenter" value={9} sub="AI-agenter" color="emerald" />
    </div>
  );
}

function PortalHealthSection({ health }: { health: HealthItem[] }) {
  const allOk = health.every(h => h.status === "ok");
  const hasError = health.some(h => h.status === "error");

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Globe size={18} className="text-cyan-400" />
          Portalhelse
        </h2>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          allOk ? "bg-emerald-500/15 text-emerald-400" :
          hasError ? "bg-red-500/15 text-red-400" :
          "bg-yellow-500/15 text-yellow-400"
        }`}>
          {allOk ? "Alle sider oppe" : hasError ? "Feil oppdaget" : "Advarsel"}
        </span>
      </div>
      <div className="space-y-2">
        {health.map((item) => (
          <div key={item.path} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-background/50 hover:bg-background/80 transition-colors">
            <div className="flex items-center gap-3">
              <StatusBadge status={item.status} />
              <span className="text-sm text-white font-medium">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.path}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {item.statusCode > 0 && <span className="bg-background border border-border px-2 py-0.5 rounded-lg">{item.statusCode}</span>}
              <span className="flex items-center gap-1"><Clock size={11} />{item.responseTime}ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisitorStatsSection({ stats }: { stats: any }) {
  const daily = stats.dailyStats ?? [];
  const pageStats = stats.pageStats ?? [];
  const maxCount = Math.max(...daily.map((d: any) => Number(d.count)), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Daily chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 mb-5">
          <BarChart2 size={18} className="text-cyan-400" />
          Daglige besøk (7 dager)
        </h2>
        {daily.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 text-sm">Ingen data ennå</div>
        ) : (
          <div className="flex items-end gap-2 h-32">
            {daily.map((d: any, i: number) => {
              const h = Math.max(4, Math.round((Number(d.count) / maxCount) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{d.count}</span>
                  <div
                    className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{String(d.date).slice(5)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Page breakdown */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 mb-5">
          <Activity size={18} className="text-purple-400" />
          Mest besøkte sider (7 dager)
        </h2>
        {pageStats.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 text-sm">Ingen data ennå</div>
        ) : (
          <div className="space-y-2">
            {pageStats.slice(0, 7).map((p: any, i: number) => {
              const maxP = Math.max(...pageStats.map((x: any) => Number(x.count)));
              const pct = Math.round((Number(p.count) / maxP) * 100);
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white">{p.page}</span>
                    <span className="text-muted-foreground">{p.count} besøk</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AgentActivitySection({ agents }: { agents: any[] }) {
  const agentEmojis: Record<string, string> = {
    "sales": "💼", "support": "🎧", "marketing": "📢", "hr": "👥",
    "finance": "💰", "operations": "⚙️", "analytics": "📊", "logistics": "🚚", "legal": "⚖️",
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-base font-bold text-white flex items-center gap-2 mb-5">
        <Bot size={18} className="text-emerald-400" />
        Agentaktivitet (7 dager)
      </h2>
      {agents.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 text-sm">Ingen agentvisninger registrert ennå</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {agents.map((a, i) => {
            const emoji = agentEmojis[a.agentId] ?? "🤖";
            return (
              <div key={i} className="flex items-center gap-3 bg-background/50 rounded-xl p-3 hover:bg-background/80 transition-colors">
                <span className="text-2xl">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{a.agentName}</div>
                  <div className="text-xs text-muted-foreground">{a.count} visninger</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400">#{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ContactsSection({ contacts, onMarkRead }: {
  contacts: ContactItem[];
  onMarkRead: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-base font-bold text-white flex items-center gap-2 mb-5">
        <Mail size={18} className="text-amber-400" />
        Kontakthenvendelser
        {contacts.filter(c => !c.isRead).length > 0 && (
          <span className="ml-1 bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">
            {contacts.filter(c => !c.isRead).length} nye
          </span>
        )}
      </h2>
      {contacts.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 text-sm">Ingen henvendelser ennå</div>
      ) : (
        <div className="space-y-2">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`border rounded-xl overflow-hidden transition-colors ${
                c.isRead ? "border-border bg-background/30" : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-background/50"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!c.isRead && <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />}
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.email} {c.company ? `· ${c.company}` : ""}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {c.category && (
                    <span className="text-xs bg-background border border-border px-2 py-0.5 rounded-lg text-muted-foreground hidden sm:block">
                      {c.category}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground hidden md:block">
                    {new Date(c.createdAt).toLocaleDateString("no-NO")}
                  </span>
                  {expanded === c.id ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </div>
              </div>
              {expanded === c.id && (
                <div className="px-4 pb-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                  {!c.isRead && (
                    <button
                      onClick={() => onMarkRead(c.id)}
                      className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <Check size={13} /> Merk som lest
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

type Tab = "overview" | "health" | "visitors" | "agents" | "contacts";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const statsQuery = trpc.admin.dashboardStats.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000, // auto-refresh every 5 minutes
    retry: false,
  });

  const healthQuery = trpc.admin.portalHealth.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000,
    retry: false,
  });

  const contactsQuery = trpc.admin.getContacts.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000,
    retry: false,
  });

  const markReadMutation = trpc.admin.markContactRead.useMutation({
    onSuccess: () => contactsQuery.refetch(),
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => navigate("/admin"),
  });

  const handleRefresh = () => {
    statsQuery.refetch();
    healthQuery.refetch();
    contactsQuery.refetch();
    setLastRefresh(new Date());
  };

  // Redirect to login if unauthorized
  useEffect(() => {
    if (statsQuery.error?.data?.code === "FORBIDDEN" || statsQuery.error?.data?.code === "UNAUTHORIZED") {
      navigate("/admin");
    }
  }, [statsQuery.error]);

  const isLoading = statsQuery.isLoading || healthQuery.isLoading;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Oversikt", icon: <BarChart2 size={15} /> },
    { id: "health", label: "Portalhelse", icon: <Globe size={15} /> },
    { id: "visitors", label: "Besøk", icon: <Users size={15} /> },
    { id: "agents", label: "Agenter", icon: <Bot size={15} /> },
    { id: "contacts", label: "Henvendelser", icon: <Mail size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-cyan-400" />
            <span className="font-bold text-white text-sm">Admin-panel</span>
            <span className="text-muted-foreground text-xs hidden sm:block">· IntelligentForce</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              Oppdatert: {lastRefresh.toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-background"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:block">Oppdater</span>
            </button>
            <button
              onClick={() => logoutMutation.mutate()}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-500/10"
            >
              <LogOut size={13} />
              <span className="hidden sm:block">Logg ut</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-muted-foreground hover:text-white hover:bg-background/50"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "contacts" && (contactsQuery.data?.filter(c => !c.isRead).length ?? 0) > 0 && (
                <span className="bg-amber-500/20 text-amber-400 text-xs px-1.5 py-0.5 rounded-full">
                  {contactsQuery.data?.filter(c => !c.isRead).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw size={24} className="text-cyan-400 animate-spin" />
              <span className="text-muted-foreground text-sm">Laster data...</span>
            </div>
          </div>
        )}

        {/* Content */}
        {!isLoading && (
          <div className="space-y-6">
            {activeTab === "overview" && statsQuery.data && (
              <>
                <OverviewSection stats={statsQuery.data} />
                {healthQuery.data && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {healthQuery.data.slice(0, 3).map((h) => (
                      <div key={h.path} className={`rounded-2xl border p-4 flex items-center gap-3 ${
                        h.status === "ok" ? "border-emerald-500/20 bg-emerald-500/5" :
                        h.status === "error" ? "border-red-500/20 bg-red-500/5" :
                        "border-yellow-500/20 bg-yellow-500/5"
                      }`}>
                        <StatusBadge status={h.status} />
                        <span className="text-sm text-white">{h.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{h.responseTime}ms</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "health" && healthQuery.data && (
              <PortalHealthSection health={healthQuery.data as HealthItem[]} />
            )}

            {activeTab === "visitors" && statsQuery.data && (
              <VisitorStatsSection stats={statsQuery.data} />
            )}

            {activeTab === "agents" && statsQuery.data && (
              <AgentActivitySection agents={statsQuery.data.topAgents} />
            )}

            {activeTab === "contacts" && contactsQuery.data && (
              <ContactsSection
                contacts={contactsQuery.data as ContactItem[]}
                onMarkRead={(id) => markReadMutation.mutate({ id })}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
