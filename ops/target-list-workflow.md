# Target list workflow — outbound demand

The most valuable asset in this business is **a list of Melbourne businesses with cleaning needs, scored by likelihood of switching**. This document is how you build, score, and act on it.

## The data model

Three tables in D1 (see `migrations/0001_init.sql`):

- **`targets`** — businesses you want to win
- **`touches`** — every outreach attempt against a target
- **`leads`** — inbound enquiries from the website (these are SEPARATE from targets — a target becomes a lead the moment they respond)

## ICP — Ideal Customer Profile

Lock the ICP before researching anyone. Start with **one** ICP for the first 90 days. Suggested:

> Medical / allied health practice in northern Melbourne (Thomastown, Reservoir, Preston, Bundoora, Coburg, Heidelberg), 150–600 sqm, currently using a regional or chain cleaner, paying $600–$2,500/month, with at least one observable pain signal (Google review complaint, staff turnover, public renovation).

When the ICP is locked, sources to research from become obvious. When it isn't, every list looks viable and nothing converts.

## Where to source targets

| Source | Yield | How |
|---|---|---|
| Google Maps | High | Search "medical centre Thomastown", scrape names + websites. Open each, note premises type & visible cleaner branding. |
| Local council business directories | Medium | Whittlesea, Darebin, Banyule, Moreland directories. Free, accurate addresses. |
| LinkedIn Sales Navigator | High | Filter `Title: Practice Manager OR Facilities Manager` + `Location: Melbourne`. Free trial = 30 prospects. |
| VicTenders & TenderLink | Highest intent | Search "cleaning" filter "Victoria". Bids you can actually enter. |
| Body corporate managers | High volume | BCS, PICA, Strata Plus — each manages 50–200 sites. One signed BCM = many sites. |
| Existing residential clients | Free | Every residential client has a workplace. Ask. |
| Walk-bys | Medium | After hours, note the branded uniform/van of competitors at premises you'd like to win. |
| Industry directories | Medium | AMA Victoria (medical), ECA Victoria (childcare), Fitness Australia |

## Per-target data to capture

Mandatory:
- `business_name`
- `premises_type`
- `suburb`
- `decision_maker` name + email (or phone)
- `source` (where you found them)

Strongly useful (move them up the priority queue):
- `approx_sqm` (Google Maps lot view + rough estimate is fine)
- `current_provider` (you can see this on uniform, van, sustainability report, or just ask reception)
- `renewal_window` (most cleaning contracts are 12–24 months — ask "when's your current arrangement up for review?")

Nice-to-have:
- Pain signals: any public Google review about cleanliness, any visible turnover

## The scoring rubric

Give each target a 0–10 score before touching them:

| Signal | Points |
|---|---|
| In your tightest service suburb | +2 |
| Premises type matches your ICP exactly | +2 |
| Approx $500–$5,000/month potential | +2 |
| Renewal known to be in next 6 months | +2 |
| Visible pain signal (review, observed issue) | +1 |
| Decision-maker identified by name | +1 |

**Touch only targets scoring ≥ 6 in the first 90 days.** Tempting to broadcast everything; don't. Quality of touches predicts conversion far more than volume.

## The outreach cadence

For every scored target, the standard sequence is in `outreach/`:

1. **Day 0** — personalised email referencing something specific (a Google review, recent news, a building feature) + 1-page capability statement attached
2. **Day 4** — short follow-up email
3. **Day 8** — phone call to reception ("Can I leave a quick note for [decision-maker]?")
4. **Day 14** — physical drop-in with a printed quote estimate + business card
5. **Day 30** — re-engagement email referencing seasonal trigger (winter clean, EOFY, school holidays)
6. **Day 90** — long-cycle nurture (newsletter or one-off useful resource)

Log every touch in the `touches` table. If a target hits 5 touches with zero engagement, mark `dormant` and stop. Reattempt at the 6-month mark with a fresh angle.

## Daily routine (suggested)

| Time | Block |
|---|---|
| 8:00–9:00 | Research: add 5 new high-score targets to D1 |
| 9:00–10:30 | Touches: send 10 personalised emails (≈9 min each) |
| 12:00–12:30 | Calls: 5–8 dials, reception only, leave names |
| Evening | Walk-bys / physical drop-ins on the way home |

50 quality personalised outreaches per week is achievable solo. More than that and quality drops, conversion follows.

## What to do when a target responds

The moment a target replies, copy them into `leads` (or just mark the row `engaged` and treat it as one). Goal at first reply is **always a 10-minute site walk-through booked in the next 7 days.** Quotes go nowhere without eyes on the site.

## How to find current cleaner & renewal window

These two data points unlock everything else. Tactics that work:

- **"I'm building a referral list — who handles your cleaning?"** to reception. 60% of receptionists answer in one breath.
- Walk past the premises after 6pm. Note the uniform/van.
- Sustainability or annual reports list named suppliers (especially in education, healthcare, government).
- For state government tenders, supplier lists are public — search the contract register on procurement.vic.gov.au.
- Ask **"when's your current arrangement up for review?"** point blank. It's normal. The answer narrows your follow-up.
