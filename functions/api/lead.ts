/**
 * Cloudflare Pages Function — Lead Webhook
 *
 * Every form submission on the site (residential quote, business lead,
 * contractor application) POSTs to this endpoint.
 *
 * Guarantees:
 *   1. WRITES TO D1 SYNCHRONOUSLY — if storage fails, returns 500 to client.
 *      That way a lead can never be lost without us knowing.
 *   2. Fires email notification (Resend) asynchronously — best-effort.
 *   3. Fires downstream webhook (Make/Zapier) asynchronously — best-effort.
 *
 * Bindings (wrangler.toml):
 *   - LEADS              (required) — D1 database
 *
 * Environment variables (set in Cloudflare Pages → Settings → Environment variables):
 *   - RESEND_API_KEY     (optional) — get free at https://resend.com (3k/mo free)
 *   - OPS_EMAIL          (optional) — where lead notifications go
 *   - SENDER_EMAIL       (optional) — defaults to leads@cscleaners.com.au
 *   - WEBHOOK_URL        (optional) — downstream webhook (Make/Zapier)
 */

interface Env {
  LEADS: D1Database;
  RESEND_API_KEY?: string;
  OPS_EMAIL?: string;
  SENDER_EMAIL?: string;
  WEBHOOK_URL?: string;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean; meta?: { last_row_id?: number } }>;
}

interface LeadPayload {
  formType?: string;
  contactName?: string;
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  premisesType?: string;
  suburb?: string;
  approxSqm?: string;
  abn?: string;
  suburbs?: string[];
  track?: string;
  price?: number;
  [key: string]: unknown;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmailBody(payload: LeadPayload): { subject: string; html: string; text: string } {
  const type = payload.formType ?? "unknown";
  const contact = payload.contactName ?? payload.name ?? "Unknown";
  const business = payload.businessName ?? "";
  const suburb =
    payload.suburb ?? (Array.isArray(payload.suburbs) ? payload.suburbs.join(", ") : "");

  const friendlyType: Record<string, string> = {
    business_lead: "🏢 Business lead",
    contractor_application: "🧹 Contractor application",
    residential_quote: "🏠 Residential quote",
  };
  const heading = friendlyType[type] ?? `📩 ${type}`;
  const subject = business
    ? `${heading} — ${business}${suburb ? ` (${suburb})` : ""}`
    : `${heading} — ${contact}${suburb ? ` (${suburb})` : ""}`;

  const rows = Object.entries(payload)
    .filter(([k]) => k !== "formType")
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      const val = Array.isArray(v) ? v.join(", ") : v == null || v === "" ? "—" : String(v);
      return `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#666;font-size:13px;width:180px">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top;font-size:13px;color:#1a1a2e">${escapeHtml(val)}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;background:#f8f9fa;margin:0;padding:24px"><table style="background:white;border-radius:12px;padding:24px;max-width:640px;margin:0 auto;box-shadow:0 1px 3px rgba(0,0,0,0.08)"><tr><td><h1 style="margin:0 0 8px;font-size:18px;color:#1a1a2e">${heading}</h1><p style="margin:0 0 18px;color:#666;font-size:13px">Received ${new Date().toUTCString()}</p><table style="width:100%;border-collapse:collapse">${rows}</table><p style="margin:24px 0 0;color:#888;font-size:12px">View all leads at <a href="https://cscleaners.com.au/admin" style="color:#0077B6">cscleaners.com.au/admin</a></p></td></tr></table></body></html>`;

  const text = Object.entries(payload)
    .filter(([k]) => k !== "formType")
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(", ") : v == null || v === "" ? "—" : String(v);
      return `${k}: ${val}`;
    })
    .join("\n");

  return { subject, html, text };
}

async function sendViaResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });
  if (!res.ok) {
    console.error("Resend send failed:", res.status, await res.text());
  }
}

async function writeToD1(db: D1Database, payload: LeadPayload): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO leads (received_at, form_type, name, email, phone, suburb, payload_json)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      new Date().toISOString(),
      payload.formType ?? "unknown",
      payload.contactName ?? payload.name ?? null,
      payload.email ?? null,
      payload.phone ?? null,
      payload.suburb ?? (Array.isArray(payload.suburbs) ? payload.suburbs.join(",") : null),
      JSON.stringify(payload)
    )
    .run();
  return result.meta?.last_row_id ?? -1;
}

export const onRequestOptions = () =>
  new Response(null, { status: 204, headers: CORS_HEADERS });

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  let payload: LeadPayload;
  try {
    payload = (await ctx.request.json()) as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ success: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  // 1. WRITE TO D1 SYNCHRONOUSLY — must succeed or we return 500
  if (!ctx.env.LEADS) {
    console.error("LEADS D1 binding missing — lead would be lost!");
    return new Response(
      JSON.stringify({ success: false, error: "storage_not_configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
    );
  }
  let leadId: number;
  try {
    leadId = await writeToD1(ctx.env.LEADS, payload);
  } catch (e) {
    console.error("D1 write failed:", e);
    return new Response(
      JSON.stringify({ success: false, error: "storage_failed" }),
      { status: 500, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
    );
  }

  // 2. Best-effort async side effects (don't block client response)
  const tasks: Promise<unknown>[] = [];

  // Email via Resend
  if (ctx.env.RESEND_API_KEY && ctx.env.OPS_EMAIL) {
    const { subject, html, text } = renderEmailBody(payload);
    tasks.push(
      sendViaResend({
        apiKey: ctx.env.RESEND_API_KEY,
        from: ctx.env.SENDER_EMAIL ?? "leads@cscleaners.com.au",
        to: ctx.env.OPS_EMAIL,
        subject,
        html,
        text,
        replyTo: payload.email,
      }).catch((e) => console.error("Resend error:", e))
    );
  }

  // Downstream webhook (Make/Zapier)
  if (ctx.env.WEBHOOK_URL) {
    tasks.push(
      fetch(ctx.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          leadId,
          receivedAt: new Date().toISOString(),
          source: "cscleaners.com.au",
        }),
      }).catch((e) => console.error("Webhook error:", e))
    );
  }

  ctx.waitUntil(Promise.allSettled(tasks));

  return new Response(JSON.stringify({ success: true, leadId }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
};

type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  waitUntil: (promise: Promise<unknown>) => void;
}) => Response | Promise<Response>;
