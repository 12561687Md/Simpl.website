# Simpl Design System (official)

*Codified 2026-07-23 from the shipped homepage. This is the single source of truth for how every page on simpl.pro looks, reads, and flows. No page gets its own one-off design decisions: if a page deviates from this file, the page is wrong, not the file. If the standard itself changes, change it HERE first, then propagate.*

**Benchmark:** Owner.com's site raised the bar for a services company selling to non-technical owners. Ours targets the same clarity with a broader ICP (all local service businesses). Dark, cinematic, data-backed, zero fluff. Every section either builds trust or pushes to the form/scan. Nothing else earns a slot.

---

## 1. Tokens (from `app/globals.css`, never hardcode values that exist here)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0C0D` | page base (near-black) |
| `--bg-soft` | `#131517` | section bands / raised regions |
| `--bg-elev` | `#1B1E21` | cards, panels, dropdowns |
| `--bg-elev-2` | `#24282C` | card hover / nested surfaces |
| `--fg` | `#F3F2ED` | headings, primary text (reads as white) |
| `--muted` | `#ADACA7` | body copy, secondary |
| `--fg-dim` | `#78766F` | captions, tertiary |
| `--rule` | `#262829` | decorative hairlines, card borders |
| `--rule-strong` | `#3A3E41` | interactive-control borders |
| `--accent` | `#89CFF0` | baby blue: links, highlights, active nav |
| `--accent-dim` | `#5AB4DE` | pressed states |
| `--accent-soft` | `rgba(137,207,240,0.14)` | tinted fills |
| `--accent-line` | `rgba(137,207,240,0.34)` | tinted borders |
| `--accent-ink` | `#081420` | text ON accent fills |
| `--ok` | `#34A853` | passing/positive ONLY (never decorative) |

Fonts: Inter (default, `var(--font-inter)`), mono for labels/microcopy via `.mono` class. Logo glyph stays all-caps visually; brand is written **Simpl** everywhere else.

## 2. Layout grammar

- **Content column:** `maxWidth: 1120, margin: "0 auto", padding: "0 32px"` (860 for long-form prose pages like FAQ/blog/legal).
- **Section rhythm:** `padding: "96px 32px"` desktop bands; hero pages start `~140px` top (clears the fixed 92px header).
- **Bands:** alternate `--bg` and `--bg-soft` with `borderTop/Bottom: 1px solid var(--rule)`. Never two soft bands adjacent.
- **Cards:** `background: var(--bg-elev); border: 1px solid var(--rule); borderRadius: 12`. Grids gap-1 over `--rule` background for the hairline-grid look (see FAQ/paid-ads).
- **The one accent moment:** each page gets at most ONE accent-tinted feature card/moment (like the homepage score copy card). More than one per page dilutes it.

## 3. Type scale

| Role | Spec |
|---|---|
| Page H1 | `clamp(34px, 5.5vw, 56px)`, weight 500, lineHeight 1.08, letterSpacing -0.025em; hero H1 up to `clamp(36px, 5.6vw, 68px)`, weight 600 |
| H1 second line | same size, `color: var(--muted)` (the two-tone headline is a house signature) |
| Section H2 | `clamp(24px, 3.5vw, 40px)`, weight 400, lineHeight 1.15, letterSpacing -0.02em |
| Card H3 | 18-18.5px, weight 500-600 |
| Body | 15-17px, lineHeight 1.55-1.65, `color: var(--muted)` |
| Eyebrow label | `.mono`, fontSize 11, letterSpacing 0.18em, uppercase, `--muted`, marginBottom 24-32. EVERY section opens with one. |
| Microcopy | `.mono`, 10-12.5px, letterSpacing 0.06-0.14em |

## 4. Motion (Motion/framer-motion v12 + Lenis; NO GSAP)

- `transform` + `opacity` only. Everything respects `prefers-reduced-motion`.
- Scroll reveals via `ScrollReveal.tsx` primitives: `SlideIn` (supports `from="bottom"|"top"`, `distance`, `duration`), `WiggleIn` (`loop` for continuous jingle, used sparingly, icons only).
- Standard reveal: fade + 20-40px rise, 0.45-0.6s, stagger 0.1s children, `viewport={{ once: true, margin: "-60px" }}`.
- Hover: cards lift `translateY(-4px)` + shadow; buttons scale 1.02 hover / 0.98 press.
- One "wow" element per page maximum (homepage: starfield + curved hero). Inner pages inherit the shared `SpaceField`; do not add new heavy canvases.

## 5. Copy voice (from `.agents/product-marketing.md` in Simpl.master, enforced here)

1. **No em-dashes ever.** Commas, colons, parentheses.
2. **No prices anywhere.** Pricing is a sales-call conversation. CTAs push `/start-now` (form), `/scan` (free scan), or the free strategy call. `/start` stays noindexed in reserve.
3. **Promise-based CTAs:** "Find what's broken", "Get your build quote, free", "See what you're missing". Never "Submit", "Learn more", "Get started".
4. **"win / winning" is the house verb.** Never dilute to improve/optimize where win fits.
5. **"team" never "agents".** Never sell AI delivery; sell leads, calls, jobs, time back.
6. **Cost-of-inaction framing** in every service pitch: what staying broken costs.
7. **Open/close loops:** every page teases one adjacent thing (related service, the scan, the blog answer).
8. **Two-tone H1s:** first line the promise, muted second line the twist/qualifier.
9. **Diagnosis before prescription:** we never pitch a fix without referencing what the scan finds.
10. No exclamation points, no hype adjectives, no "delve/unlock/synergy".

## 6. Page template (what every non-homepage page follows)

1. **Hero:** eyebrow label → two-tone H1 → 1-2 sentence sub (17-19px muted, maxWidth 680) → primary CTA + ghost secondary. Top padding ~140px.
2. **Proof/diagnosis band** (`--bg-soft`): the data, the problem, the receipts. Real numbers only.
3. **Body sections** on `--bg`, alternating bands as needed, hairline-grid cards for lists.
4. **The one accent moment**: a tinted card carrying the sharpest claim on the page.
5. **FAQ block** where questions exist (grid of `--bg` cells over `--rule`, FAQPage schema derived from the same array as the render).
6. **Closing CTA band:** restate the promise, one primary CTA to `/start-now` or `/scan`, mono reassurance line under it ("Real people reply the same business day." / "No credit card. 60 seconds.").
7. **Schema:** every page ships JSON-LD matching its content (Service, FAQPage, BreadcrumbList, ContactPage as applicable) and updates in the same commit as any content change.

## 7. Shared components (reuse, don't reinvent)

`Header`, `Footer`, `FloatingCTA` (reads "Free audit"), `ScanTool`, `ScanReport`, `ScrollReveal` (SlideIn/WiggleIn), `SpaceField`, `ServicePage` (the service-page shell: all 6 service pages render through it, fix it once, all six inherit), `ContactForm`, `TrustStats`, `Marquee`, `AuditDemo` (homepage only, heavy).

## 8. Current page inventory + status vs this standard (audited 2026-07-23)

| Page | Status | Notes |
|---|---|---|
| `/` homepage | ✅ the reference | overhauled 2026-07-21/22 |
| `/faq` | ✅ compliant | rewritten 2026-07-23 (16 AEO questions, schema, breadcrumbs) |
| `/blog` + posts | ✅ content compliant | 6 AEO posts, sources verified; check index page styling against §6 |
| `/start-now` | 🔶 near | de-priced; verify hero/eyebrow/CTA band match §6 |
| `/services/*` (6) | 🔶 shell-level pass needed | all render via `ServicePage.tsx`: verify template order, accent moment, closing CTA band, per-service FAQ+schema |
| `/about` | 🔶 needs pass | founder/mission moved to homepage; page must not duplicate it stale |
| `/how-it-works` | 🔶 needs pass | must mirror the real scan → report → call → fix flow and current report design |
| `/scan` | 🔶 needs pass | align copy with hero scan promise, no stale claims |
| `/results` | 🔶 needs pass | check post-scan CTAs, styling vs §6 |
| `/success-stories` | ⚠️ trust risk | zero signed clients: page must not imply results we don't have (launch-gate rule); consider "first story" framing only |
| `/start` | 🅿 in reserve | noindexed, unlinked; do not restyle until pricing returns |
| `/privacy`, `/terms` | ✅ legal | de-priced 2026-07-23; style light-touch only |
| `/audit` | 🔶 flow-critical | the live scan flow; any styling pass must not break ScanGate/report |

**Known cross-page debts:** "Trusted by experts" claim still live (not literally true); FAQ answer "the whole reason the pricing looks the way it does" reads odd post-de-pricing.
