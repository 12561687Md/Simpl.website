"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import type { Finding, PlaceDetails, ScanResult, SerpBoard, SerpSnapshot, KeywordOpportunity } from "../lib/scan-types";

/**
 * Document-style audit report, rebuilt to match the Noovis Digital Presence
 * Audit reference (docs/... the artifact Matt built by hand) section for
 * section: masthead, then nine numbered sections ending in a scope/next-step
 * callout, each with a "how to fix / why it matters" dropdown at the close.
 *
 * Own type system (--font-report-display/body/mono, loaded in layout.tsx)
 * rather than the site's Inter/JetBrains pairing, the reference's Space
 * Grotesk + IBM Plex trio, on purpose: this is a distinct deliverable
 * document, not another marketing page, same as the artifact was a
 * standalone file.
 *
 * Where the reference had data this scan doesn't produce (published search
 * volume + rank position from DataForSEO, named competitor teardown, past
 * client case studies), the section keeps the reference's exact visual
 * structure but is sourced from what this scan actually has: real on-page/
 * crawlability findings, real reviews, real category grades. Nothing here
 * is an invented number. See the section-05 note for the one open gap
 * (DataForSEO isn't wired into the free scan path yet).
 */

const display = { fontFamily: "var(--font-report-display), var(--font-inter), sans-serif" };
const body = { fontFamily: "var(--font-report-body), var(--font-inter), sans-serif" };
const rmono = { fontFamily: "var(--font-report-mono), var(--font-jetbrains-mono), monospace" };

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function gradeColor(grade: string | undefined) {
  if (!grade || grade === "N/A") return "#8A8D8C";
  if (grade.startsWith("A") || grade.startsWith("B")) return "var(--ok)";
  if (grade.startsWith("C")) return "#E0A852";
  return "#E05252";
}
function gradeStatusWord(grade: string | undefined) {
  if (!grade || grade === "N/A") return "Not applicable";
  if (grade.startsWith("A")) return "Strong";
  if (grade.startsWith("B")) return "Solid";
  if (grade.startsWith("C")) return "Needs work";
  if (grade.startsWith("D")) return "Poor";
  // "Failing," never "Critical": a failing category grade is a different thing
  // from a critical *finding* (a specific severity the count reports). Reusing
  // "Critical" here made a category with only warning-level findings contradict
  // the honest "0 critical findings" the KPI card shows.
  return "Failing";
}

const GRADE_RANK: Record<string, number> = { F: 0, D: 1, "D-": 1, "D+": 1, C: 2, "C-": 2, "C+": 2, B: 3, "B-": 3, "B+": 3, A: 4, "A-": 4 };
function gradeRank(grade: string | undefined) {
  if (!grade || grade === "N/A") return 5;
  return GRADE_RANK[grade] ?? 2;
}
function gradeScore100(grade: string | undefined) {
  const g = (grade ?? "").charAt(0);
  return g === "A" ? 92 : g === "B" ? 78 : g === "C" ? 58 : g === "D" ? 34 : 15;
}

const CATEGORY_SHORT: Record<string, string> = {
  "Website Foundation": "Website",
  "Content & Pages": "Content",
  "On-Page SEO": "SEO",
  "Social Presence": "Social",
  "Google Business Profile": "GBP",
  Crawlability: "Crawlability",
};

interface CategoryGroup {
  name: string;
  grade: string;
  pct: number;
  findings: Finding[];
}

function SectionHead({ n, title, lead }: { n?: string; title: string; lead?: string }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: lead ? 12 : 0 }}>
        {n && <span style={{ ...rmono, fontSize: 12, fontWeight: 600, color: "var(--accent-dim, var(--accent))", letterSpacing: "0.1em" }}>{n}</span>}
        <h2 style={{ ...display, margin: 0, fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      {lead && <p style={{ ...body, color: "var(--ink-2, var(--muted))", fontSize: 15.5, maxWidth: "64ch", margin: 0, lineHeight: 1.6 }}>{lead}</p>}
    </div>
  );
}

/** The "how to fix this / why it matters" dropdown every section closes on. */
function SectionFix({ title, points }: { title: string; points: string[] }) {
  return (
    <details style={{ marginTop: 26, border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", overflow: "hidden" }}>
      <summary
        style={{
          ...rmono,
          cursor: "pointer",
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "13px 18px",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        {title}
        <span aria-hidden="true" style={{ fontSize: 15, flexShrink: 0 }}>+</span>
      </summary>
      <ul style={{ margin: 0, padding: "2px 18px 18px 34px", display: "grid", gap: 8 }}>
        {points.map((p, i) => (
          <li key={i} style={{ ...body, fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>
            {p}
          </li>
        ))}
      </ul>
    </details>
  );
}

function FindingRow({ f, index }: { f: Finding; index: number }) {
  const reduce = useReducedMotion();
  const color = f.severity === "critical" ? "#E05252" : f.severity === "warning" ? "#E0A852" : "var(--muted)";
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: Math.min(0.1 + index * 0.03, 0.9) }}
      style={{
        borderLeft: `3px solid ${color}`,
        background: f.severity === "critical" ? "rgba(224,82,82,0.05)" : "transparent",
        padding: "12px 16px 13px",
        marginBottom: 8,
        borderRadius: "0 4px 4px 0",
      }}
    >
      <div style={{ ...body, fontSize: 14.5, lineHeight: 1.45, fontWeight: 500 }}>{f.title}</div>
      {f.fix && (
        <div style={{ marginTop: 6, display: "flex", gap: 7, alignItems: "baseline" }}>
          <span style={{ ...rmono, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", flexShrink: 0 }}>Fix</span>
          <span style={{ ...body, fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>{f.fix}</span>
        </div>
      )}
    </motion.div>
  );
}

/** width:X% track + fill, used by the presence bar chart and search-volume bars. */
function Track({ pct, color }: { pct: number; color: string }) {
  return (
    <span style={{ height: 20, background: "var(--bg-elev, var(--bg-soft))", borderRadius: 5, overflow: "hidden", position: "relative", display: "block" }}>
      <span style={{ position: "absolute", inset: 0, right: "auto", width: `${pct}%`, display: "block", borderRadius: 5, background: color }} />
    </span>
  );
}

function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ ...rmono, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", whiteSpace: "nowrap", color }}>
      <span style={{ width: 7, height: 7, borderRadius: 99, background: color, flexShrink: 0 }} />
      {children}
    </span>
  );
}

/** One keyword's live SERP: a collapsible row showing the real Google Maps
 *  pack and organic results a searcher sees, with the business highlighted.
 *  This is the Owner.com "how you're doing online" board, every row real,
 *  location-accurate, pulled live at scan time. */
function SerpBoardRow({ snap }: { snap: SerpSnapshot }) {
  const topMap = snap.maps.find((m) => !m.is_you && m.rank === Math.min(...snap.maps.filter((x) => x.rank != null).map((x) => x.rank as number)));
  const youMaps = snap.your_maps_rank;
  return (
    <details style={{ borderBottom: "1px solid var(--rule)" }}>
      <summary
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "13px 16px",
          cursor: "pointer",
          listStyle: "none",
          flexWrap: "wrap",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-2 3.2-4.9 3.2-7.9Z" />
          <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.2 1-3.6 1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.3a11 11 0 0 0 0 9.8L6 14.3Z" />
          <path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.3L6 10.1c.9-2.6 3.2-4.7 6-4.7Z" />
        </svg>
        <span style={{ ...display, fontWeight: 600, fontSize: 14.5, flex: "1 1 200px" }}>{snap.keyword}</span>
        <span
          style={{
            ...rmono,
            fontSize: 10.5,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 99,
            color: youMaps && youMaps <= 3 ? "var(--ok)" : "#E05252",
            background: youMaps && youMaps <= 3 ? "rgba(52,168,83,0.12)" : "rgba(224,82,82,0.12)",
            whiteSpace: "nowrap",
          }}
        >
          {youMaps ? `You're #${youMaps} in Maps` : "You're unranked"}
        </span>
        {topMap?.title && (
          <span style={{ ...rmono, fontSize: 10.5, color: "var(--muted)", whiteSpace: "nowrap" }}>
            #1: {topMap.title}
          </span>
        )}
        <span aria-hidden="true" style={{ ...rmono, fontSize: 14, color: "var(--accent)" }}>+</span>
      </summary>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "4px 16px 18px" }} className="grid-audit-serp">
        {/* Maps pack, the results that get the clicks */}
        <div>
          <div style={{ ...rmono, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 9 }}>
            Google Maps · top 3
          </div>
          <div style={{ display: "grid", gap: 7 }}>
            {snap.maps.length > 0 ? snap.maps.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, padding: "6px 9px", borderRadius: 6, background: m.is_you ? "rgba(137,207,240,0.1)" : "transparent", border: m.is_you ? "1px solid var(--accent)" : "1px solid transparent" }}>
                <span style={{ ...rmono, fontSize: 11, color: "var(--muted)", width: 16 }}>#{m.rank}</span>
                <span style={{ flex: 1, fontWeight: m.is_you ? 700 : 500, color: m.is_you ? "var(--accent)" : "var(--fg)" }}>{m.title}{m.is_you ? " (you)" : ""}</span>
                {m.rating != null && <span style={{ ...rmono, fontSize: 11, color: "#E0A852" }}>★{m.rating.toFixed(1)}</span>}
              </div>
            )) : <div style={{ fontSize: 12.5, color: "var(--muted)" }}>No local pack for this term.</div>}
          </div>
        </div>
        {/* Organic, the classic blue links */}
        <div>
          <div style={{ ...rmono, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 9 }}>
            Google Search · {snap.your_organic_rank ? `you're #${snap.your_organic_rank}` : "you're unranked"}
          </div>
          <div style={{ display: "grid", gap: 7 }}>
            {snap.organic.length > 0 ? snap.organic.slice(0, 5).map((o, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, padding: "5px 9px", borderRadius: 6, background: o.is_you ? "rgba(137,207,240,0.1)" : "transparent", border: o.is_you ? "1px solid var(--accent)" : "1px solid transparent" }}>
                <span style={{ ...rmono, fontSize: 11, color: "var(--muted)", width: 16 }}>#{o.rank}</span>
                <span style={{ flex: 1, color: o.is_you ? "var(--accent)" : "var(--muted)", fontWeight: o.is_you ? 700 : 400 }}>{o.domain}{o.is_you ? " (you)" : ""}</span>
              </div>
            )) : <div style={{ fontSize: 12.5, color: "var(--muted)" }}>No organic results captured.</div>}
          </div>
        </div>
      </div>
    </details>
  );
}

/** The whole "how you're doing online" board: a loading state while the slow
 *  SERP endpoint runs, then the real per-keyword snapshots, then a keyword-
 *  opportunity table. Honest "not available" when the board can't be built. */
function SerpBoard({
  loading,
  snapshots,
  opportunities,
  location,
}: {
  loading: boolean;
  snapshots: SerpSnapshot[];
  opportunities: KeywordOpportunity[];
  location?: string;
}) {
  if (loading) {
    return (
      <div style={{ border: "1px solid var(--rule)", borderRadius: 10, background: "var(--bg-soft)", padding: "28px 22px", textAlign: "center" }}>
        <div className="serp-pulse" style={{ ...rmono, fontSize: 12.5, color: "var(--accent)", letterSpacing: "0.04em" }}>
          Pulling your live search results…
        </div>
        <div style={{ ...rmono, fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
          Running your real Google Maps + Search rankings against your competitors, keyword by keyword.
        </div>
      </div>
    );
  }
  if (snapshots.length === 0) {
    return (
      <div style={{ border: "1px solid var(--rule)", borderRadius: 10, background: "var(--bg-soft)", padding: "20px 22px" }}>
        <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
          No competitive search board yet, this business doesn&apos;t rank for enough non-branded local terms to build one.
          That&apos;s itself the finding: you&apos;re invisible for the searches that bring new customers, only findable if
          someone already knows your name.
        </p>
      </div>
    );
  }
  return (
    <>
      <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
        {snapshots.map((s) => <SerpBoardRow key={s.keyword} snap={s} />)}
      </div>
      {/* Reference-point transparency: local rankings genuinely shift with the
          searcher's exact location, so we say plainly where these were measured
          from. Preempts "these don't match what I see", a customer three towns
          over sees a different pack, and that's expected, not an error. */}
      <p style={{ ...rmono, fontSize: 10.5, color: "var(--faint, var(--muted))", letterSpacing: "0.02em", marginTop: 12, lineHeight: 1.6 }}>
        Live Google Maps + Search results{location ? `, as a customer searching from ${location} sees them` : ""}. Local
        rankings shift with the searcher&apos;s exact location, your own view varies, this is the reference point.
      </p>
      {opportunities.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <div style={{ ...rmono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            Keywords you could own · real Google Keyword Planner volume
          </div>
          <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ ...rmono, display: "grid", gridTemplateColumns: "2fr 130px 110px", gap: 12, padding: "11px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}>
              <span>Keyword</span>
              <span>Monthly searches</span>
              <span>Competition</span>
            </div>
            {opportunities.map((o, i) => (
              <div key={`${o.keyword}-${i}`} style={{ display: "grid", gridTemplateColumns: "2fr 130px 110px", gap: 12, padding: "12px 16px", fontSize: 13.5, borderBottom: i < opportunities.length - 1 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
                <span style={{ ...display, fontWeight: 600 }}>{o.keyword}</span>
                <span style={{ ...rmono, color: "var(--fg)" }}>{o.search_volume != null ? o.search_volume.toLocaleString() : "—"}</span>
                <span style={{ ...rmono, fontSize: 11.5, color: o.competition === "HIGH" ? "#E05252" : o.competition === "MEDIUM" ? "#E0A852" : "var(--ok)" }}>
                  {o.competition ? o.competition.charAt(0) + o.competition.slice(1).toLowerCase() : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Box({ label, hi, children }: { label?: string; hi?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${hi ? "var(--accent)" : "var(--rule)"}`, borderRadius: 10, background: "var(--bg-soft)", padding: "22px 24px" }}>
      {label && (
        <h3 style={{ ...rmono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: hi ? "var(--accent)" : "var(--muted)", margin: "0 0 14px" }}>{label}</h3>
      )}
      {children}
    </div>
  );
}

export default function ScanReport({
  place,
  result,
  board = null,
  teaser = false,
}: {
  place: PlaceDetails;
  result: ScanResult;
  /** Live-SERP board, loaded on its own track. null = still loading. */
  board?: SerpBoard | null;
  teaser?: boolean;
}) {
  const reduce = useReducedMotion();
  const pct = result.percentage ?? result.score ?? 0;
  const businessName = place.name ?? result.business?.name ?? "Your Business";
  const photos = place.photos ?? [];

  const categoryEntries = Object.entries(result.categories ?? {});
  const groups: CategoryGroup[] = categoryEntries
    .map(([name, data]) => ({
      name,
      grade: data.grade,
      pct: data.max ? Math.round(((data.score ?? 0) / data.max) * 100) : gradeScore100(data.grade),
      findings: (result.findings ?? []).filter((f) => f.category === name),
    }))
    .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade));
  const strong = groups.filter((g) => gradeRank(g.grade) >= 3);
  const weak = groups.filter((g) => gradeRank(g.grade) < 3).sort((a, b) => a.pct - b.pct);

  const gbp = groups.find((g) => g.name === "Google Business Profile");
  const reviews = (place.reviews ?? []).slice(0, 2);
  // Reputation is only a "finding" when it's genuinely thin. Strong reviews
  // don't get a section calling them a problem (see section 06).
  const reviewsWeak =
    place.rating == null || place.rating < 4.2 || place.reviewCount == null || place.reviewCount < 20;
  const competitorCount =
    result.search?.available && result.search.competitors ? result.search.competitors.length : null;

  // Live-SERP board: null while its slower endpoint is still loading, then
  // either real snapshots or an unavailable state. Drives the "how you're
  // doing online" section and the opportunity-keywords table.
  const boardLoading = board === null;
  const boardSnapshots = board?.available && board.snapshots ? board.snapshots : [];
  const opportunityKeywords = board?.available && board.keyword_ideas ? board.keyword_ideas : [];
  const profile = place.profile;

  // Profile-completeness checks, every signal Google's API actually lets us
  // verify off the live listing. Present = green check, missing = red gap, and
  // the gaps are the finding. Only signals whose ABSENCE from the API truly
  // means absence on the listing are here. Deliberately NOT checked, because the
  // Places API doesn't expose them (so a blank would be a false ✗ on a business
  // that actually has them, exactly the Sidekick case): the owner-written "From
  // the business" description (the API only returns Google's rare editorial
  // summary, not the owner's), the GBP Products/Services list (the API's
  // `attributes` are restaurant-style service options like dine-in, not a
  // service business's product cards), and posts / the booking-CTA button /
  // organic sitelinks. These render as a two-column scorecard inside the LEFT
  // GBP box; the right box shows the real profile content instead.
  const gbpChecks: [string, boolean][] = [
    ["Business hours", (profile?.hours?.length ?? 0) > 0],
    ["Physical address", Boolean(place.address)],
    ["Phone number", Boolean(place.phone)],
    ["Website linked", Boolean(place.website)],
    ["Primary category", Boolean(profile?.primaryType)],
    ["Price level", Boolean(profile?.priceLevel)],
    ["Photos uploaded", photos.length > 0],
    ["25+ reviews", (place.reviewCount ?? 0) >= 25],
  ];

  // The real local-pack competitors, aggregated across every keyword board:
  // the named businesses (with their star ratings) that outrank this business
  // in at least one local search. This is the Owner.com "you're ranking below
  // N competitors" list, every name and rating is real off the live Maps
  // results, deduped, ranked by how high and how often they beat the business.
  const localCompetitors = (() => {
    const agg = new Map<string, { name: string; rating: number | null; bestRank: number | null; beats: boolean; count: number }>();
    for (const snap of boardSnapshots) {
      const you = snap.your_maps_rank; // null = unranked here, so everyone beats you
      for (const m of snap.maps) {
        if (m.is_you || !m.title) continue;
        const e = agg.get(m.title) ?? { name: m.title, rating: null, bestRank: null, beats: false, count: 0 };
        e.count += 1;
        if (e.rating == null && m.rating != null) e.rating = m.rating;
        if (m.rank != null && (e.bestRank == null || m.rank < e.bestRank)) e.bestRank = m.rank;
        if (you == null || (m.rank != null && m.rank < you)) e.beats = true;
        agg.set(m.title, e);
      }
    }
    return [...agg.values()]
      .filter((c) => c.beats)
      .sort((a, b) => (a.bestRank ?? 99) - (b.bestRank ?? 99) || b.count - a.count);
  })();

  // The "you could be winning an extra ~$X/month" headline stat (gain-framed
  // per the 2026-07-23 psychology reversal: sell the upside, not the loss).
  // Labeled and grounded, not fabricated: the count of issues is real
  // (critical + warning findings from this exact scan); the per-issue dollar
  // value is a documented, conservative estimate of a single missed/mishandled
  // local-service lead, used only to size the figure. It's never presented as a
  // measurement of this business's actual traffic or revenue, hence "~" and
  // "estimated" in the copy around it.
  const totalIssues = result.critical_count + result.warning_count;
  const ISSUE_IMPACT_ESTIMATE = 285;
  const estimatedMonthlyImpact = totalIssues > 0 ? Math.round((totalIssues * ISSUE_IMPACT_ESTIMATE) / 10) * 10 : 0;
  const heroFindings = (result.findings ?? [])
    .filter((f) => f.severity === "critical" || f.severity === "warning")
    .sort((a, b) => (a.severity === "critical" ? 0 : 1) - (b.severity === "critical" ? 0 : 1))
    .slice(0, 4);

  // Real counts only, everywhere. The old code escalated warnings into a
  // "critical" number when critical_count was 0 (to avoid showing a zero),
  // but that contradicted the real "0 critical" shown elsewhere and read as
  // fabrication. `criticalCount` is the true critical count; the "costing you
  // leads" framing uses `totalIssues` (critical + warning) and is labeled
  // "issues," never "critical," so warnings are never dressed up as criticals.
  const criticalCount = result.critical_count;

  // Teaser gate: section 03 opens the two worst channels' findings as the hook;
  // every channel past those (index >= 2) is blurred, and sections 04+ are
  // gated whole. hiddenFindingCount = the findings sitting behind the gate, for
  // the "+N more unlock with your report" nudge.
  const hiddenFindingCount = teaser
    ? groups.slice(2).reduce((n, g) => n + g.findings.length, 0)
    : 0;

  const gatedStyle = teaser ? ({ filter: "blur(6px)", userSelect: "none" as const, pointerEvents: "none" as const }) : {};

  return (
    <div style={{ ...body, maxWidth: 900, margin: "0 auto" }}>
      {/* Masthead */}
      <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 30, marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          {/* The full wordmark, not inverted: `inverted` inks the pulse for
              light surfaces, and on this dark page it vanished, leaving
              just the dot, which read as ". Simpl". Sized up from 24, this
              is the masthead of a document, the logo carries the page. */}
          <SimplWordmark size={34} />
          <div style={{ ...rmono, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)", textAlign: "right", lineHeight: 1.9 }}>
            <div><span style={{ color: "var(--fg)" }}>Prepared for</span> {businessName}{place.address ? ` · ${place.address}` : ""}</div>
            <div><span style={{ color: "var(--fg)" }}>Report</span> Digital Presence &amp; Positioning Audit</div>
          </div>
        </div>
        {/* The title slot is a CTA instead of a headline: someone who's already
            convinced can convert straight from the top without scrolling to the
            bottom of the report. The report is still identified by the "Report:
            Digital Presence & Positioning Audit" line above. Promise-based CTA,
            leads to the booking/contact form at /start-now. */}
        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            border: "1px solid var(--accent)",
            borderRadius: 14,
            background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
            padding: "clamp(20px, 3vw, 30px)",
            boxShadow: "0 24px 70px -44px var(--accent)",
          }}
        >
          <div style={{ minWidth: 260, flex: "1 1 340px" }}>
            <h1 style={{ ...display, fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.08, margin: 0 }}>
              {totalIssues > 0
                ? `Fix the ${totalIssues} issue${totalIssues === 1 ? "" : "s"} costing ${businessName} leads.`
                : `Let's get ${businessName} ranking where your competitors are.`}
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "clamp(14px, 1.5vw, 16px)", margin: "12px 0 0", lineHeight: 1.5, maxWidth: "52ch" }}>
              We&apos;ll fix everything in this report in priority order and get you found where customers are searching.
              Start now, or book a free call first, no pitch attached.
            </p>
          </div>
          <a
            href="/start-now"
            className="cta-primary"
            style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", color: "var(--accent-ink)", padding: "15px 26px", fontSize: 15, fontWeight: 700, borderRadius: 7, textDecoration: "none", flexShrink: 0 }}
          >
            Fix these issues now →
          </a>
        </div>
      </div>

      {/* Real photos off the listing, up front, color and proof before a
          single number shows up. Same treatment as the theater carousel
          (thin accent-blue frame, cover-fit, no gaps) so the report and the
          scan read as one system. */}
      {photos.length > 0 && (
        <div style={{ display: "flex", gap: 12, marginBottom: 48, overflowX: "auto", paddingBottom: 2 }}>
          {photos.slice(0, 4).map((src, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 0",
                minWidth: 130,
                aspectRatio: "4 / 3",
                borderRadius: 10,
                overflow: "hidden",
                border: "1.5px solid var(--accent)",
                boxShadow: "0 14px 32px -20px rgba(0,0,0,0.55)",
              }}
            >
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}

      {/* Hero impact, the first thing after the masthead, on purpose. The
          nine numbered sections below restate all of this in more depth,
          but urgency has to land in the first few seconds or it never
          lands at all. Both figures are grounded in real data from this
          scan: the dollar estimate is sized off the real critical+warning
          count (never a source-less number, see the comment above
          `estimatedMonthlyImpact`), and the market-position box names the real
          local-pack competitors (with their real star ratings) that outrank
          this business, aggregated live from the SERP board. Ungated on
          purpose: the named competitors beating you are the sharpest hook we
          have, same as Owner.com leads with them. */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 52 }} className="grid-audit-hero">
        <Box hi>
          <div style={{ ...rmono, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            Estimated upside
          </div>
          {totalIssues > 0 ? (
            <>
              <div style={{ ...display, fontSize: "clamp(30px, 4.2vw, 42px)", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
                +~${estimatedMonthlyImpact.toLocaleString()}
                <span style={{ fontSize: "0.4em", color: "var(--muted)", fontWeight: 600 }}>/mo</span>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "10px 0 16px", lineHeight: 1.5 }}>
                You could be winning an extra ~${estimatedMonthlyImpact.toLocaleString()} a month by turning {totalIssues} {totalIssues === 1 ? "opportunity" : "opportunities"} from this scan into wins.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {heroFindings.map((f, i) => (
                  <div key={`${f.title}-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "var(--ink-2, var(--muted))" }}>
                    <span aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0, fontSize: 12, marginTop: 1, fontWeight: 700 }}>→</span>
                    <span>{f.title}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...display, fontSize: "clamp(30px, 4.2vw, 42px)", fontWeight: 700, color: "var(--ok)", lineHeight: 1 }}>Ahead of the pack</div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "10px 0 0", lineHeight: 1.5 }}>
                Nothing critical found on this scan, that&apos;s rare. You&apos;re already ahead of most businesses we scan.
              </p>
            </>
          )}
        </Box>
        <Box hi>
          <div style={{ ...rmono, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            Market position
          </div>
          {localCompetitors.length > 0 ? (
            <>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)", margin: "0 0 14px", lineHeight: 1.35 }}>
                You&apos;re ranking below{" "}
                <span style={{ color: "#E05252" }}>{localCompetitors.length} competitor{localCompetitors.length === 1 ? "" : "s"}</span>{" "}
                in local search.
              </p>
              <div style={{ display: "grid", gap: 9 }}>
                {localCompetitors.slice(0, 5).map((c, i) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                    <span style={{ ...rmono, fontSize: 10.5, color: "var(--muted)", width: 26, flexShrink: 0 }}>{ordinal(i + 1)}</span>
                    <span style={{ flex: 1, fontWeight: 600, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                    {c.rating != null && (
                      <span style={{ ...rmono, fontSize: 12, color: "#E0A852", flexShrink: 0 }}>★ {c.rating.toFixed(1)}</span>
                    )}
                  </div>
                ))}
              </div>
              {localCompetitors.length > 5 && (
                <div style={{ ...rmono, fontSize: 10.5, color: "var(--muted)", marginTop: 10 }}>
                  +{localCompetitors.length - 5} more ranking above you
                </div>
              )}
            </>
          ) : boardLoading ? (
            <>
              <div className="serp-pulse" style={{ ...rmono, fontSize: 13, color: "var(--accent)", marginBottom: 8 }}>
                Checking who&apos;s ranking above you…
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                Running your local searches against every competitor in your market.
              </p>
            </>
          ) : competitorCount !== null && competitorCount > 0 ? (
            <>
              <div style={{ ...display, fontSize: "clamp(30px, 4.2vw, 42px)", fontWeight: 700, color: "#E05252", lineHeight: 1 }}>
                {competitorCount}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "10px 0 0", lineHeight: 1.5 }}>
                other business{competitorCount === 1 ? "" : "es"} are competing for your keywords online, per live search data.
              </p>
            </>
          ) : (
            <>
              <div style={{ ...display, fontSize: "clamp(30px, 4.2vw, 42px)", fontWeight: 700, color: "var(--ok)", lineHeight: 1 }}>Strong</div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "10px 0 0", lineHeight: 1.5 }}>
                No competitor is consistently outranking you in local search right now.
              </p>
            </>
          )}
        </Box>
      </div>

      {/* 01, Executive summary */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead n="01" title="Executive summary" />
        {result.total_checks != null && (
          <p style={{ ...display, fontSize: "clamp(17px, 2.4vw, 21px)", fontWeight: 600, margin: "0 0 20px", lineHeight: 1.35 }}>
            {result.total_checks} things reviewed,{" "}
            <span style={{ color: result.findings_count > 0 ? "#E05252" : "var(--ok)" }}>
              {result.findings_count} need{result.findings_count === 1 ? "s" : ""} work
            </span>
            .
          </p>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 32,
            alignItems: "center",
            background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
            border: "1px solid var(--rule)",
            borderRadius: 12,
            padding: 28,
          }}
          className="grid-audit-gauge"
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ ...display, fontSize: "clamp(52px, 8vw, 80px)", fontWeight: 700, lineHeight: 0.9, color: gradeColor(result.grade), letterSpacing: "-0.03em" }}>
              {pct}
            </div>
            <div style={{ ...rmono, fontSize: 11, color: "var(--muted)", marginTop: 6 }}>/ 100</div>
            <div style={{ ...rmono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginTop: 10 }}>
              Simpl Score
            </div>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ ...rmono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>What&apos;s working</div>
              <div style={{ ...display, fontWeight: 600, fontSize: 18, display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 9, height: 9, borderRadius: 99, background: "var(--ok)", flexShrink: 0 }} />
                {strong.length > 0 ? strong.map((g) => CATEGORY_SHORT[g.name] ?? g.name).join(", ") : "Nothing yet, that's the point"}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "8px 0 0", lineHeight: 1.5 }}>
                {strong.length > 0 ? "These are pulling their weight. Don't touch them." : "Every category needs attention. Start with the worst one."}
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ ...rmono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>What&apos;s not</div>
              <div style={{ ...display, fontWeight: 600, fontSize: 18, display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 9, height: 9, borderRadius: 99, background: "#E05252", flexShrink: 0 }} />
                {weak.length > 0 ? weak.map((g) => CATEGORY_SHORT[g.name] ?? g.name).join(", ") : "Nothing critical"}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "8px 0 0", lineHeight: 1.5 }}>
                A customer checking you out today runs into this before they run into anything good.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 20 }} className="grid-audit-kpis">
          <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "18px 18px" }}>
            <div style={{ ...display, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: criticalCount > 0 ? "#E05252" : "var(--ok)", lineHeight: 1 }}>{criticalCount}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>
              {criticalCount > 0
                ? `critical fix${criticalCount === 1 ? "" : "es"} that would win you leads right now`
                : "critical issues, none, nothing is actively broken"}
            </div>
          </div>
          <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "18px 18px" }}>
            <div style={{ ...display, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: "#E0A852", lineHeight: 1 }}>{result.warning_count}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>warning{result.warning_count === 1 ? "" : "s"} worth fixing soon</div>
          </div>
          <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "18px 18px" }}>
            <div style={{ ...display, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}>{result.findings_count}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>total findings across six categories</div>
          </div>
        </div>
        <SectionFix
          title="How to fix this"
          points={[
            weak.length > 0
              ? `Start with ${weak.map((g) => CATEGORY_SHORT[g.name] ?? g.name).join(", then ")}, that's your weak-to-strong order, and it's the order a customer runs into you in.`
              : "Every category is holding, the work now is keeping it there, not fixing a hole.",
            `You have ${result.critical_count} critical finding${result.critical_count === 1 ? "" : "s"} and ${result.warning_count} warning${result.warning_count === 1 ? "" : "s"}. A critical blocks a sale in progress; a warning slows one down, clear critical first, always.`,
            `Your score is ${pct}. It moves as fast as the fixes ship, rescan after each change to watch it climb.`,
          ]}
        />
      </section>

      {/* 02, Presence assessment */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead
          n="02"
          title="Presence assessment"
          lead="Each of the six categories graded 0 to 100 on completeness, accuracy, and visibility to a customer searching today."
        />
        <div style={{ display: "grid", gap: 14 }}>
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              style={{ display: "grid", gridTemplateColumns: "140px 1fr 40px", gap: 14, alignItems: "center" }}
              className="grid-audit-bar"
            >
              <span style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))" }}>{CATEGORY_SHORT[g.name] ?? g.name}</span>
              <span style={{ height: 20, background: "var(--bg-elev, var(--bg-soft))", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${g.pct}%` }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", inset: 0, right: "auto", display: "block", borderRadius: 5, background: gradeColor(g.grade) }}
                />
              </span>
              <span style={{ ...rmono, fontSize: 12, color: "var(--muted)", textAlign: "right" }}>{g.pct}</span>
            </motion.div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 40px", gap: 14, marginTop: 2 }}>
            <span />
            <span style={{ ...rmono, display: "flex", justifyContent: "space-between", fontSize: 9.5, color: "var(--faint, var(--muted))", letterSpacing: "0.08em" }}>
              <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
            </span>
            <span />
          </div>
        </div>
        <SectionFix
          title="How to fix this"
          points={[
            strong.length > 0 && weak.length > 0
              ? `The gap between your best (${CATEGORY_SHORT[strong[0].name] ?? strong[0].name}, ${strong[0].pct}) and your worst (${CATEGORY_SHORT[weak[0].name] ?? weak[0].name}, ${weak[0].pct}) is exactly what a customer notices when they cross-check you across channels.`
              : "The gap between your best and worst channel is exactly what a customer notices when they cross-check you.",
            "One strong channel doesn't cover for a weak one, a customer who lands on a good website then finds a dead Google profile hesitates anyway.",
            weak.length > 0
              ? `Aim for no channel below a C. Right now ${weak.length} ${weak.length === 1 ? "is" : "are"} dragging the whole score down disproportionately.`
              : "Aim to keep every channel at a C or better, a single critical category drags the whole score down disproportionately.",
          ]}
        />
      </section>

      {/* 03, Findings by channel. The single home for every finding: one per
          category, grouped, worst-first, each category collapsible so the
          section is short by default and deep on demand. This replaces the old
          thin diagnostics table AND the separate "findings in full" dump that
          made the report twice as long, nothing is listed twice now. */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead
          n="03"
          title="Findings by channel"
          lead="Every issue this scan found, grouped by the channel it lives on, worst grade first. Open any channel for the full list and how to fix each one."
        />
        <div style={{ display: "grid", gap: 10 }}>
          {groups.map((g, gi) => {
            const gated = teaser && gi >= 2 && g.findings.length > 0;
            return (
              <details
                key={g.name}
                open={!teaser && gi < 2 && g.findings.length > 0}
                style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden", background: "var(--bg-soft)" }}
              >
                <summary
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: 12,
                    alignItems: "center",
                    padding: "14px 16px",
                    cursor: "pointer",
                    listStyle: "none",
                  }}
                >
                  <span style={{ ...display, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 10 }}>
                    {g.name}
                    <Pill color={gradeColor(g.grade)}>{gradeStatusWord(g.grade)}</Pill>
                  </span>
                  <span style={{ ...rmono, fontSize: 11.5, color: g.findings.length > 0 ? "#E0A852" : "var(--ok)" }}>
                    {g.findings.length > 0 ? `${g.findings.length} to fix` : "clean"}
                  </span>
                  <span aria-hidden="true" style={{ ...rmono, fontSize: 14, color: "var(--accent)" }}>+</span>
                </summary>
                <div style={{ padding: "0 16px 14px", ...(gated ? { filter: "blur(5px)", userSelect: "none" as const, pointerEvents: "none" as const } : {}) }}>
                  {g.findings.length > 0 ? (
                    g.findings.map((f, i) => <FindingRow key={`${g.name}-${f.title}-${i}`} f={f} index={i} />)
                  ) : (
                    <div style={{ fontSize: 13.5, color: "var(--muted)", padding: "4px 0 6px" }}>
                      Nothing wrong here, this channel is doing its job.
                    </div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
        {teaser && hiddenFindingCount > 0 && (
          <div style={{ ...rmono, fontSize: 12, fontWeight: 600, color: "var(--accent)", textAlign: "center", marginTop: 14 }}>
            +{hiddenFindingCount} more issue{hiddenFindingCount === 1 ? "" : "s"} unlock with your report
          </div>
        )}
        <SectionFix
          title="How to fix this"
          points={[
            weak.length > 0
              ? `Start with ${weak[0].name} (${weak[0].grade}), it's your lowest grade, and it's the channel actively costing you the most right now.`
              : "No channel is critical, keep every one from slipping by monitoring, not just fixing once.",
            `“Critical” findings are turning customers away today; “warning” findings slow them down. You have ${result.critical_count} critical and ${result.warning_count} warning, clear the critical ones first.`,
            "Presence decays quietly: a review goes unanswered, a page goes stale, hours drift out of date. Rescan after each fix to watch the grade move.",
          ]}
        />
      </section>

      {/* 04, Google Business Profile */}
      {gbp && (
        <section style={{ marginBottom: 52, ...gatedStyle }}>
          <SectionHead
            n="04"
            title="Google Business Profile"
            lead="The profile is the first thing a customer checks after a referral or a search. Right now it's either backing up what you actually do, or contradicting it."
          />
          {/* Two boxes with matching scaffolding, headline stat, divider,
              uppercase sublabel, content, so they read as a symmetric pair.
              LEFT = the completeness scorecard: review-count hero + the ✓/×
              signals in two columns (fills the box width). RIGHT = the real
              profile content Google shows a customer: listed category + status,
              then the live opening hours (and any service attributes). Left
              grades the listing, right shows what's on it. */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "stretch" }} className="grid-audit-gbp">
            <Box>
              <div style={{ ...display, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, lineHeight: 1, color: place.reviewCount && place.reviewCount >= 25 ? "var(--ok)" : "#E05252", letterSpacing: "-0.02em" }}>
                {place.reviewCount ?? 0} <span style={{ fontSize: "0.42em", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.02em" }}>reviews</span>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "11px 0 0", lineHeight: 1.4 }}>
                {place.rating ? `At a ${place.rating.toFixed(1)}-star average, this is` : "This is"} the entire public reputation you carry on Google.
              </p>
              <div style={{ borderTop: "1px solid var(--rule)", margin: "16px 0 12px" }} />
              <div style={{ ...rmono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                Profile completeness
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 20px" }} className="grid-gbp-checks">
                {gbpChecks.map(([label, ok]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, padding: "3px 0" }}>
                    <span style={{ ...rmono, fontWeight: 700, width: 13, textAlign: "center", color: ok ? "var(--ok)" : "#E05252", flexShrink: 0 }}>{ok ? "✓" : "×"}</span>
                    <span style={{ color: ok ? "var(--ink-2, var(--muted))" : "var(--fg)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </Box>
            <Box>
              {/* Mirrors the LEFT box's rhythm exactly: a headline (the listed
                  category, standing in for the review-count stat) + a one-line
                  status, then the same divider and uppercase sublabel, then the
                  content. Real Places data throughout, the customer's-eye view
                  of the listing. */}
              <div style={{ ...display, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: profile?.primaryType ? "var(--fg)" : "#E0A852" }}>
                {profile?.primaryType ?? "No category set"}
              </div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "11px 0 0", lineHeight: 1.4 }}>
                {profile?.openNow != null && (
                  <span style={{ color: profile.openNow ? "var(--ok)" : "#E0A852", fontWeight: 600 }}>{profile.openNow ? "Open now" : "Closed now"}</span>
                )}
                {profile?.openNow != null && profile?.priceLevel ? " · " : ""}
                {profile?.priceLevel && <span style={{ color: "var(--ok)", fontWeight: 600 }}>{profile.priceLevel}</span>}
                {(profile?.openNow != null || profile?.priceLevel) ? ". " : ""}
                How your listing is categorized, and what a customer sees at a glance.
              </p>
              <div style={{ borderTop: "1px solid var(--rule)", margin: "16px 0 12px" }} />
              <div style={{ ...rmono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                Opening hours
              </div>
              {profile?.hours && profile.hours.length > 0 ? (
                <div style={{ ...rmono, fontSize: 11.5, color: "var(--ink-2, var(--muted))", lineHeight: 1.9 }}>
                  {profile.hours.map((h) => {
                    const [day, ...rest] = h.split(": ");
                    return (
                      <div key={h} style={{ display: "flex", justifyContent: "space-between", gap: 12, borderBottom: "1px solid var(--rule)", padding: "1px 0" }}>
                        <span>{day}</span>
                        <span style={{ color: "var(--fg)", textAlign: "right" }}>{rest.join(": ") || "—"}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: "#E05252", margin: 0, lineHeight: 1.5 }}>
                  No hours on your listing. A customer sees &ldquo;Hours not available&rdquo; and assumes you might be closed, so they call the competitor whose hours are right there.
                </p>
              )}
              {profile?.attributes && profile.attributes.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                  {profile.attributes.map((a) => (
                    <span key={a} style={{ fontSize: 11, color: "var(--ink-2, var(--muted))", background: "var(--bg-elev, var(--bg))", border: "1px solid var(--rule)", borderRadius: 5, padding: "3px 8px" }}>{a}</span>
                  ))}
                </div>
              )}
            </Box>
          </div>
          <SectionFix
            title="How to fix this"
            points={[
              place.reviewCount != null && place.reviewCount < 25
                ? `You have ${place.reviewCount} review${place.reviewCount === 1 ? "" : "s"}. A simple ask at the end of every job, done consistently, is the fastest way to close that gap, reviews are the single biggest local-pack ranking factor you control.`
                : `${place.reviewCount ?? 0} reviews is real credibility, protect it by replying to every new one, good or bad. Google and customers both read the replies.`,
              (profile?.hours?.length ?? 0) === 0
                ? "Set your hours today. A profile with no hours reads as “maybe closed” and quietly loses walk-ins and calls before a customer ever reaches you."
                : "Keep hours, photos, and posts current. An active-looking profile outranks a stale one, even at the same review count.",
              !place.website
                ? "Link your website on the profile, right now there's no path from your Google listing to your site."
                : "Every attribute Google can show (services, price, options) is another reason a customer picks you from the pack. Fill in what's still blank.",
            ]}
          />
        </section>
      )}

      {/* 05, Search opportunity */}
      <section style={{ marginBottom: 52, ...gatedStyle }}>
        <SectionHead
          n="05"
          title="This is how you're doing online"
          lead="Where you actually show up when a customer searches for what you do, right next to the competitors beating you to the click. Real Google Maps and Search results, pulled live, keyword by keyword."
        />

        {/* The live-SERP board is the whole section now. The old labs-based
            keyword table was removed: its ranks came from a periodic DataForSEO
            Labs snapshot that lagged reality (it reported a business at #31 for
            a term it was actually #1 for in the local pack), and showing a
            stale number next to the live board destroyed trust. The board's
            ranks are pulled live at scan time, so they're the ones we stand
            behind. */}
        <div style={{ marginBottom: 28 }}>
          <SerpBoard loading={boardLoading} snapshots={boardSnapshots} opportunities={opportunityKeywords} location={board?.location} />
        </div>
        <SectionFix
          title="How to fix this"
          points={[
            boardSnapshots.length > 0
              ? (() => {
                  const unranked = boardSnapshots.find((s) => !s.your_maps_rank);
                  const behind = boardSnapshots.find((s) => s.your_maps_rank && s.your_maps_rank > 3);
                  if (unranked) return `There's an open lane for "${unranked.keyword}", a search your customers are running right now. Build a page for that term and it's yours to win.`;
                  if (behind) return `For "${behind.keyword}" you sit at #${behind.your_maps_rank} in the Maps pack, just outside the top 3 that get almost every click. Climbing into it is the highest-value win on this page.`;
                  return "You're in the top 3 on the terms that matter, keep it. Stay active and those rankings keep sending you the calls.";
                })()
              : "Google ranks a page it can understand. Adding titles, schema, and metadata is what earns you the exact terms your customers type.",
            opportunityKeywords.length > 0
              ? `"${opportunityKeywords[0].keyword}" gets about ${(opportunityKeywords[0].search_volume ?? 0).toLocaleString()} searches a month and it's open for the taking. That's a page waiting to win you traffic.`
              : "Claim the top 3 and the clicks come to you, the first result takes roughly a third of all clicks.",
            "Local search compounds slowly and pays the longest. The businesses above you started this months ago, the only fix is to start now.",
          ]}
        />
      </section>

      {/* 06, Reputation. Only rendered when reviews are genuinely weak (few,
          low-rated, or none), that's the only case where it's a real problem.
          A business with strong reviews doesn't get a section telling them
          their reviews are an issue while showing off two five-star quotes. */}
      {reviewsWeak && (
        <section style={{ marginBottom: 52, ...gatedStyle }}>
          <SectionHead
            n="06"
            title="Reputation gap"
            lead="A new customer checks your reviews before they call. Right now there isn't enough there to make the decision easy for them."
          />
          {reviews.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: reviews.length > 1 ? "1fr 1fr" : "1fr", gap: 18 }} className="grid-audit-proof">
              {reviews.map((rv, i) => (
                <Box key={i} label={rv.author ?? "Verified customer"}>
                  <div style={{ color: "#E0A852", fontSize: 13, marginBottom: 10 }}>{"★".repeat(Math.round(rv.rating ?? 5))}</div>
                  <p style={{ fontSize: 14, color: "var(--fg)", lineHeight: 1.55, margin: 0 }}>&ldquo;{rv.text}&rdquo;</p>
                </Box>
              ))}
            </div>
          ) : (
            <Box>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
                No published reviews to pull proof from yet, which is the finding. A customer with no visible reviews is
                being asked to take the first risk, and most won&apos;t.
              </p>
            </Box>
          )}
          <SectionFix
            title="How to fix this"
            points={[
              place.reviewCount != null
                ? `You have ${place.reviewCount} review${place.reviewCount === 1 ? "" : "s"}${place.rating != null ? ` at ${place.rating.toFixed(1)} stars` : ""}. In most local markets it takes 25+ recent reviews to look like the obvious choice, that gap is costing you clicks to competitors who have them.`
                : "Reviews are the cheapest, most trusted proof there is, and you have none visible. A five-star review outperforms a paragraph of your own marketing copy.",
              "This is a capture problem, not a quality problem. Ask at the moment of highest satisfaction, right after the job's done, and make it one tap.",
              "One detailed review beats five one-word ones. A short prompt (“what specifically made this easy?”) gets you the detail that actually persuades the next customer.",
            ]}
          />
        </section>
      )}

      {/* 07, Competitive positioning. STRICTLY local competitors (the real
          named businesses from the live Maps board), never organic citation
          domains like homeadvisor.com or mapquest.com, those aren't
          competitors, they're directories, and listing them read as noise. */}
      {localCompetitors.length > 0 && (
        <section style={{ marginBottom: 52, ...gatedStyle }}>
          <SectionHead
            n="07"
            title="Who's beating you, and where"
            lead="The real local businesses ranking above you when a customer searches, how strong their reputation is, and how many of your keywords they're taking."
          />
          <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ ...rmono, display: "grid", gridTemplateColumns: "1.6fr 90px 1.2fr", gap: 12, padding: "12px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}>
              <span>Competitor</span>
              <span>Rating</span>
              <span>Beats you on</span>
            </div>
            {localCompetitors.slice(0, 6).map((c, i) => {
              const beatKeywords = boardSnapshots.filter((s) => {
                const you = s.your_maps_rank;
                const theirRank = s.maps.find((m) => m.title === c.name)?.rank;
                return theirRank != null && (you == null || theirRank < you);
              }).length;
              const pct = Math.round((beatKeywords / Math.max(boardSnapshots.length, 1)) * 100);
              return (
                <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1.6fr 90px 1.2fr", gap: 12, padding: "13px 16px", fontSize: 13.5, borderBottom: i < Math.min(localCompetitors.length, 6) - 1 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
                  <span style={{ ...display, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                  <span style={{ ...rmono, fontSize: 12, color: c.rating != null ? "#E0A852" : "var(--muted)" }}>{c.rating != null ? `★ ${c.rating.toFixed(1)}` : "—"}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: 1 }}><Track pct={pct} color="#E05252" /></span>
                    <span style={{ ...rmono, color: "var(--muted)", fontSize: 11.5, whiteSpace: "nowrap" }}>{beatKeywords}/{boardSnapshots.length}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <SectionFix
            title="How to fix this"
            points={[
              `${localCompetitors[0].name} isn't necessarily a better business than you, they're a more visible one at the moment someone searches. That's a fixable gap, not a permanent one.`,
              localCompetitors[0].rating != null && place.rating != null && place.rating >= localCompetitors[0].rating
                ? "You already match or beat them on reviews, the gap is visibility, not reputation. Close it with the search and profile fixes above and you take their spot."
                : "Close two gaps at once: get more recent reviews to match their reputation, and fix the search signals above so you rank where they do.",
            ]}
          />
        </section>
      )}

      {/* Bottom CTA. Mirrors the top CTA so a reader who scrolled the whole
          report can act without scrolling back up. Shown in every state (in
          the teaser it sits behind the gate overlay, which is fine). Copy is
          action-first per the ask: "Fix these issues now", not "book a call". */}
      <div
        style={{
          marginTop: 24,
          borderTop: "1px solid var(--rule)",
          paddingTop: 44,
          ...gatedStyle,
        }}
      >
        <div
          style={{
            border: "1px solid var(--accent)",
            borderRadius: 14,
            background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
            padding: "clamp(26px, 4vw, 40px)",
            boxShadow: "0 24px 70px -40px var(--accent)",
            textAlign: "center",
          }}
        >
          <div style={{ ...rmono, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
            {totalIssues > 0 ? `${totalIssues} win${totalIssues === 1 ? "" : "s"} waiting for ${businessName}` : "Your next move"}
          </div>
          <h2 style={{ ...display, margin: "0 auto", maxWidth: "20ch", fontSize: "clamp(24px, 3.6vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.08 }}>
            Let&apos;s turn these into wins for {businessName}.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.6, margin: "18px auto 0", maxWidth: "58ch" }}>
            We&apos;ll take this exact report, fix the issues on it in priority order, and get you ranking where your
            competitors are now. Book a free call and we&apos;ll walk it through together, no pitch, no obligation, and
            we&apos;ll tell you honestly if there&apos;s nothing worth paying for.
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/start-now"
              className="cta-primary"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "15px 30px", fontSize: 15.5, fontWeight: 700, borderRadius: 7, textDecoration: "none" }}
            >
              Fix these issues now →
            </a>
            <a
              href="tel:+19194289452"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--fg)", border: "1px solid var(--rule)", padding: "15px 26px", fontSize: 15, fontWeight: 600, borderRadius: 7, textDecoration: "none" }}
            >
              Call (919) 428-9452
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
