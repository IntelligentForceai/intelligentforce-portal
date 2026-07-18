import { eq, desc, gte, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  adminCredentials,
  contactSubmissions,
  InsertContactSubmission,
  pageViews,
  InsertPageView,
  agentViews,
  InsertAgentView,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Admin Credentials ────────────────────────────────────────────────────────

export async function getAdminByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminCredentials).where(eq(adminCredentials.username, username)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertAdminCredential(username: string, passwordHash: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(adminCredentials)
    .values({ username, passwordHash })
    .onDuplicateKeyUpdate({ set: { passwordHash, updatedAt: new Date() } });
}

// ─── Contact Submissions ──────────────────────────────────────────────────────

export async function insertContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot insert contact: database not available"); return; }
  await db.insert(contactSubmissions).values(data);
}

export async function getContactSubmissions(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(limit);
}

export async function getUnreadContactCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` })
    .from(contactSubmissions)
    .where(eq(contactSubmissions.isRead, false));
  return Number(result[0]?.count ?? 0);
}

export async function markContactRead(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
}

// ─── Page Views ───────────────────────────────────────────────────────────────

export async function insertPageView(data: InsertPageView) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pageViews).values(data);
}

export async function getPageViewStats(days = 7) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return db.select({
    page: pageViews.page,
    count: sql<number>`count(*)`,
  })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(pageViews.page)
    .orderBy(desc(sql`count(*)`));
}

export async function getDailyVisitorStats(days = 7) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return db.select({
    date: sql<string>`DATE(${pageViews.createdAt})`,
    count: sql<number>`count(*)`,
    uniqueSessions: sql<number>`count(DISTINCT ${pageViews.sessionId})`,
  })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`DATE(${pageViews.createdAt})`)
    .orderBy(sql`DATE(${pageViews.createdAt})`);
}

export async function getTotalVisitors(hours = 24) {
  const db = await getDb();
  if (!db) return { total: 0, unique: 0 };
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  const result = await db.select({
    total: sql<number>`count(*)`,
    unique: sql<number>`count(DISTINCT ${pageViews.sessionId})`,
  })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since));
  return { total: Number(result[0]?.total ?? 0), unique: Number(result[0]?.unique ?? 0) };
}

// ─── Agent Views ──────────────────────────────────────────────────────────────

export async function insertAgentView(data: InsertAgentView) {
  const db = await getDb();
  if (!db) return;
  await db.insert(agentViews).values(data);
}

export async function getTopAgents(days = 7, limit = 9) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return db.select({
    agentId: agentViews.agentId,
    agentName: agentViews.agentName,
    count: sql<number>`count(*)`,
  })
    .from(agentViews)
    .where(gte(agentViews.createdAt, since))
    .groupBy(agentViews.agentId, agentViews.agentName)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}
