# Brokerage brand — name shortlist

You said you want to keep CS Cleaners as the residential / direct-service brand on `cscleaners.com.au`, and split the brokerage / matching side onto its own domain. Here's the shortlist.

## Naming criteria

Before choosing, agree on these:

1. **Implies the matching value prop.** "We connect / match / link / source the right cleaner for the right job." Without that signal, the name doesn't earn the brokerage positioning.
2. **B2B-respectable.** A facilities manager at a medical practice should not roll their eyes when they read it on a quote.
3. **Available .com.au + .com.** Both, if possible. A name that's only available with a hyphen is worth skipping.
4. **Two words max.** Three is okay if one is a regional qualifier (VIC, Melbourne).
5. **Pronounceable on a phone call without spelling.** "Cleanly" → cleanly. "Xleen" → no.
6. **Distinct from "CS Cleaners".** No "CleanSeas", "CleanCentral", "SeaCleaners" — those signal "same brand, new paint job" and dilute both.
7. **Trademark check.** Quick search on IP Australia Trade Mark search ([search.ipaustralia.gov.au](https://search.ipaustralia.gov.au)) class 37 (cleaning) and 35 (business services).

---

## Top 5 picks (my ranking)

### 1. CleanMatch  ⭐ recommended

**Domain candidates:** cleanmatch.com.au · cleanmatch.au · getcleanmatch.com

**Why it wins**
- The whole proposition in one word — "we match you to the right cleaner".
- Reads natural on both sides of the marketplace ("find a cleaning match", "join our match panel").
- Short, no ambiguity, easy to spell on a phone.
- Pairs well with a verb-first CTA: "Get matched". "Find your match". "Match me with a cleaner".
- Ad copy writes itself: *"Stop guessing at cleaning quotes. Get matched in 2 minutes."*

**Risk**
- Slightly common — needs a TM check. "Cleanmatch" appears in unrelated overseas contexts.

---

### 2. PanelClean

**Domain candidates:** panelclean.com.au · panelclean.au · trypanelclean.com

**Why it's strong**
- "Panel" is exactly what you have — a panel of vetted subcontractors. The name explicitly states the model.
- B2B-fluent. Facilities managers, procurement officers, body corporate managers all understand "panel arrangement".
- Less consumer-coded than CleanMatch — pushes the brand toward higher-value B2B contracts rather than residential.
- Differentiates from every "clean" competitor (most are residential-facing).

**Risk**
- A little cooler / less warm than CleanMatch. Better for serious B2B, less for emotional appeal.
- "Panel beating" association in Australia — a tiny risk of confusion, mostly fades after one ad.

---

### 3. CleanLink VIC

**Domain candidates:** cleanlink.com.au · cleanlinkvic.com.au · cleanlink.au

**Why it works**
- "Link" connotes two-sided connection without being as on-the-nose as "Connect".
- The "VIC" tail anchors local trust signals — Victorian compliance, local operator.
- Already used in unrelated overseas trade media (cleanlink.com is a US cleaning trade publication) — they're not a competitor and probably don't care about a .com.au, but worth a quick check.

**Risk**
- The US site `cleanlink.com` means the .com is taken. If you ever want to scale interstate, the .com.au + cleanlinkvic positioning is fine.

---

### 4. CleanersConnect (your original)

**Domain candidates:** cleanersconnect.com.au · cleanersconnectvic.com.au

**Why it works**
- Explicit, descriptive — search-friendly because someone googling "Melbourne cleaners connect" will find you.
- Two-sided implication is unambiguous.
- Easy for non-English-first contractors to understand and trust.

**Risk**
- Slightly long (15 letters). A bit "directory-style", which is fine if you embrace that positioning.
- Less premium-feeling than CleanMatch or PanelClean. Sounds more like a marketplace listing site (Hipages-style) than a head-contractor brand. That positioning is okay but it does set expectations toward listing-style pricing.

---

### 5. Bluestone Clean

**Domain candidates:** bluestoneclean.com.au · bluestonecleaning.com.au

**Why it's interesting**
- Distinctly Melbourne (bluestone is Melbourne's signature paving material — every Inner North laneway).
- Carries a "built, durable, local" connotation. Premium feel without being precious.
- Stands out in a sea of "Clean[Verb]" names.

**Risk**
- Doesn't say "matching / network" — you'd have to do the brand work yourself.
- Geographically narrow — won't scale beyond Melbourne / Victoria as easily.

---

## Long list (in case nothing above lands)

| Name | Note |
|---|---|
| TidyMatch | Friendlier, slightly residential-leaning |
| CleanWorks | Solid B2B, slightly anonymous |
| CleanCo Vic | Generic, easy |
| SquareClean | Modern, abstract |
| Cleanly Vic | Too close to existing US "cleanly.com" laundry brand |
| YarraClean | Geographic, narrow |
| FirstFloor Clean | Office-focused only |
| CleanRoster | "Roster" = panel, but a bit insider-y |
| ProSweep | Cute, not premium |
| AfterHours Clean | Specific to one segment |
| ScrubLink | Tries hard |
| CleanCert | Sounds like a certification body |
| TrustClean | Too generic |
| The Clean Panel | "The X" pattern is fine if .com.au is short — `thecleanpanel.com.au` |

---

## How to verify and pick (15 minutes)

1. Pick your top 2 from above.
2. Check .com.au availability: [auda.org.au/whois](https://www.auda.org.au/whois) or any registrar (VentraIP, Crazy Domains).
3. Check .com availability for international future-proofing (optional).
4. Search IP Australia trade marks: [search.ipaustralia.gov.au](https://search.ipaustralia.gov.au) — type the name, filter classes 37 and 35.
5. Search Google for the name + "cleaning" + "Melbourne" — confirm no existing Melbourne business will get confused with you.
6. Say it out loud on a fake call: *"Hi, this is [your name] from [BRAND]"*. If you stumble or feel cringe, kill the name. Phone matters more than logo.

## Domain ops once you choose

When you're locked in:

```bash
# In Cloudflare dashboard → Register domain → buy the .com.au (~$15/yr)
# Then in this repo:

# 1. Add the new domain to your Cloudflare Pages project as a second custom domain
#    Dashboard → Workers & Pages → cscleaners → Custom domains → Add → enter new domain

# 2. The /match page (which we already built) will then be reachable at both
#    cscleaners.com.au/match  AND  yournewdomain.com.au/match

# 3. Add a redirect rule (Cloudflare Rules → Single Redirects) on the new domain only:
#    Path equals "/" → 302 redirect to "/match" then later make /match itself the new root.

# 4. Eventually, split into a separate Pages project entirely if you want hard brand separation.
#    That step is optional — the redirect approach works indefinitely.
```

I'd start with CleanMatch unless you have a strong personal reason to pick another. It's the cleanest brand fit for the matching value prop, the easiest ad copy generator, and the most expandable across categories (commercial → residential → specialist later).
