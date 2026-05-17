/**
 * PATCH /api/lead-status — update status or notes on a lead.
 *
 * Body: { id: number, status?: string, notes?: string }
 * Auth: Authorization: Bearer <ADMIN_PASSWORD>
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
  run(): Promise<{ success: boolean }>;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const onRequestOptions = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequest: PagesFunction<Env> = async (ctx) => {
  if (ctx.request.method !== "PATCH" && ctx.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  const auth = ctx.request.headers.get("Authorization") ?? "";
  if (!ctx.env.ADMIN_PASSWORD) {
    return json({ error: "ADMIN_PASSWORD not configured" }, 503);
  }
  if (auth !== `Bearer ${ctx.env.ADMIN_PASSWORD}`) {
    return json({ error: "unauthorized" }, 401);
  }

  let body: { id?: number; status?: string; notes?: string };
  try {
    body = (await ctx.request.json()) as { id?: number; status?: string; notes?: string };
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  if (!body.id) return json({ error: "missing_id" }, 400);

  const fields: string[] = [];
  const args: unknown[] = [];
  if (body.status !== undefined) {
    fields.push("status = ?");
    args.push(body.status);
    if (body.status === "contacted") {
      fields.push("contacted_at = ?");
      args.push(new Date().toISOString());
    }
    if (body.status === "quoted") {
      fields.push("quoted_at = ?");
      args.push(new Date().toISOString());
    }
    if (body.status === "won") {
      fields.push("won_at = ?");
      args.push(new Date().toISOString());
    }
    if (body.status === "lost") {
      fields.push("lost_at = ?");
      args.push(new Date().toISOString());
    }
  }
  if (body.notes !== undefined) {
    fields.push("notes = ?");
    args.push(body.notes);
  }

  if (fields.length === 0) return json({ error: "nothing_to_update" }, 400);
  args.push(body.id);

  try {
    await ctx.env.LEADS.prepare(`UPDATE leads SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...args)
      .run();
    return json({ ok: true });
  } catch (e) {
    return json({ error: "update_failed", details: String(e) }, 500);
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
