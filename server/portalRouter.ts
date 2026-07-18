import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const portalRouter = router({

  // ── Submit contact form ─────────────────────────────────────────────────────
  submitContact: publicProcedure
    .input(z.object({
      name: z.string().min(1, "Navn er påkrevd").max(256),
      email: z.string().email("Ugyldig e-postadresse").max(320),
      company: z.string().max(256).optional(),
      category: z.string().max(64).optional(),
      message: z.string().min(5, "Melding er for kort").max(5000),
    }))
    .mutation(async ({ input }) => {
      await db.insertContactSubmission({
        name: input.name,
        email: input.email,
        company: input.company ?? null,
        category: input.category ?? null,
        message: input.message,
      });
      return { success: true };
    }),

  // ── Track page view ─────────────────────────────────────────────────────────
  trackPageView: publicProcedure
    .input(z.object({
      page: z.string().max(128),
      sessionId: z.string().max(64).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const userAgent = ctx.req.headers["user-agent"] ?? null;
      await db.insertPageView({
        page: input.page,
        sessionId: input.sessionId ?? null,
        userAgent,
      });
      return { success: true };
    }),

  // ── Track agent view ────────────────────────────────────────────────────────
  trackAgentView: publicProcedure
    .input(z.object({
      agentId: z.string().max(64),
      agentName: z.string().max(128),
    }))
    .mutation(async ({ input }) => {
      await db.insertAgentView({
        agentId: input.agentId,
        agentName: input.agentName,
      });
      return { success: true };
    }),
});
