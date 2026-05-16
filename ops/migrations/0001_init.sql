-- Cloudflare D1 migration — initial leads schema
-- Apply via: npx wrangler d1 execute cscleaners-leads --file=ops/migrations/0001_init.sql

CREATE TABLE IF NOT EXISTS leads (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  received_at     TEXT    NOT NULL,            -- ISO timestamp
  form_type       TEXT    NOT NULL,            -- business_lead | contractor_application | residential_quote
  name            TEXT,
  email           TEXT,
  phone           TEXT,
  suburb          TEXT,
  payload_json    TEXT    NOT NULL,            -- full JSON for anything not modeled here
  status          TEXT    DEFAULT 'new',       -- new | contacted | quoted | won | lost | rejected
  notes           TEXT,
  contacted_at    TEXT,
  quoted_at       TEXT,
  won_at          TEXT,
  lost_at         TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_form_type ON leads(form_type);
CREATE INDEX IF NOT EXISTS idx_leads_status    ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_received  ON leads(received_at DESC);

-- Target list for outbound research (businesses you want to win)
CREATE TABLE IF NOT EXISTS targets (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  business_name   TEXT    NOT NULL,
  premises_type   TEXT,                        -- office | medical | childcare | gym | retail | industrial | strata | other
  suburb          TEXT,
  approx_sqm      INTEGER,
  current_provider TEXT,
  decision_maker  TEXT,
  decision_email  TEXT,
  decision_phone  TEXT,
  source          TEXT,                        -- google_maps | linkedin | council_directory | tender_portal | referral | other
  renewal_window  TEXT,                        -- best guess at next renewal date or "rolling"
  notes           TEXT,
  added_at        TEXT    NOT NULL DEFAULT (datetime('now')),
  -- pipeline state
  status          TEXT    DEFAULT 'researching',  -- researching | first_contact | engaged | quoting | won | lost | dormant
  first_touch_at  TEXT,
  last_touch_at   TEXT,
  next_action_at  TEXT
);

CREATE INDEX IF NOT EXISTS idx_targets_suburb       ON targets(suburb);
CREATE INDEX IF NOT EXISTS idx_targets_status       ON targets(status);
CREATE INDEX IF NOT EXISTS idx_targets_next_action  ON targets(next_action_at);

-- Touch log — every outreach attempt
CREATE TABLE IF NOT EXISTS touches (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  target_id       INTEGER NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  touched_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  channel         TEXT    NOT NULL,           -- email | phone | inperson | linkedin | letter
  template_id     TEXT,                       -- e.g. "intro_v1", "followup_capability"
  result          TEXT,                       -- no_response | replied | not_interested | meeting_booked | wrong_contact
  notes           TEXT
);

CREATE INDEX IF NOT EXISTS idx_touches_target ON touches(target_id);

-- Subcontractor panel (populated from contractor_application leads once vetted)
CREATE TABLE IF NOT EXISTS subcontractors (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT    NOT NULL,
  abn             TEXT,
  email           TEXT,
  phone           TEXT,
  suburbs_json    TEXT,                       -- JSON array of suburb names
  premises_json   TEXT,                       -- JSON array of premises types
  hours_available TEXT,
  rate_range      TEXT,
  public_liability TEXT,                      -- yes | no | will_obtain
  police_check    TEXT,
  wwcc            TEXT,
  status          TEXT    DEFAULT 'applied',  -- applied | vetting | trialled | active | inactive | rejected
  trial_date      TEXT,
  agreement_signed_at TEXT,
  notes           TEXT,
  added_at        TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_subs_status ON subcontractors(status);
