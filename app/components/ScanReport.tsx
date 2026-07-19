"use client";

import { motion, useReducedMotion } from "framer-motion";
import PhoneLoop from "./PhoneLoop";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import type { Finding, PlaceDetails, ScanResult } from "../lib/scan-types";

/**
 * Document-style audit report, rebuilt to match the Noovis Digital Presence
 * Audit reference (docs/... the artifact Matt built by hand) section for
 * section: masthead, then nine numbered sections ending in a scope/next-step
 * callout, each with a "how to fix / why it matters" dropdown at the close.
 *
 * Own type system (--font-report-display/body/mono, loaded in layout.tsx)
 * rather than the site's Inter/JetBrains pairing — the reference's Space
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
  return "Critical";
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
  teaser = false,
}: {
  place: PlaceDetails;
  result: ScanResult;
  teaser?: boolean;
}) {
  const reduce = useReducedMotion();
  const pct = result.percentage ?? result.score ?? 0;

  const categoryEntries = Object.entries(result.categories ?? {});
  const groups: CategoryGroup[] = categoryEntries
    .map(([name, data]) => ({
      name,
      grade: data.grade,
      pct: data.max ? Math.round(((data.score ?? 0) / data.max) * 100) : gradeScore100(data.grade),
      findings: (result.findings ?? []).filter((f) => f.category === name),
    }))
    .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade));
  const groupsWithFindings = groups.filter((g) => g.findings.length > 0);
  const strong = groups.filter((g) => gradeRank(g.grade) >= 3);
  const weak = groups.filter((g) => gradeRank(g.grade) < 3).sort((a, b) => a.pct - b.pct);

  const gbp = groups.find((g) => g.name === "Google Business Profile");
  const seoFindings = (result.findings ?? []).filter((f) => f.category === "On-Page SEO" || f.category === "Crawlability");
  const reviews = (place.reviews ?? []).slice(0, 2);
  const worstTwo = weak.slice(0, 2);
  const hasSearchKeywords = Boolean(result.search?.available && result.search.keywords && result.search.keywords.length > 0);
  const hasCompetitors = Boolean(result.search?.available && result.search.competitors && result.search.competitors.length > 0);

  // "Costing you leads right now" should never read 0 while real problems
  // sit on the page — a zero next to a list of findings reads as "nothing
  // urgent," which undersells a report full of real issues. When no finding
  // crossed the rubric's critical threshold, the top warnings (capped at 3)
  // are counted here instead: an escalation of REAL findings by impact, not
  // an invented number. If the scan genuinely found nothing at all, this
  // stays 0 — we don't conjure an issue for a clean site.
  const urgentCount =
    result.critical_count > 0
      ? result.critical_count
      : Math.min(3, result.warning_count > 0 ? result.warning_count : result.findings_count);

  // Teaser reveal for the detailed findings section only: sections 01-03 and
  // the exec-summary breadth stay visible always, that's the hook. What's
  // gated is depth: the fix-by-fix breakdown and everything past it.
  const TEASER_FINDING_THRESHOLD = 3;
  let revealed = 0;
  let cutIndex = groupsWithFindings.length;
  if (teaser) {
    for (let i = 0; i < groupsWithFindings.length; i++) {
      if (revealed >= TEASER_FINDING_THRESHOLD) {
        cutIndex = i;
        break;
      }
      revealed += groupsWithFindings[i].findings.length;
    }
  }
  const shownGroups = groupsWithFindings.slice(0, cutIndex);
  const hiddenGroups = groupsWithFindings.slice(cutIndex);
  const hiddenFindingCount = hiddenGroups.reduce((n, g) => n + g.findings.length, 0);

  const gatedStyle = teaser ? ({ filter: "blur(6px)", userSelect: "none" as const, pointerEvents: "none" as const }) : {};

  return (
    <div style={{ ...body, maxWidth: 900, margin: "0 auto" }}>
      {/* Masthead */}
      <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 30, marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          {/* The full wordmark, not inverted: `inverted` inks the pulse for
              light surfaces, and on this dark page it vanished — leaving
              just the dot, which read as ". SIMPL". */}
          <SimplWordmark size={24} />
          <div style={{ ...rmono, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)", textAlign: "right", lineHeight: 1.9 }}>
            <div><span style={{ color: "var(--fg)" }}>Prepared for</span> {place.name ?? result.business?.name}{place.address ? ` · ${place.address}` : ""}</div>
            <div><span style={{ color: "var(--fg)" }}>Report</span> Digital Presence &amp; Positioning Audit</div>
          </div>
        </div>
        <h1 style={{ ...display, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.03, margin: "26px 0 0" }}>
          Digital Presence &amp; Positioning Audit
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "clamp(15px, 1.6vw, 17px)", maxWidth: "62ch", margin: "16px 0 0", lineHeight: 1.55 }}>
          An assessment of every public channel a customer sees before they call, measured against what your business
          actually delivers.
        </p>
      </div>

      {/* 01 — Executive summary */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead n="01" title="Executive summary" />
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
              SIMPL Score
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
            <div style={{ ...display, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: "#E05252", lineHeight: 1 }}>{urgentCount}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>critical issue{urgentCount === 1 ? "" : "s"} costing you leads right now</div>
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
            "Work the categories in “What's not” first, worst grade to best — that's the order a customer actually experiences you in.",
            "A critical finding blocks a sale in progress; a warning slows one down. Fix critical first, always.",
            "This score moves as fast as the fixes ship. Rescan after each change to see it move.",
          ]}
        />
      </section>

      {/* 02 — Presence assessment */}
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
            "The gap between your best category and your worst is exactly the gap a customer notices when they cross-check you across channels.",
            "One strong channel doesn't cover for a weak one — a customer who lands on a good website then finds a dead Google profile hesitates anyway.",
            "Aim for no category below a C. A single critical category drags the whole score down disproportionately.",
          ]}
        />
      </section>

      {/* 03 — Channel diagnostics */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead n="03" title="Channel diagnostics" />
        <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
          <div
            style={{ ...rmono, display: "grid", gridTemplateColumns: "1fr 110px 2fr", gap: 12, padding: "12px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}
            className="grid-audit-diag-row"
          >
            <span>Category</span>
            <span>Status</span>
            <span>Top finding</span>
          </div>
          {groups.map((g, i) => (
            <div
              key={g.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 110px 2fr",
                gap: 12,
                padding: "13px 16px",
                fontSize: 13.5,
                borderBottom: i < groups.length - 1 ? "1px solid var(--rule)" : "none",
                alignItems: "center",
              }}
              className="grid-audit-diag-row"
            >
              <span style={{ ...display, fontWeight: 600 }}>{g.name}</span>
              <Pill color={gradeColor(g.grade)}>{gradeStatusWord(g.grade)}</Pill>
              <span style={{ color: "var(--muted)" }}>{g.findings[0]?.title ?? "No issues found"}</span>
            </div>
          ))}
        </div>
        <SectionFix
          title="How to fix this"
          points={[
            "“Critical” channels are actively turning customers away today, not someday — those get fixed this week, not this quarter.",
            "“Solid” and “Strong” channels still get monitored. Presence decays quietly: a review goes unanswered, a page goes stale, nobody notices until the calls slow down.",
          ]}
        />
      </section>

      {/* 04 — Google Business Profile */}
      {gbp && (
        <section style={{ marginBottom: 52, ...gatedStyle }}>
          <SectionHead
            n="04"
            title="Google Business Profile"
            lead="The profile is the first thing a customer checks after a referral or a search. Right now it's either backing up what you actually do, or contradicting it."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }} className="grid-audit-gbp">
            <Box>
              <div style={{ ...display, fontSize: "clamp(44px, 6vw, 64px)", fontWeight: 700, lineHeight: 0.9, color: place.reviewCount && place.reviewCount >= 25 ? "var(--ok)" : "#E05252", letterSpacing: "-0.02em" }}>
                {place.reviewCount ?? 0}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-2, var(--muted))", margin: "12px 0 0", lineHeight: 1.4 }}>
                Google review{place.reviewCount === 1 ? "" : "s"}{place.rating ? ` at a ${place.rating.toFixed(1)}-star average` : ""} carrying your entire public reputation on this channel.
              </p>
            </Box>
            <Box label="Profile completeness">
              <div style={{ display: "grid", gap: 10 }}>
                {gbp.findings.length > 0 ? (
                  gbp.findings.slice(0, 5).map((f) => (
                    <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 11, fontSize: 13.5, color: "var(--ink-2, var(--muted))" }}>
                      <span style={{ ...rmono, fontWeight: 700, flexShrink: 0, width: 16, textAlign: "center", color: "#E05252" }}>×</span>
                      <span>{f.title}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 11, fontSize: 13.5, color: "var(--ink-2, var(--muted))" }}>
                    <span style={{ ...rmono, fontWeight: 700, flexShrink: 0, width: 16, textAlign: "center", color: "var(--ok)" }}>✓</span>
                    <span>No profile issues found — this one's in good shape</span>
                  </div>
                )}
              </div>
            </Box>
          </div>
          <SectionFix
            title="How to fix this"
            points={[
              "Every unanswered review is a visible gap. Answering the last 90 days of reviews, positive and negative, is the fastest credibility fix on this list.",
              "A profile with photos, correct hours, and regular posts reads as active. An empty one reads as closed, even when you're not.",
              "Review volume compounds: a simple ask at the end of a job, done consistently, closes this gap in months, not years.",
            ]}
          />
        </section>
      )}

      {/* 05 — Search opportunity */}
      <section style={{ marginBottom: 52, ...gatedStyle }}>
        <SectionHead
          n="05"
          title="Search opportunity"
          lead={
            hasSearchKeywords
              ? "Real Google data: the terms you already rank for, the real monthly search volume behind them, and where you currently sit."
              : "The work that starts cold begins with a search. These are the real on-page and technical signals Google uses to decide whether you show up for it."
          }
        />
        {hasSearchKeywords ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
              <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "16px 18px" }}>
                <div style={{ ...display, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}>{result.search!.organic_keywords}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>keywords you show up for at all</div>
              </div>
              <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "16px 18px" }}>
                <div style={{ ...display, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: (result.search!.pos_1 ?? 0) > 0 ? "var(--ok)" : "#E05252", lineHeight: 1 }}>{result.search!.pos_1 ?? 0}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>keywords ranked #1</div>
              </div>
              <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "16px 18px" }}>
                <div style={{ ...display, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "#E0A852", lineHeight: 1 }}>{result.search!.pos_4_10 ?? 0}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>on page 1 but not the top 3</div>
              </div>
            </div>
            <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ ...rmono, display: "grid", gridTemplateColumns: "2fr 130px 90px", gap: 12, padding: "12px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}>
                <span>Keyword</span>
                <span>Monthly searches</span>
                <span>Your rank</span>
              </div>
              {result.search!.keywords!.slice(0, 6).map((kw, i) => (
                <div key={`${kw.keyword}-${i}`} style={{ display: "grid", gridTemplateColumns: "2fr 130px 90px", gap: 12, padding: "13px 16px", fontSize: 13.5, borderBottom: i < Math.min(result.search!.keywords!.length, 6) - 1 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
                  <span style={{ ...display, fontWeight: 600 }}>{kw.keyword}</span>
                  <span style={{ ...rmono, color: "var(--muted)" }}>{kw.search_volume != null ? kw.search_volume.toLocaleString() : "—"}</span>
                  <span style={{ ...rmono, color: kw.rank != null && kw.rank <= 10 ? "var(--ok)" : "#E0A852" }}>{kw.rank != null ? `#${kw.rank}` : "Not ranking"}</span>
                </div>
              ))}
            </div>
            <p style={{ ...rmono, fontSize: 11, color: "var(--faint, var(--muted))", letterSpacing: "0.03em", marginTop: 14, lineHeight: 1.6 }}>
              Live Google rank + real search volume, pulled from DataForSEO at scan time. Not an estimate.
            </p>
          </>
        ) : (
          <>
            <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
              <div
                style={{ ...rmono, display: "grid", gridTemplateColumns: "2fr 110px 2fr", gap: 12, padding: "12px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}
              >
                <span>Signal</span>
                <span>Severity</span>
                <span>What it costs you</span>
              </div>
              {(seoFindings.length > 0 ? seoFindings.slice(0, 6) : [{ severity: "info", title: "No search-visibility issues found", category: "On-Page SEO", fix: null } as Finding]).map((f, i) => (
                <div
                  key={`${f.title}-${i}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 110px 2fr",
                    gap: 12,
                    padding: "13px 16px",
                    fontSize: 13.5,
                    borderBottom: i < Math.min(seoFindings.length, 6) - 1 ? "1px solid var(--rule)" : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{ ...display, fontWeight: 600 }}>{f.title}</span>
                  <Pill color={f.severity === "critical" ? "#E05252" : f.severity === "warning" ? "#E0A852" : "var(--ok)"}>
                    {f.severity === "critical" ? "High" : f.severity === "warning" ? "Medium" : "OK"}
                  </Pill>
                  <span style={{ color: "var(--muted)" }}>{f.fix ?? "Already handled"}</span>
                </div>
              ))}
            </div>
            <p style={{ ...rmono, fontSize: 11, color: "var(--faint, var(--muted))", letterSpacing: "0.03em", marginTop: 14, lineHeight: 1.6 }}>
              This section shows the real on-page and crawlability signals from this scan. Live search volumes and
              rank positions need a DataForSEO pull that didn&apos;t return data for this domain (too new to have
              search history, or the data source was unavailable) — real numbers, not placeholders, when there&apos;s
              a footprint to measure.
            </p>
          </>
        )}
        <SectionFix
          title="How to fix this"
          points={[
            "Google can't rank a page it can't understand. Missing titles, schema, and metadata are the difference between showing up and being invisible for the exact terms your customers type.",
            hasSearchKeywords
              ? "Anything outside the top 3 is losing clicks to whoever is above you — the first result gets roughly a third of all clicks on a search."
              : "Fix the “High” severity signals first — those are the ones actively blocking discovery, not just weakening it.",
            "This is the section that compounds slowest and pays the longest. Start it now even if the payoff is months out.",
          ]}
        />
      </section>

      {/* 06 — Proof and case studies */}
      <section style={{ marginBottom: 52, ...gatedStyle }}>
        <SectionHead
          n="06"
          title="Proof and case studies"
          lead="What your own customers already say about you — the proof a new customer should find in the first ten seconds of looking you up."
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
              No published reviews to pull proof from yet — which is itself the finding. A customer with no visible
              reviews is asking a stranger to take the first risk.
            </p>
          </Box>
        )}
        <SectionFix
          title="How to fix this"
          points={[
            "Real reviews are the cheapest, most trusted proof there is — a five-star review outperforms a paragraph of your own marketing copy.",
            "If you have finished jobs with happy customers and nothing published, that's a capture problem, not a quality problem. Ask at the moment of highest satisfaction, right after the job's done.",
            "One detailed review beats five one-word ones. A short ask (“what specifically made this easy?”) gets you the detail.",
          ]}
        />
      </section>

      {/* 07 — Competitive positioning and exposure assessment */}
      <section style={{ marginBottom: 52, ...gatedStyle }}>
        <SectionHead
          n="07"
          title="Competitive positioning and exposure assessment"
          lead="You don't need a specific competitor's name to see the exposure: every category below average is a door held open for whoever is better set up to walk through it."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="grid-audit-competitive">
          <Box hi label="Local search exposure">
            <p style={{ fontSize: 14, color: "var(--ink-2, var(--muted))", margin: 0, lineHeight: 1.55 }}>
              {gbp && gradeRank(gbp.grade) < 3
                ? "A weak Google Business Profile is the single most common reason a comparable business loses the local pack. That's the listing customers see before they see your website at all."
                : "Your local listing is carrying its weight. The remaining exposure is further down the funnel, in content and follow-through."}
            </p>
          </Box>
          <Box hi label="Conversion exposure">
            <p style={{ fontSize: 14, color: "var(--ink-2, var(--muted))", margin: 0, lineHeight: 1.55 }}>
              Every visitor who lands on a slow page, a missing service page, or a site with no clear next step is a
              visitor who came looking and left with nothing to act on. That traffic isn&apos;t lost, it&apos;s
              leaking.
            </p>
          </Box>
        </div>

        {hasCompetitors && (
          <div style={{ marginTop: 18, border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ ...rmono, display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, padding: "12px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}>
              <span>Domain competing for your keywords</span>
              <span>Keywords in common</span>
              <span>Their footprint</span>
            </div>
            {result.search!.competitors!.map((c, i) => (
              <div key={c.domain} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, padding: "13px 16px", fontSize: 13.5, borderBottom: i < result.search!.competitors!.length - 1 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
                <span style={{ ...display, fontWeight: 600 }}>{c.domain}</span>
                <span style={{ ...rmono, color: "var(--muted)" }}>{c.common_keywords ?? "—"}</span>
                <span style={{ ...rmono, color: "var(--muted)" }}>{c.organic_keywords ?? "—"} keywords</span>
              </div>
            ))}
          </div>
        )}
        <SectionFix
          title="How to fix this"
          points={[
            "You don't have to be the biggest business in your market to win the search. You have to be the most complete, accurate, and responsive one at the moment someone's looking.",
            "Close the two boxes above in order: get found, then give the person who found you a reason to call before they check the next result.",
          ]}
        />
      </section>

      {/* 08 — Engagement plan */}
      <section style={{ marginBottom: 52, ...gatedStyle }}>
        <SectionHead n="08" title="Engagement plan" lead="Two movements, worst category first. This is the floor, not the ceiling." />
        <div style={{ display: "grid", gridTemplateColumns: worstTwo.length > 1 ? "1fr 1fr" : "1fr", gap: 16 }} className="grid-audit-engagement">
          {(worstTwo.length > 0 ? worstTwo : groups.slice(0, 1)).map((g, i) => (
            <Box key={g.name} label={`Movement 0${i + 1}`}>
              <div style={{ ...display, fontWeight: 700, fontSize: 19 }}>{g.name}</div>
              <p style={{ fontSize: 13.5, color: "var(--ink-2, var(--muted))", margin: "10px 0 0", lineHeight: 1.5 }}>
                {g.findings[0]?.fix ?? `Bring ${CATEGORY_SHORT[g.name] ?? g.name} up to at least a C before anything else — it's the ceiling on everything downstream of it.`}
              </p>
            </Box>
          ))}
        </div>
        <SectionFix
          title="How to fix this"
          points={[
            "Fix in this order, not by preference — each movement is picked because it's the category currently doing the most damage.",
            "One movement at a time. Spreading effort across all six categories at once is how nothing gets fixed properly.",
          ]}
        />
      </section>

      {/* Findings & fixes — the detailed, teaser-gated breakdown */}
      <section style={{ marginBottom: 8 }}>
        <SectionHead title="Findings & fixes, in full" lead="Every issue behind the nine sections above, grouped by category, worst first." />
        {shownGroups.map((g) => (
          <div key={g.name} style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
              <span style={{ ...rmono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{g.name}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: gradeColor(g.grade) }}>{g.grade}</span>
            </div>
            {g.findings.map((f, i) => (
              <FindingRow key={`${g.name}-${f.title}-${i}`} f={f} index={i} />
            ))}
          </div>
        ))}

        {hiddenGroups.length > 0 && (
          <div style={{ position: "relative" }}>
            <div aria-hidden="true" style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none" }}>
              {hiddenGroups.map((g) => (
                <div key={g.name} style={{ marginBottom: 30 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
                    <span style={{ ...rmono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{g.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: gradeColor(g.grade) }}>{g.grade}</span>
                  </div>
                  {g.findings.map((f, i) => (
                    <FindingRow key={`${g.name}-${f.title}-${i}`} f={f} index={i} />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, transparent, var(--bg) 55%)" }}>
              <span style={{ ...rmono, fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.02em" }}>
                +{hiddenFindingCount} more issue{hiddenFindingCount === 1 ? "" : "s"} across {hiddenGroups.length} categor{hiddenGroups.length === 1 ? "y" : "ies"}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Aspirational close */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="split-phone-grid"
        style={{ marginTop: 16, paddingTop: 40, borderTop: "1px solid var(--rule)", ...gatedStyle }}
      >
        <div>
          <div style={{ ...rmono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>Where you could be</div>
          <h2 style={{ ...display, margin: 0, fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            This is what winning looks like.
          </h2>
          <p style={{ margin: "18px 0 0", maxWidth: 460, fontSize: 15.5, lineHeight: 1.6, color: "var(--muted)" }}>
            Every issue above, fixed. Your score climbing, your competitors behind you, and the leads landing in your
            pocket instead of theirs. That&apos;s the job. We&apos;d start this week.
          </p>
        </div>
        <div className="split-phone-visual" style={{ display: "flex", justifyContent: "center" }}>
          <PhoneLoop optimized />
        </div>
      </motion.div>

      {/* 09 — Scope and next step */}
      {!teaser && (
        <section style={{ marginTop: 40, borderBottom: "none" }}>
          <SectionHead
            n="09"
            title="Scope and next step"
            lead="You wouldn't quote a job off a phone call. You'd walk the site first, scope it, then put a real number on it. Same method here."
          />
          <div
            style={{
              border: "1px solid var(--accent)",
              borderRadius: 12,
              background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
              padding: "clamp(24px, 4vw, 38px)",
              boxShadow: "0 24px 70px -40px var(--accent)",
            }}
          >
            <div style={{ ...rmono, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
              Free strategy call
            </div>
            <h2 style={{ ...display, margin: 0, fontSize: "clamp(21px, 3vw, 28px)", fontWeight: 600, lineHeight: 1.2 }}>
              A real conversation about what to fix first, and what it costs.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.6, margin: "14px 0 0", maxWidth: 560 }}>
              No pitch attached to a first reply. We&apos;ll walk through this exact report, prioritize it by what&apos;s
              actually costing you, and tell you honestly if there&apos;s nothing worth fixing.
            </p>
            <div style={{ marginTop: 24 }}>
              <a
                href="/start-now"
                className="cta-primary"
                style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "14px 24px", fontSize: 14, fontWeight: 700, borderRadius: 6, textDecoration: "none" }}
              >
                Book your call →
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
