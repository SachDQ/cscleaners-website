# Central Sea Cleaning — Deployment Guide

## Stack
- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS + custom brand system
- **Hosting**: Cloudflare Pages (free tier)
- **Email**: Cloudflare Email Routing (free)
- **Forms**: Direct webhook POST (Make.com / Zapier / n8n)

---

## 1. Deploy to Cloudflare Pages

### Option A — GitHub (recommended)
1. Push this repo to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
3. Connect GitHub repo → select `central-sea-cleaning`
4. Build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Add environment variable: `NEXT_PUBLIC_WEBHOOK_URL` = your webhook URL
6. Deploy → your site will be live at `*.pages.dev`
7. Add your custom domain in Pages → Custom Domains

### Option B — Direct upload
```bash
npm run build
# Upload the /out folder via Cloudflare Pages dashboard → Direct Upload
```

---

## 2. Custom Domain & DNS

1. Register `centralseacleaning.com.au` at [VentraIP](https://ventraip.com.au) (~$14/yr)
2. In Cloudflare: Add site → enter your domain → choose Free plan
3. Update nameservers at VentraIP to Cloudflare's nameservers
4. In Cloudflare Pages → Custom Domains → add `centralseacleaning.com.au`
5. SSL is automatic (Let's Encrypt, managed by Cloudflare)

---

## 3. Professional Email (Free — Cloudflare Email Routing)

1. In Cloudflare Dashboard → your domain → Email → Email Routing
2. Enable Email Routing
3. Create address: `contact@centralseacleaning.com.au` → forward to your Gmail/personal email
4. Also create: `quotes@`, `hello@` if needed — all forward to same inbox
5. **Cost**: Free. No extra inbox. All emails land in your existing email.

---

## 4. Quote Form Webhook

Forms post to `NEXT_PUBLIC_WEBHOOK_URL`. Set this up with:

### Make.com (recommended — free tier)
1. Create account at make.com
2. New scenario → Webhook → Custom webhook
3. Copy the webhook URL
4. Add it as `NEXT_PUBLIC_WEBHOOK_URL` in Cloudflare Pages environment variables
5. Route the data to: Gmail (send email notification) + Google Sheets (log all leads)

### What each form submission includes
```json
{
  "track": "residential|bond|commercial|builders|custom|contact",
  "name": "...",
  "phone": "...",
  "email": "...",
  "date": "...",
  "notes": "...",
  "price": 320,
  "bedrooms": 3,
  "bathrooms": 2,
  "addons": ["oven", "carpet"],
  "submittedAt": "2025-05-09T..."
}
```

---

## 5. Google Business Profile

1. Go to [business.google.com](https://business.google.com)
2. Create profile for "Central Sea Cleaning"
3. Service area: Melbourne and surrounding suburbs
4. Add all services, photos (use the generated images from `/public/images/`)
5. Set booking link to `https://centralseacleaning.com.au/quote`
6. This is your #1 source of free organic leads — complete it fully

---

## 6. Adding Your Phone Number

Search for `0400 000 000` across all files and replace with your real number:
```bash
grep -r "0400 000 000" app/ components/ --include="*.tsx" -l
```

---

## 7. Local Development

```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

## 8. Build for deployment

```bash
npm run build
# Static output in /out folder
```
