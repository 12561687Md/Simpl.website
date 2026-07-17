-- 002_leads_business_name.sql
-- Applied to Neon: 2026-07-17
--
-- The gate (/api/scan/start) knows the business NAME (from the free autocomplete
-- prediction) but not the website URL — that only arrives later from Places
-- Details, after the token is issued. There was no column for the name, so it
-- was being written into scan_url, which is a URL column. This adds the right
-- column and cleans up the rows that got the name.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS business_name VARCHAR(300);

-- Move misfiled names out of scan_url. Scoped to scan_gate rows that clearly do
-- not hold a URL, so real scan_url values are never touched.
UPDATE leads
   SET business_name = scan_url,
       scan_url = NULL
 WHERE source = 'scan_gate'
   AND scan_url IS NOT NULL
   AND scan_url NOT LIKE 'http%';
