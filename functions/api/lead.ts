/**
 * Cloudflare Pages Function — Lead Webhook
 *
 * Receives POSTs from any form on the site (residential quote, business lead,
 * contractor application) and fans them out to:
 *   1. Email notification to OPS_EMAIL (via MailChannels — free with Cloudflare Pages)
 *   2. Optional forward to a downstream webhook (Make.com, Zapier, n8n)
 *   3. Optional write to a Cloudflare D1 database (free tier)
 *
 * Environment variables to set in Cloudflare Pages settings:
 *   - OPS_EMAIL          (required) — where lead notifications go, e.g. info@cscleaners.com.au
 *   - WEBHOOK_URL        (optional) — downstream webhook (Make/Zapier)
 *   - SENDER_EMAIL       (optional) — defaults to noreply@cscleaners.com.au
 *
 * Bindings (optional):
 *   - LEADS              — D1 database. Run `wrangler d1 create cscleaners-leads` then bind it.
 *
 * Forms post JSON with a "formType" field: "business_lead" | "contractor_application" | "residential_quote"
 */

interface Env {
  OPS_EMAIL?: string;
  SENDER_EMAIL?: string;
  WEBHOOK_URL?: string;
  LEADS?: D1Database;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
}

interface LeadPayload {
  formType?: string;
  // Common fields
  contactName?: string;
  name?: string;
  email?: string;
  phone?: string;
  // Business-specific
  businessName?: string;
  premisesType?: string;
  suburb?: string;
  approxSqm?: string;
  // Contractor-specific
  abn?: string;
  suburbs?: string[];
  // Residential quote
  track?: string;
  price?: number;
  // Anything else
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
  const suburb = payload.suburb ?? (Array.isArray(payload.suburbs) ? payload.suburbs.join(", ") : "");

  const friendlyType: Record<string, string> = {
    business_lead: "🏢 Business lead",
    contractor_application: "🧹 Contractor application",
    residential_quote: "🏠 Residential quote",
  };
  const heading = friendlyType[type] ?? `📩 ${type}`;
  const subject = business
    ? `${heading} — ${business} (${suburb || "Melbourne"})`
    : `${heading} — ${contact}${suburb ? ` (${suburb})` : ""}`;

  // Build a tidy HTML body from all fields
  const rows = Object.entries(payload)
    .filter(([k]) => k !== "formType")
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      const val = Array.isArray(v) ? v.join(", ") : v == null || v === "" ? "—" : String(v);
      return `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#666;font-size:13px;width:180px">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top;font-size:13px;color:#1a1a2e">${escapeHtml(val)}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;background:#f8f9fa;margin:0;padding:24px"><table style="background:white;border-radius:12px;padding:24px;max-width:640px;margin:0 auto;box-shadow:0 1px 3px rgba(0,0,0,0.08)"><tr><td><h1 style="margin:0 0 8px;font-size:18px;color:#1a1a2e">${heading}</h1><p style="margin:0 0 18px;color:#666;font-size:13px">Received ${new Date().toUTCString()}</p><table style="width:100%;border-collapse:collapse">${rows}</table></td></tr></table></body></html>`;

  const text = Object.entries(payload)
    .filter(([k]) => k !== "formType")
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(", ") : v == null || v === "" ? "—" : String(v);
      return `${k}: ${val}`;
    })
    .join("\n");

  return { subject, html, text };
}

async function sendViaMailChannels(opts: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<Response> {
  return fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: opts.to }] }],
      from: { email: opts.from, name: "CS Cleaners site" },
      reply_to: opts.replyTo ? { email: opts.replyTo } : undefined,
      subject: opts.subject,
      content: [
        { type: "text/plain", value: opts.text },
        { type: "text/html", value: opts.html },
      ],
    }),
  });
}

async function writeToD1(db: D1Database, payload: LeadPayload): Promise<void> {
  await db
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

  const tasks: Promise<unknown>[] = [];

  // 1. Email to ops
  if (ctx.env.OPS_EMAIL) {
    const { subject, html, text } = renderEmailBody(payload);
    tasks.push(
      sendViaMailChannels({
        from: ctx.env.SENDER_EMAIL ?? "noreply@cscleaners.com.au",
        to: ctx.env.OPS_EMAIL,
        subject,
        html,
        text,
        replyTo: payload.email,
      }).catch((e) => console.error("mailchannels error:", e))
    );
  }

  // 2. Downstream webhook
  if (ctx.env.WEBHOOK_URL) {
    tasks.push(
      fetch(ctx.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          receivedAt: new Date().toISOString(),
          source: "cscleaners.com.au",
        }),
      }).catch((e) => console.error("webhook error:", e))
    );
  }

  // 3. D1 database
  if (ctx.env.LEADS) {
    tasks.push(writeToD1(ctx.env.LEADS, payload).catch((e) => console.error("d1 error:", e)));
  }

  // Don't block on side-effects — they run via waitUntil if available
  ctx.waitUntil(Promise.allSettled(tasks));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
};

// Type augmentation for PagesFunction
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  waitUntil: (promise: Promise<unknown>) => void;
}) => Response | Promise<Response>;
