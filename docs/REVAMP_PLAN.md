# Simpl website revamp plan (2026-10-22)

Branch: `revamp-2026-10`. Built and reviewed on localhost only. Never merged to `main` without Matt's go.

## 1. The shift in one paragraph

Simpl stops leading with "free SEO scan for local service businesses" and leads with what the money is now: **custom growth portals for high-ticket B2B companies**. The flagship is the **Account Engine** (every account in the client's market, scored nightly from the public record, with the reason to call, the proof and who signs), plus **CRM and follow-up** and an **AI receptionist / 24/7 support line**. Setup $10,000 to $15,000 plus monthly. Websites, SEO, Google Business Profile and paid ads stay on the menu as the easy, secondary services. The free scanner moves off the hero into a **Free tools** page, where it still sells websites, SEO and full digital presence audits.

Primary CTA everywhere: **"See your top 25 accounts"** (a 25-account sample of the prospect's own market, the same demo the sales pitch uses).

## 2. What the two reference sites teach

Research done 2026-10-22. haydn.pro sits behind a SiteGround captcha, so its structure was read from the February 2026 Wayback snapshot; shoppositioner.com was read live.

| | Haydn Pro (dog trainers) | Shop Positioner (tint / PPF shops) | What Simpl takes |
|---|---|---|---|
| Positioning | "The #1 marketing agency for dog trainers and pet pros" | "We give elite auto protection shops the unfair advantage" | Niche named in the H1 and the title tag. Ours names the buyer: high-ticket B2B teams that sell to buildings and facilities |
| Signature system | "HaydnX" program (coaching + CRM + ads) | "The Clarity System" / "Clarity Package" | One named product, the **Account Engine**, with Base and Pro |
| Software | "Haydn Business Management Software", openly built on GoHighLevel | "Client Portal" link (crm.shoppositioner.com) in the top utility bar | **Client login** in the header, pointing to `[client].simpl.pro` |
| Homepage order | Hero + discovery call, about, "watch this video before your call", services grid (9), premium tier, 3-step process, why us, software, reviews, quote form | Hero + badges, client logos, positioning, stats, 3-step system, "why most shops are stuck", "the right way", testimonials, qualification ("1 shop per city"), final CTA, platform logos | Hero (outcome), who it's for, the problem, how it works (4 steps), what's in the portal, proof, the full stack, value math, pricing, FAQ, final CTA |
| CTAs | "Get Started", "Book your FREE 30-minute discovery call", "Get A Free Quote" | "Request Consultation" repeated 4+ times, "Avg response in 5 minutes" | One promise-based CTA repeated: "See your top 25 accounts". Secondary: "How the Account Engine works" |
| Service pages | Hero, service cards, FAQ (5 questions), quote form | Hero, credentials, what's included (6), 4-step process, with/without comparison, reviews, contact, FAQ (7) | Hero, outcome, what's included, how it works, with/without, FAQ with FAQPage schema, CTA |
| Proof | "Vetted by 200+ dog trainers", 5.0 rating | 700+ shops, 97% success rate, case studies with metric headlines, badges | Only what's true: two anonymized live portals (account counts, coverage). No invented numbers, no client names without permission |
| Keyword strategy | ~100 long-tail blog posts, every one "X for dog trainers" | Service pages titled by niche ("Marketing for Window Tint & Protection Shops") | Industry pages titled by niche ("Lead generation for low-voltage and security integrators") and a blog built on buyer questions |
| Weaknesses to avoid | Generic copy, typos in headings, unsupported "#1" | Unsourced stats, conflicting numbers on the same page, empty testimonial blocks | Every number sourced or ours, no empty proof blocks, no "#1" claims |

## 3. Sitemap

```
/                                   Home: Account Engine first
/services                           Services hub (growth stack, then easy wins)
  /services/account-engine          Account Engine / Growth Portal (pillar)
  /services/crm-follow-up           CRM & follow-up
  /services/ai-receptionist         AI receptionist & 24/7 support line
  /services/website-build           Websites (kept, copy updated)
  /services/local-seo               SEO & AI search visibility (kept)
  /services/google-business-profile Google Business Profile (kept)
  /services/paid-ads                Paid ads (kept)
/industries                         Industries hub
  /industries/low-voltage-security  Low voltage, security, access control, telecom
  /industries/senior-living-technology
  /industries/facility-services
  /industries/building-systems      Fire protection, commercial HVAC, elevators, roofing
  /industries/healthcare-technology Medical equipment, healthcare IT
/pricing                            Account Engine and Account Engine Pro
/top-25                             The request form: "See your top 25 accounts"
/free-tools                         Free website + presence scan, digital presence audit
/start-now                          The existing scanner flow (linked from Free tools)
/login                              Client login: go to yourcompany.simpl.pro
/about                              Why Simpl, the founder, how we work
/faq                                All questions, grouped, FAQPage schema
/blog, /blog/[slug]                 B2B growth posts first, the local guides kept
/privacy, /terms                    Unchanged
```

## 4. Page-by-page outline

**Home `/`**
1. Hero. H1: "Know exactly who to call this week, and why they'll buy." Sub: your own growth portal, every account in your market scored nightly from the public record, with the reason, the proof and who signs. CTAs: "See your top 25 accounts", "How it works". Visual: coded portal mock ("Today's best calls"), illustrative accounts only.
2. Who it's for: industry chips linking to each industry page.
3. The problem (question-led): "How does your team decide who to call on Monday?" Without vs with.
4. How it works, 4 steps.
5. What's inside your portal (6 features, "rolling out" tags where true).
6. Proof: two anonymized live portals (senior living network integrator; senior living technology company).
7. The full stack: Account Engine, CRM & follow-up, AI receptionist; then the easy wins (websites, SEO & AI search, GBP, ads).
8. Value math: what the alternatives cost.
9. Pricing cards (Base, Pro).
10. FAQ (8 questions, FAQPage schema).
11. Final CTA + a small Free tools band for local businesses.

**Services hub `/services`**: the growth stack (3 cards) then the easy wins (4 cards), each linked; ItemList + Breadcrumb schema.

**Account Engine `/services/account-engine`**: hero, what it does, reasons to call we track (inspections, citations, permits, licenses, ownership changes, budget cycles, bids), how it works (4 steps), what's in the portal, with vs without, who it's for (industry links), pricing teaser, FAQ, CTA.

**CRM & follow-up `/services/crm-follow-up`**: every account worth a call flows into your CRM (ours or yours), the sequence (email, wait, call, follow up until reply or opt-out), what's included, honest "rolling out" note, FAQ, CTA.

**AI receptionist `/services/ai-receptionist`**: answers support calls and tickets at any hour, checks your own guides, replies, pages whoever is on duty; what it never does; what's included; FAQ; CTA.

**Industry pages** (one template, five verticals): H1 names the vertical ("Find the [buyers] that need [what you sell] this month"), the reasons to call we track for that vertical with the public source behind each, who decides (seats), an illustrative account card, FAQ, links to the Account Engine page and the related blog post.

**Pricing `/pricing`**: Base and Pro cards (from `Simpl.master/brand/pricing/simpl-engine-pricing.html`), what each replaces, add-ons, the easy-win services (scoped on a call), FAQ, Offer schema.

**Free tools `/free-tools`**: the scanner embedded, what it checks, the full digital presence audit, link to websites / SEO / GBP services.

**Client login `/login`**: enter your company name, go to `yourcompany.simpl.pro`. No client names listed (that would publish the client list).

**About `/about`**: who builds it (Matt), why the price is what it is ("no account manager, no sales team, no office"), what we stand for, proof.

**Top 25 `/top-25`**: short form (name, work email, company, what you sell, territory, phone optional). Posts to `/api/contact` with `service: "Top 25 accounts"`.

## 5. Keyword map

Volumes not quoted here on purpose: confirm in Ubersuggest/AnswerThePublic before committing to a page's primary term. These are chosen for intent fit, not guessed volume.

| Page | Primary | Secondary |
|---|---|---|
| `/` | B2B growth engine | sales trigger events, account-based prospecting, custom client portal, who to call this week |
| `/services/account-engine` | trigger-based prospecting | buying signals from public records, sales intelligence portal, account research service |
| `/services/crm-follow-up` | B2B CRM setup and follow-up | sales follow-up sequence, CRM implementation for small sales teams |
| `/services/ai-receptionist` | AI receptionist for B2B service companies | 24/7 answering service, after-hours support line, AI phone answering |
| `/industries/low-voltage-security` | lead generation for low voltage contractors | security integrator sales leads, access control leads, structured cabling leads, E-Rate leads |
| `/industries/senior-living-technology` | how to sell to senior living communities | assisted living inspection reports, nurse call system leads, senior living technology sales |
| `/industries/facility-services` | facility services lead generation | commercial cleaning leads, property management leads, new commercial building owners |
| `/industries/building-systems` | fire protection contractor leads | commercial HVAC sales leads, elevator service leads, building permit leads |
| `/industries/healthcare-technology` | healthcare IT sales prospecting | medical equipment sales leads, CMS deficiency data, NPI registry prospecting |
| `/pricing` | Account Engine pricing | B2B lead generation pricing, cost of sales intelligence tools |
| `/free-tools` | free website audit | free SEO scan, digital presence audit, Google Business Profile check |
| `/about` | Simpl (brand) | B2B client acquisition partner |
| `/faq` | (question cluster) | every FAQ question is a long-tail target |
| Websites / SEO / GBP / Ads | kept from current pages | now framed as add-ons to the growth stack |

**SEO, AEO and GEO tactics applied on every page**
- One H1 with the primary term; H2s written as the questions buyers type ("How does the Account Engine find buyers?").
- An answer-first paragraph under every question heading: the first 1-2 sentences answer it in full so an answer engine can lift them.
- FAQ block on every money page, mirrored in FAQPage JSON-LD.
- JSON-LD: Organization + WebSite site-wide; Service on service and industry pages; Offer on pricing; BreadcrumbList everywhere below home; BlogPosting + FAQPage on posts.
- `public/llms.txt` rewritten for the new positioning (what Simpl is, who for, pricing, key pages), so generative engines describe Simpl correctly.
- Entity consistency: "Simpl", "Account Engine", "team@simpl.pro", "(919) 428-9452", "Raleigh, NC" identical everywhere (site, GBP, LinkedIn).
- Citable specifics: name the actual public sources (CMS Care Compare, USAC E-Rate, Census building permits, NPPES NPI registry, SAM.gov) instead of vague "data".
- Robots allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended): nothing in robots blocks them.

## 6. Internal and external linking plan

- **Hub and spoke:** Home links to every service and industry page. Every industry page links up to `/services/account-engine` and `/industries`, across to two sibling industries, and to its matching blog post. Every service page links to `/pricing`, `/top-25`, and two industries.
- **Blog to money pages:** every new post links to the Account Engine page and to the relevant industry page in-body, plus a "See your top 25 accounts" CTA. Old local posts keep their scan CTA and now link to `/free-tools`.
- **Breadcrumbs** on every inner page, visible and in schema.
- **Footer** carries Services, Industries, Company columns so every key page is two clicks from anywhere.
- **External authority links** (open in new tab, `noopener`): CMS Care Compare and CMS provider data, USAC E-Rate, Census Building Permits Survey, NPPES NPI registry, SAM.gov, FTC CAN-SPAM guide, FCC TCPA page, HBR's lead response study, NFPA 72. These are what the engine actually reads, so citing them is honest and builds topical authority.

## 7. Blog plan (target keyword per post)

Shipped on the branch (8):
1. `sales-trigger-events-b2b`: "sales trigger events" (what they are, examples by industry) [pillar]
2. `how-to-sell-to-senior-living-communities`: "how to sell to senior living communities"
3. `building-permits-for-sales-leads`: "building permit leads"
4. `zoominfo-alternatives-for-b2b-service-companies`: "ZoomInfo alternative"
5. `how-to-find-the-decision-maker`: "how to find the decision maker at a company"
6. `lead-generation-for-low-voltage-contractors`: "lead generation for low voltage contractors"
7. `b2b-sales-follow-up-cadence`: "how many times to follow up B2B"
8. `ai-receptionist-for-b2b-service-companies`: "AI receptionist for B2B"

Next up (not yet written):
9. `e-rate-leads-for-integrators`: "E-Rate Form 470 leads"
10. `how-to-use-cms-inspection-data-for-sales`: "CMS deficiency data"
11. `fire-protection-contractor-leads`: "fire protection leads"
12. `account-based-marketing-for-small-b2b-teams`: "account based marketing small business"

## 8. Google Business Profile update plan

| Field | Now (local marketing) | Change to |
|---|---|---|
| Name | Simpl | **Simpl** (no keywords in the name, Google's rule) |
| Primary category | Marketing agency / Internet marketing service | **Business development service** (if unavailable in the picker: **Marketing consultant**) |
| Secondary categories | | Marketing agency, Software company, Internet marketing service, Website designer |
| Services | Local SEO, websites, ads | Account Engine (growth portal), Sales prospecting research, CRM setup and follow-up, AI receptionist and 24/7 support line, Website design, SEO and AI search, Google Business Profile management, Paid ads management |
| Description (750 max) | | "Simpl builds custom growth portals for B2B companies that sell high-ticket products, long-term services and big contracts. The Account Engine reads the public record for every account in your market every night (inspections, permits, licenses, ownership changes, budget cycles), ranks who is worth a call this week, and shows the reason, the proof and the decision maker on every line. We also set up CRM and follow-up, build 24/7 AI receptionist and support lines, and handle websites, SEO and ads. Based in Raleigh, NC, serving companies across the US. See your own top 25 accounts before you pay anything." |
| Website link | simpl.pro | `https://www.simpl.pro/?utm_source=google&utm_medium=organic&utm_campaign=gbp` |
| Appointment link | | `https://www.simpl.pro/top-25` |
| Products | | Account Engine ($10,000 setup + $1,000/mo), Account Engine Pro ($15,000 setup + $2,500/mo) |
| First post | | "New: the Account Engine. Your market, researched every night." linking to `/services/account-engine` |
| Q&A (seed) | | "What does Simpl do?", "Who is the Account Engine for?", "How much does it cost?" answered with the FAQ copy |

## 9. Removed and redirected (301)

| Old URL | New URL | Why |
|---|---|---|
| `/start` | `/pricing` | Old Core/Team/Pro tier grid, dead offer |
| `/how-it-works` | `/services/account-engine` | The process now lives on the pillar page |
| `/services/quick-wins` | `/free-tools` | It was the scan triage; the free tools page is its home |
| `/services/organic-growth` | `/services/local-seo` | Folded into SEO & AI search |
| `/services/strategy` | `/services` | Fractional CMO retired as a standalone offer |
| `/services/ai-quoting-agent` | `/services/ai-receptionist` | Same product line, renamed for B2B |
| `/performance` | `/free-tools` | Re-pointed so the old chain ends in one hop |
| `/discoverability`, `/reputation` | `/services/local-seo` | Unchanged |
| `/spend` | `/services/paid-ads` | Unchanged |
| `/what-am-i-missing` | `/start-now` | Unchanged |

`/success-stories` stays noindexed. All 18 existing blog posts stay (they still rank for the local work we sell as add-ons).

## 10. Before this ships (needs Matt)

- Permission to name Noovis and Sentrics (until then: anonymized).
- Real portal screenshots (blurred where needed) to replace the coded mock.
- One quote from a portal user, and the first closed deal the engine sourced.
- Confirm prices on the site match the deck ($10,000 + $1,000/mo; $15,000 + $2,500/mo).
- Dates for the "rolling out" items (CRM, AI receptionist, Ask your engine).
- Real photos for the new blog posts (coded covers for now).
- GBP changes in section 8.
