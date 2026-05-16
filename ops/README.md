# CS Cleaners Ops

This folder holds the operational scaffolding that lives outside the public website: lead/CRM database, outreach templates, and the AI blog pipeline.

Nothing in `ops/` is included in the public build. It's source-of-truth for how the business runs.

## What lives here

```
ops/
  migrations/              Cloudflare D1 SQL migrations (lead capture + CRM)
  outreach/                Email & call sequence templates for outbound
  content-calendar.md      Weekly AI-drafted blog pipeline plan
  target-list-workflow.md  How to research, score, and act on prospect leads
```

## One-time setup (≈10 minutes)

These steps light up the form handler at `/api/lead` so business and contractor forms email you and write to a database.

### 1. Create the D1 database

```bash
npx wrangler d1 create cscleaners-leads
# Copy the printed database_id, then:
npx wrangler d1 execute cscleaners-leads --file=ops/migrations/0001_init.sql --remote
```

### 2. Bind it to your Pages project

Add to `wrangler.toml`:

```toml
[[d1_databases]]
binding = "LEADS"
database_name = "cscleaners-leads"
database_id = "<paste-the-id-from-step-1>"
```

### 3. Set the ops email + sender in Cloudflare Pages

```bash
npx wrangler pages secret put OPS_EMAIL --project-name cscleaners
# enter: info@cscleaners.com.au
```

(Optional)

```bash
npx wrangler pages secret put SENDER_EMAIL --project-name cscleaners
# enter: noreply@cscleaners.com.au

npx wrangler pages secret put WEBHOOK_URL --project-name cscleaners
# enter your Make/Zapier webhook URL if you also want one
```

### 4. Verify

Submit a test on `/business` and `/contractor`. You should:
- get an email to `OPS_EMAIL` within seconds
- see a row in D1: `npx wrangler d1 execute cscleaners-leads --command "SELECT * FROM leads ORDER BY received_at DESC LIMIT 5" --remote`

## How email sending works

The Pages Function at `functions/api/lead.ts` posts to MailChannels, which is free for Cloudflare Workers/Pages. No SMTP credentials needed. Sender domain (`cscleaners.com.au`) must have:

- SPF record including MailChannels: `v=spf1 include:relay.mailchannels.net include:_spf.mx.cloudflare.net ~all`
- DKIM (Cloudflare auto-adds this for Email Routing — already done)
- Optional: a domain-lockdown TXT record. See https://support.mailchannels.com/

For replies-from-clients to actually arrive at your Gmail, the `Reply-To` header is set to the submitter's email so you can hit reply naturally.
