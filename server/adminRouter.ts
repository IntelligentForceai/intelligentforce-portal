import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as crypto from "crypto";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { sdk } from "./_core/sdk";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import * as db from "./db";

// ─── Password hashing (SHA-256 + salt, no external deps) ─────────────────────

const ADMIN_SALT = "IF_ADMIN_2026_SALT_X9z#mK";

function hashPassword(password: string): string {
  return crypto
    .createHmac("sha256", ADMIN_SALT)
    .update(password)
    .digest("hex");
}

// ─── Admin password (set once at startup) ────────────────────────────────────

const ADMIN_USERNAME = "valdi";
const ADMIN_PASSWORD = "Force2026";
const ADMIN_OPEN_ID = "admin_valdi_intelligentforce";

// Always sync admin credentials on startup
async function ensureAdminExists() {
  await db.upsertAdminCredential(ADMIN_USERNAME, hashPassword(ADMIN_PASSWORD));
  await db.upsertUser({
    openId: ADMIN_OPEN_ID,
    name: "Valdi – Admin",
    email: "valdi@intelligentforce.ai",
    loginMethod: "password",
    role: "admin",
    lastSignedIn: new Date(),
  });
}

// Run seed on module load
ensureAdminExists().catch(console.error);

// ─── Router ───────────────────────────────────────────────────────────────────

export const adminRouter = router({

  // ── Public: password login ──────────────────────────────────────────────────
  login: publicProcedure
    .input(z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const admin = await db.getAdminByUsername(input.username);
      if (!admin || admin.passwordHash !== hashPassword(input.password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Feil brukernavn eller passord" });
      }

      const sessionToken = await sdk.createSessionToken(ADMIN_OPEN_ID, {
        name: "Valdi – Admin",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return { success: true, username: ADMIN_USERNAME };
    }),

  // ── Admin: dashboard overview ───────────────────────────────────────────────
  dashboardStats: adminProcedure
    .query(async () => {
      const [visitors24h, visitors7d, unreadContacts, topAgents, pageStats, dailyStats] = await Promise.all([
        db.getTotalVisitors(24),
        db.getTotalVisitors(168),
        db.getUnreadContactCount(),
        db.getTopAgents(7),
        db.getPageViewStats(7),
        db.getDailyVisitorStats(7),
      ]);

      return {
        visitors24h,
        visitors7d,
        unreadContacts,
        topAgents,
        pageStats,
        dailyStats,
      };
    }),

  // ── Admin: contact submissions ──────────────────────────────────────────────
  getContacts: adminProcedure
    .input(z.object({ limit: z.number().min(1).max(200).default(50) }).optional())
    .query(async ({ input }) => {
      return db.getContactSubmissions(input?.limit ?? 50);
    }),

  markContactRead: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.markContactRead(input.id);
      return { success: true };
    }),

  // ── Admin: portal health check ──────────────────────────────────────────────
  portalHealth: adminProcedure
    .query(async () => {
      const pages = [
        { name: "Hjem", path: "/" },
        { name: "Funksjoner", path: "/features" },
        { name: "Priser", path: "/pricing" },
        { name: "Om oss", path: "/about" },
        { name: "Blogg", path: "/blog" },
        { name: "Kontakt", path: "/contact" },
        { name: "Møt ALEX", path: "/alex" },
      ];

      const baseUrl = "https://intelligentforce.ai";
      const results = await Promise.allSettled(
        pages.map(async (page) => {
          const start = Date.now();
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(`${baseUrl}${page.path}`, {
              signal: controller.signal,
              method: "HEAD",
            });
            clearTimeout(timeout);
            const responseTime = Date.now() - start;
            return {
              name: page.name,
              path: page.path,
              status: res.ok ? "ok" : "warn",
              statusCode: res.status,
              responseTime,
            };
          } catch {
            return {
              name: page.name,
              path: page.path,
              status: "error",
              statusCode: 0,
              responseTime: Date.now() - start,
            };
          }
        })
      );

      return results.map((r, i) =>
        r.status === "fulfilled"
          ? r.value
          : { name: pages[i].name, path: pages[i].path, status: "error", statusCode: 0, responseTime: 0 }
      );
    }),
});
