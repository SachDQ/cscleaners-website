# Weekly content calendar — AI-drafted, human-edited

**Cadence:** 1 blog post per week. **Not daily.** Daily AI-generated content is now a Google spam signal.

**Workflow:** Claude drafts → you edit and add real local detail → you publish → you share on LinkedIn manually.

## The 12-week rotating cluster plan

Two pillars, alternating: **Premises type** and **Suburb**. Each post targets one ranked keyword.

| Week | Topic type | Working title | Primary keyword |
|---|---|---|---|
| 1 | Premises | Medical cleaning in Melbourne: what's actually required | melbourne medical cleaning |
| 2 | Suburb | Commercial cleaning Thomastown — what businesses pay | commercial cleaning thomastown |
| 3 | Premises | Childcare cleaning compliance Victoria 2026 | childcare cleaning victoria |
| 4 | Suburb | Office cleaning Preston / Reservoir guide | office cleaning preston |
| 5 | Service | Strip and seal flooring: how often, how much | strip and seal melbourne |
| 6 | Suburb | Body corporate cleaning Coburg — what to expect | body corporate cleaning coburg |
| 7 | Premises | Gym cleaning Melbourne — high-touch sanitisation | gym cleaning melbourne |
| 8 | Suburb | Commercial cleaning Brunswick — restaurant strip case | commercial cleaning brunswick |
| 9 | Industry | Cleaning Services Award 2020 explained — for contractors | cleaning services award 2020 |
| 10 | Suburb | Office cleaning Fitzroy — for creative agencies | office cleaning fitzroy |
| 11 | Compare | In-house vs contracted cleaning: real numbers | inhouse vs contract cleaning |
| 12 | Suburb | Commercial cleaning Heidelberg — medical district | commercial cleaning heidelberg |

After week 12, rotate back through pillars with refreshed angles. Older posts get a refresh once per quarter.

## Per-post structure (use this in every prompt)

1. **Lead paragraph** — 50 words. Australian English. Mentions Melbourne. No hype.
2. **One H2 per main section.** Maximum 4 H2s.
3. **One real local example.** This is the human-edit step. Add a Melbourne business, an observed price point, a quote from a real client, or a recent regulatory change. AI cannot do this — you must.
4. **One photo from a real job** (or a stock image clearly labelled).
5. **Practical takeaways list** — bulleted.
6. **Soft CTA at the end** to the relevant landing page (`/business` for commercial topics).

Word count: **800–1,400 words.** Above that, ranks worse for service queries.

## Per-post AI prompt template

Copy this into a Claude conversation:

```
Draft a blog post for CS Cleaners (a Melbourne commercial cleaning company that subcontracts) on the topic:

TOPIC: {{title}}
PRIMARY KEYWORD: {{keyword}}
TARGET AUDIENCE: {{premises decision-maker or cleaner}}
WORD COUNT: 1,000 words

Constraints:
- Australian English. Mention Melbourne or Victoria where relevant.
- Honest, not salesy. Genuine information.
- Position CS Cleaners as a Melbourne head contractor that performs work directly and engages qualified subcontractors. NEVER claim a fixed roster size or "hundreds of clients".
- Reference 2026 Victorian regulations where relevant (Residential Tenancies Act 2021 amendments, Cleaning Services Award 2020).
- Include exactly one soft mention of CS Cleaners services near the end.
- Return JSON with: title, slug, excerpt (under 160 chars), category, readTime (e.g. "6 min"), htmlContent.
- Use <h2>, <h3>, <p>, <ul>, <ol>, <strong> only. No div or inline styles.
- First paragraph has class="lead".

Generate now.
```

## The "real local detail" edit you MUST add

After Claude returns the draft, before publishing, add at least ONE of:

- A photograph from a recent job you actually completed (with client permission)
- A real price point you encountered ("we recently quoted a 350sqm medical practice in Northcote at $1,180/month")
- A quote from a real client (signed off in writing — see ACL 29)
- A reference to a specific Melbourne event, regulation change, or local situation (heatwave, gas mains work, school holidays)
- A specific local supplier or industry contact

Without this, the post is generic AI. With it, the post ranks because it offers something search-result skimmers can't get elsewhere.

## Publishing — using the existing generator script

The repo already has `scripts/generate-blog-post.py`. Suggested workflow:

```bash
# 1. Generate draft (saves to content/posts/{slug}.json)
export ANTHROPIC_API_KEY=sk-ant-...
python3 scripts/generate-blog-post.py --topic "Medical cleaning in Melbourne: what's actually required"

# 2. Open content/posts/{slug}.json and edit the htmlContent
#    — add your real local detail, replace the stock CTA, fix any salesy language

# 3. Add image (drop the file into public/images/ and reference it as "image" in the JSON)

# 4. Preview locally
npx next dev

# 5. Commit and push (CI auto-deploys)
git add content/posts/{slug}.json public/images/{image}.png
git commit -m "blog: {{title}}"
git push
```

## LinkedIn syndication (manual, weekly)

Same day as publish, post a **summary** on LinkedIn (your personal profile, not a company page — small operators get more reach personally):

- 1 sentence hook (the most interesting takeaway)
- 3 short paragraphs (problem, what's the answer, what most people get wrong)
- 1-line CTA: "Full guide on the blog (link in comments)"
- Link in the **first comment**, not the post body (LinkedIn deprioritises posts with external links)

3 LinkedIn posts per week is the sweet spot. The blog drives one of them.

## Tracking — what to measure at week 12

- **Impressions** in Google Search Console for the 12 target keywords
- **Pages indexed** in Cloudflare Pages
- **Form submits** from `/business` that mentioned how they found you
- **Time on page** for each post via GA4

If a post has zero impressions after 60 days → kill it or rewrite. Do not pad the index with dead pages.

## What we explicitly do NOT do

- **Daily auto-published AI content.** Google's spam policy specifically targets this. We post weekly with human edit.
- **Spinning the same article into 5 variations.** Duplicate-content adjacent.
- **AI-generated images of cleaners** (looks fake, hurts trust). Use real photos or clear stock.
- **Comment-spam to drive backlinks.** A handful of legitimate guest posts on local-business blogs > 50 spam comments.
