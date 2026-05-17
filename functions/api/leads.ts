/**
 * GET /api/leads  — returns recent leads from D1.
 *
 * Auth: requires header `Authorization: Bearer <ADMIN_PASSWORD>`
 *   set via: npx wrangler pages secret put ADMIN_PASSWORD --project-name cscleaners
 *
 * Query params:
 *   ?limit=200       (default 100, max 500)
 *   ?type=business_lead | contractor_application | residential_quote
 *   ?status=new | contacted | quoted | won | lost
 */

interface Env {
  LEADS: D1Database;
  ADMIN_PASSWORD?: string;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<{ results: T[] }>;
}

interface LeadRow {
  id: number;
  received_at: string;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  suburb: string | null;
  status: string | null;
  notes: string | null;
  payload_json: string;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const onRequestOptions = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  // Auth
  const auth = ctx.request.headers.get("Authorization") ?? "";
  const expected = ctx.env.ADMIN_PASSWORD;
  if (!expected) {
    return json(
      { error: "ADMIN_PASSWORD not configured. Set via: npx wrangler pages secret put ADMIN_PASSWORD --project-name cscleaners" },
      503
    );
  }
  if (auth !== `Bearer ${expected}`) {
    return json({ error: "unauthorized" }, 401);
  }

  if (!ctx.env.LEADS) {
    return json({ error: "LEADS D1 binding missing" }, 500);
  }

  const url = new URL(ctx.request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "100", 10) || 100, 500);
  const type = url.searchParams.get("type");
  const status = url.searchParams.get("status");

  const where: string[] = [];
  const args: unknown[] = [];
  if (type) {
    where.push("form_type = ?");
    args.push(type);
  }
  if (status) {
    where.push("status = ?");
    args.push(status);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const stmt = ctx.env.LEADS.prepare(
    `SELECT id, received_at, form_type, name, email, phone, suburb, status, notes, payload_json
     FROM leads
     ${whereSql}
     ORDER BY received_at DESC
     LIMIT ?`
  ).bind(...args, limit);

  try {
    const { results } = await stmt.all<LeadRow>();
    const leads = results.map((r) => {
      let payload: Record<string, unknown> = {};
      try {
        payload = JSON.parse(r.payload_json);
      } catch {}
      return { ...r, payload };
    });
    return json({ ok: true, count: leads.length, leads });
  } catch (e) {
    return json({ error: "query_failed", details: String(e) }, 500);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
}) => Response | Promise<Response>;
