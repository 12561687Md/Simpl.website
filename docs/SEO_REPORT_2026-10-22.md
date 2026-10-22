# Simpl website SEO report and plans (2026-10-22)

Branch `revamp-2026-10`. Everything below was checked against a local production build (`npm run build` + `next start`). Nothing is deployed.

## 1. Keyword map (one primary keyword per page, no two pages share one)

Volumes and difficulty are from DataForSEO (US, Google Ads volume + Labs keyword difficulty, pulled 2026-10-22). KD is 0 to 100. "n/a" means DataForSEO had no volume for that exact phrase (niche long tail).

| Page | Intent | Primary keyword (volume / KD) | Secondary keywords | H1 |
|---|---|---|---|---|
| `/` | Commercial | B2B lead generation company (480 / 24) | B2B lead generation (1,600 / 33), buying signals (260), B2B sales leads (320 / 31) | B2B lead generation built on buying signals from the public record. |
| `/services` | Commercial | B2B lead generation services (390 / 33) | lead generation services (1,300 / 31), outbound lead generation (260) | B2B lead generation services, built on the public record. |
| `/services/account-engine` | Commercial | sales prospecting (720 / 23) | sales intelligence tools (390), sales prospecting tools (390), account-based prospecting | Sales prospecting, done for every account in your market, every night. |
| `/services/crm-follow-up` | Commercial | CRM implementation services (170) | sales follow up (170), sales follow-up sequence | CRM implementation services that follow up for you. |
| `/services/ai-receptionist` | Commercial | AI receptionist (74,000 / 25) | AI receptionist for business (140 / 27), after hours answering service (1,000), 24/7 answering service (720 / 37) | An AI receptionist for B2B service companies, answering 24/7. |
| `/industries` | Commercial | commercial leads (90) | commercial sales leads | Commercial leads for teams that sell to buildings and facilities. |
| `/industries/low-voltage-security` | Commercial | low voltage leads (20) | security integrator leads, access control leads, structured cabling leads | Low voltage leads for security and cabling integrators, before the bid goes out. |
| `/industries/senior-living-technology` | Commercial | senior living sales (260) | nursing home inspection reports (110 / 31), nurse call system leads | Senior living sales leads, rolled up to the operator who signs. |
| `/industries/building-systems` | Commercial | commercial construction leads (90 / 18) | commercial HVAC leads (40), commercial roofing leads (110), fire protection leads | Commercial construction leads for fire, HVAC and elevator contractors, ranked every week. |
| `/industries/facility-services` | Commercial | commercial cleaning leads (390 / 0) | janitorial leads (90), property management leads (170) | Commercial cleaning leads the week a building changes hands. |
| `/industries/healthcare-technology` | Commercial | medical equipment sales leads (n/a) | healthcare IT sales prospecting, CMS deficiency data | Medical equipment and healthcare IT sales leads, from the public record. |
| `/case-studies/noovis` | Commercial (proof) | Noovis case study | network integrator lead generation | Noovis case study: B2B lead generation for a network and smart-building integrator. |
| `/top-prospects` | Transactional | B2B prospect list | free prospect list | See your top prospects: a free B2B prospect list from your own market. |
| `/book` | Transactional | book a call (brand) | | Book a call with Simpl. |
| `/about` | Navigational | B2B client acquisition partner (brand) | | A B2B client acquisition partner that shows its work. |
| `/faq` | Informational | B2B lead generation FAQ | every question is a long-tail target | B2B lead generation FAQ: straight answers. |
| `/blog` | Informational | B2B prospecting and local SEO guides | | B2B prospecting and local SEO guides. Straight answers. |
| `/services/local-seo` | Commercial | local SEO services (6,600 / 34) | local SEO company (2,900), local SEO (8,100 / 72) | Local SEO services that put you in the Google Maps 3-pack. |
| `/services/website-build` | Commercial | small business website design (1,900 / 45) | contractor website design (1,000) | Small business website design, built to turn visits into calls. |
| `/services/google-business-profile` | Commercial | Google Business Profile management (1,300) | GBP optimization | Google Business Profile management, run like it matters. |
| `/services/paid-ads` | Commercial | PPC management services (1,000 / 16) | Google Ads management (880 / 32), Local Services Ads | PPC management services that book jobs, not just clicks. |
| `/free-tools` | Transactional | free website audit (880 / 83) | website audit tool (880 / 78), free SEO audit (1,300 / 78) | Free website audit: your score in about 60 seconds. |
| `/login` | Navigational (noindex) | | | Client login: go to your portal. |
| `/privacy`, `/terms` | Navigational | | | Privacy Policy / Terms of Service |

**Blog posts (informational).** Each post keeps one primary term, and the posts that used to collide with a money page were re-aimed:

| Post | Primary keyword | Why it no longer cannibalizes |
|---|---|---|
| `sales-trigger-events-b2b` | buying signals (260) / sales trigger events | Home uses "buying signals" only as a secondary |
| `how-to-sell-to-senior-living-communities` | how to sell to senior living communities | Industry page now targets "senior living sales" |
| `lead-generation-for-low-voltage-contractors` | lead generation for low voltage contractors (how-to) | Industry page now targets "low voltage leads" |
| `building-permits-for-sales-leads` | building permit leads | Industry page targets "commercial construction leads" |
| `ai-receptionist-for-b2b-service-companies` | what an AI receptionist should do (informational) | Service page owns "AI receptionist" (commercial) |
| `zoominfo-alternatives-for-b2b-service-companies` | ZoomInfo alternatives (480 / KD n/a, comp. medium) | Only page on the term |
| `how-to-find-the-decision-maker`, `b2b-sales-follow-up-cadence` | their titles | Only pages on the term |
| 18 local posts | unchanged targets (Google Maps ranking, HVAC leads, etc.) | Local service pages target "services/company" terms, posts target "how to" terms |

**Opportunities found in the research, worth new pages or posts next:**
- "AI receptionist" is 74,000/mo at KD 25: the single biggest low-competition term. A comparison post ("AI receptionist vs answering service") would support the service page.
- "b2b lead generation agencies / companies" (720 each, KD 24) and "b2b lead generation strategies" (390, KD 16): a strategy guide post.
- "commercial cleaning leads" (390, KD 0) and "commercial roofing leads" (110, KD 0): the facility and building-systems pages can win these with one supporting post each.
- "after hours answering service" (1,000, low competition, CPC over $140): high commercial value.

## 2. Matt's SEO checklist, item by item

| # | Item | Status |
|---|---|---|
| 1 | Google Search Console | **Not possible from here.** The service account key in `Simpl.master/.env` is dead (`invalid_grant: Invalid JWT Signature`, the key was deleted in Google Cloud). Steps for Matt are in section 3. |
| 2 | Breadcrumbs | Done. Visible breadcrumb + BreadcrumbList JSON-LD on every inner page, built from one array (`Crumbs` in `app/components/engine/ui.tsx`). |
| 3 | Canonical tags | Done. Every page has a canonical on `https://www.simpl.pro` (crawl confirmed). `/scan` canonicals to `/free-tools`. |
| 4 | Core Web Vitals | Desktop Lighthouse 99 to 100 on every page tested (LCP 0.6 to 0.8 s, CLS 0, TBT 0 to 20 ms). Mobile lab score 77 to 93. CLS is 0 everywhere. Real LCP measured in Chromium under 4x CPU + slow 4G is 2.0 s (home) after adding `content-visibility` to below-the-fold sections (was 3.0 s). Lighthouse's simulated mobile LCP still reads 3.2 to 4.5 s; the same estimate is 3.5 s on the near-empty `/login`, so it is the Next.js runtime floor, not page content. INP can't be measured in a lab; TBT (its proxy) is 30 to 360 ms on mobile. Check field data in Vercel Speed Insights after launch. |
| 5 | No orphan pages | Done. Crawl from `/` reaches all 52 indexable pages; footer links every service, industry and company page. `/scan`, `/start-now`, `/login` are noindexed utility pages. |
| 6 | Schema on every page | Done. Organization + WebSite site-wide; WebPage on every page; Service on service and industry pages; FAQPage wherever FAQs render; BreadcrumbList on all inner pages; BlogPosting + Person author on posts; Article on the case study; ItemList on hubs. No prices or Offer blocks anywhere. |
| 7 | One H1, logical headings | Done. Exactly one H1 on every page at every viewport (checked on 318 page/viewport combinations). |
| 8 | No duplicate content | Done. Retired/merged pages 301: `/pricing` and `/start` to `/services/account-engine`, `/top-25` to `/top-prospects`, `/success-stories` to `/case-studies/noovis`, `/contact` to `/book`. `/scan` duplicated `/free-tools`, so it is noindexed with a canonical to `/free-tools` (kept live because emails link to `/scan?url=`). FAQ answers on `/faq` are worded differently from the service pages. Unique titles and descriptions on every page (crawl confirmed). |
| 9 | Backlinks | Plan in section 4. |
| 10 | Clean URLs | Done. Lowercase, hyphenated, hierarchical (`/services/...`, `/industries/...`, `/case-studies/...`, `/blog/...`). |
| 11 | Broken links / 404s | Done. Crawl of the production build: 52 pages, 0 non-200 responses. |
| 12 | JavaScript crawlable | Done. Every marketing page is server-rendered (static HTML). Portal mockups are plain HTML/CSS, no JS. Only the forms, the header menu and the scanner are client components. |
| 13 | Keyword cannibalization | Done. See the map above. |
| 14 | Mobile-friendly | Done. No horizontal scroll at 390 px on any page; tables stack into cards; portal mocks switch to a phone layout via container queries. |
| 15 | Author / E-E-A-T | Done. Byline and author block on every post ("Matt DuBois, Founder of Simpl", role and experience, link to About), Person schema with `@id`. No photo anywhere, by request. |
| 16 | Titles 50 to 60, unique descriptions | Done. Every indexable page title is 50 to 60 characters and every description 70 to 155 characters, all unique (crawl confirmed). |
| 17 | Optimized images | Done for blog images (next/image, WebP sources, `sizes`, priority on the hero, descriptive alt). Portal visuals are coded HTML, not images, with `role="img"` and descriptive labels. |
| 18 | Search intent per page | Done. See the Intent column above. |
| 19 | Keyword research | Done with live DataForSEO data. See section 1. |

## 3. Google Search Console: steps for Matt

The automation key no longer works, so this has to be done by hand once.

1. Go to https://search.google.com/search-console and open the `simpl.pro` property (Domain property). If it doesn't exist, add a **Domain** property for `simpl.pro` and verify with the TXT record in Cloudflare DNS.
2. **Indexing > Pages.** Note every reason under "Why pages aren't indexed". Expected after launch: the old URLs (`/pricing`, `/start`, `/top-25`, `/success-stories`, `/how-it-works`, `/services/quick-wins`, `/services/strategy`, `/services/organic-growth`, `/services/ai-quoting-agent`) will show as "Page with redirect". That is correct.
3. **Sitemaps.** After the branch ships, submit `https://www.simpl.pro/sitemap.xml` (remove any old apex `https://simpl.pro/sitemap.xml` entry).
4. **URL Inspection.** Inspect and "Request indexing" for `/`, `/services/account-engine`, `/case-studies/noovis`, `/services/local-seo`, `/services/ai-receptionist` and the five `/industries/...` pages.
5. **Enhancements.** Check Breadcrumbs and FAQ reports for errors a week after launch.
6. To restore automation: in Google Cloud project `simpl-500000`, create a new JSON key for `simpl-scan@simpl-500000.iam.gserviceaccount.com`, save it as `credentials.json` (gitignored), and in Search Console add that email as a **Restricted** user on the property.

**Fixes that need a production deploy** (all are on this branch, waiting for Matt's go): the new redirects, the new sitemap and robots.txt, the canonical/noindex changes on `/scan`, `/start-now` and `/login`, the rewritten `llms.txt`, and every title, description and H1 change above.

## 4. Backlink plan

Nothing can be built from localhost, so this is the order to work it after launch. Every link points to the most relevant page, not always the homepage.

**Week 1: foundations (free, fast)**
- Google Business Profile website link (deferred with the rest of the GBP work).
- LinkedIn company page for Simpl, plus Matt's profile "Featured" section linking to `/case-studies/noovis`.
- Crunchbase, Clutch, G2 (as a service), GoodFirms, DesignRush, UpCity, Sortlist: agency/B2B service listings. Link to `/services`.
- Bing Places and Apple Business Connect: same NAP as the site.

**Weeks 2 to 4: proof links**
- Noovis case study link from Noovis' own site (a "Partners" or "News" mention) once Noovis approves being named. Highest value link available.
- Raleigh Chamber of Commerce and NC Tech Association member directories.
- Product directories for the Account Engine: SaaSHub, AlternativeTo (as a ZoomInfo/Apollo alternative), Product Hunt launch with the case study.

**Month 2 onward: industry authority (where buyers read)**
- Low voltage and integrators: SIA (Security Industry Association) member directory, BICSI, NSCA, ESA (Electronic Security Association), and guest posts in *Security Sales & Integration*, *SDM*, *Cabling Installation & Maintenance*. Pitch: "Finding projects in permits and E-Rate filings before the bid".
- Senior living: Argentum and LeadingAge supplier directories; guest posts in *Senior Housing News* and *McKnight's Senior Living*. Pitch: "What state inspection reports tell a vendor".
- Facility services and building systems: BOMA and IFMA vendor directories; NFPA and ACCA partner pages where available.
- Sales audiences: guest posts on sales blogs (Sales Hacker, the Pavilion community) about public-record buying signals; podcast appearances on B2B sales and integrator business podcasts.

**Ongoing: earned links**
- Publish one data piece per quarter from the engine's own public-record aggregates (no client data), for example "How many assisted living inspections cite call systems, by state". Data posts earn links from trade press.
- HARO-style source requests (Qwoted, Featured) answering questions on B2B prospecting and local SEO.

Track every placement (URL, date, target page, follow/nofollow) in one sheet; review referring domains monthly in GSC Links.
