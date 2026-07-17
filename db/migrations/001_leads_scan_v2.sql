-- 001_leads_scan_v2.sql
-- Applied to Neon: 2026-07-17
--
-- Adds the columns the Scanner V2 gate writes. All four are nullable and
-- additive, so existing rows and the older /scan + /contact writers keep
-- working untouched.
--
-- Context: this repo had no migration record at all before this file, which is
-- how `website` went missing long enough for app/api/contact/route.ts to grow a
-- TODO about it. Record every future ALTER here.

ALTER TABLE leads
  -- Google place_id of the scanned business. The join key back to the listing,
  -- and what makes a scan re-runnable without asking anything again.
  ADD COLUMN IF NOT EXISTS place_id     VARCHAR(255),

  -- Gate step 2. One of: 'owner', 'works_with', 'other'.
  -- The cheapest lead-quality signal in the funnel. 'owner' is a prospect;
  -- 'works_with' is very often a competing agency pulling a free audit on
  -- someone else's listing. Everyone gets their report; only 'owner' earns
  -- outreach. Without this, every scan in the table looks identical.
  ADD COLUMN IF NOT EXISTS relationship VARCHAR(32),

  -- Consent to ongoing score/competitor monitoring emails. Nullable on purpose:
  -- NULL means "never asked" (pre-V2 rows), which is not the same as "declined".
  ADD COLUMN IF NOT EXISTS opt_in       BOOLEAN,

  -- The lead's own site. Resolves the TODO in app/api/contact/route.ts, which
  -- was stuffing this into the message body for want of a column.
  ADD COLUMN IF NOT EXISTS website      VARCHAR(512);
