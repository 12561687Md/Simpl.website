-- 003_scan_v2_authorize.sql
-- Applied to Neon: 2026-07-17
--
-- Scanner V2 moves the email gate to AFTER the scan runs (preview first, then
-- unlock), so /api/scan/authorize now inserts a tracking row (source =
-- 'scan_started') before any email exists, purely to keep the daily spend cap
-- accurate: it must count every scan we paid for, not just the ones that
-- finished the gate. DROP NOT NULL is a no-op if email was already nullable.

ALTER TABLE leads
  ALTER COLUMN email DROP NOT NULL;
