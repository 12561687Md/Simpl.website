"use client";

import { motion, useReducedMotion } from "framer-motion";
import PhoneLoop from "./PhoneLoop";
import { SimplMark } from "@/components/ui/simpl-brand";
import type { Finding, PlaceDetails, ScanResult } from "../lib/scan-types";

/**
 * Document-style audit report, structured after the Noovis Digital
 * Presence Audit (docs/... the artifact Matt referenced 2026-07-18):
 * numbered sections, a real score gauge, a real per-category bar chart,
 * a diagnostics table, then category-grouped findings with fix guidance.
 *
 * Deliberately kept on SIMPL's own type system (Inter + JetBrains Mono,
 * the tokens already live on simpl.pro) rather than the artifact's
 * one-off Space Grotesk/IBM Plex pairing — the STRUCTURE is what's being
 * replicated, not a font swap that would put this one page out of step
 * with the rest of the product.
 *
 * Every number on this page is real: category score/max already exist on
 * ScanResult, nothing here is a search-volume table or a case-study section
 * that would need data this scan doesn't have.
 */

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

function gradeColor(grade: string | undefined) {
  // A passing grade is --ok (dedicated success green), not --accent — the
  // brand accent is blue now, and conflating "passed" with "on brand" was
  // the old system's mistake.
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

const CATEGORY_SHORT: Record<string, string> = {
  "Website Foundation": "Website",
  "Content & Pages": "Content",
  "On-Page SEO": "SEO",
  "Social Presence": "Social",
  "Google Business Profile": "GBP",
  "Crawlability": "Crawlability",
};

interface CategoryGroup {
  name: string;
  grade: string;
  pct: number;
  findings: Finding[];
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
      <span style={{ ...mono, fontSize: 11.5, fontWeight: 700, color: "var(--fg)", letterSpacing: "0.08em" }}>{n}</span>
      <h2 style={{ margin: 0, fontSize: "clamp(19px, 2.6vw, 24px)", fontWeight: 600, letterSpacing: "-0.015em" }}>{title}</h2>
    </div>
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
      <div style={{ fontSize: 14.5, lineHeight: 1.45, fontWeight: 500 }}>{f.title}</div>
      {f.fix && (
        <div style={{ marginTop: 6, display: "flex", gap: 7, alignItems: "baseline" }}>
          <span style={{ ...mono, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", flexShrink: 0 }}>
            Fix
          </span>
          <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>{f.fix}</span>
        </div>
      )}
    </motion.div>
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
      pct: data.max ? Math.round(((data.score ?? 0) / data.max) * 100) : 0,
      findings: (result.findings ?? []).filter((f) => f.category === name),
    }))
    .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade));
  const groupsWithFindings = groups.filter((g) => g.findings.length > 0);

  // Teaser reveal for the detailed findings section only: the gauge, the
  // bar chart, and the diagnostics table (breadth) stay visible always —
  // that's the hook. What's gated is depth: the fix-by-fix breakdown.
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

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      {/* Masthead */}
      <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 28, marginBottom: 44 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <SimplMark size={16} inverted />
            <span style={{ ...mono, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.1em" }}>SIMPL</span>
          </div>
          <div style={{ ...mono, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)", textAlign: "right", lineHeight: 1.9 }}>
            <div><span style={{ color: "var(--fg)" }}>Prepared for</span> {place.name ?? result.business?.name}</div>
            <div><span style={{ color: "var(--fg)" }}>Report</span> SIMPL Score Audit</div>
          </div>
        </div>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.04, margin: "24px 0 0" }}>
          Digital Presence Audit
        </h1>
        <div style={{ ...mono, fontSize: 12, color: "var(--muted)", marginTop: 12, display: "flex", gap: 9, flexWrap: "wrap" }}>
          {place.address && <span>{place.address}</span>}
          {place.phone && (
            <>
              <span style={{ opacity: 0.3 }}>·</span>
              <span>{place.phone}</span>
            </>
          )}
        </div>
      </div>

      {/* 01 — Executive summary */}
      <section style={{ marginBottom: 48 }}>
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
            <div style={{ fontSize: "clamp(52px, 8vw, 72px)", fontWeight: 700, lineHeight: 0.9, color: gradeColor(result.grade), letterSpacing: "-0.03em" }}>
              {pct}
            </div>
            <div style={{ ...mono, fontSize: 11, color: "var(--muted)", marginTop: 6 }}>/ 100</div>
            <div style={{ ...mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginTop: 10 }}>
              SIMPL Score
            </div>
          </div>
          {result.summary && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--fg)" }}>{result.summary}</p>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 20 }} className="grid-audit-kpis">
          <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "18px 18px" }}>
            <div style={{ ...mono, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: "#E05252", lineHeight: 1 }}>{result.critical_count}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>critical issue{result.critical_count === 1 ? "" : "s"} costing you leads right now</div>
          </div>
          <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "18px 18px" }}>
            <div style={{ ...mono, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: "#E0A852", lineHeight: 1 }}>{result.warning_count}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>warning{result.warning_count === 1 ? "" : "s"} worth fixing soon</div>
          </div>
          <div style={{ border: "1px solid var(--rule)", borderRadius: 9, background: "var(--bg-soft)", padding: "18px 18px" }}>
            <div style={{ ...mono, fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 700, color: "var(--fg)", lineHeight: 1 }}>{result.findings_count}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.4 }}>total findings across six categories</div>
          </div>
        </div>
      </section>

      {/* 02 — Category assessment: real bar chart, real percentages */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead n="02" title="Category assessment" />
        <div style={{ display: "grid", gap: 12 }}>
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              style={{ display: "grid", gridTemplateColumns: "140px 1fr 40px", gap: 14, alignItems: "center" }}
              className="grid-audit-bar"
            >
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{CATEGORY_SHORT[g.name] ?? g.name}</span>
              <span style={{ height: 20, background: "var(--bg-soft)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${g.pct}%` }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", inset: 0, right: "auto", display: "block", borderRadius: 5, background: gradeColor(g.grade) }}
                />
              </span>
              <span style={{ ...mono, fontSize: 12, color: "var(--muted)", textAlign: "right" }}>{g.pct}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 03 — Diagnostics: real status per category + its real top finding */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead n="03" title="Diagnostics" />
        <div style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden" }}>
          <div
            style={{ ...mono, display: "grid", gridTemplateColumns: "1fr 110px 2fr", gap: 12, padding: "12px 16px", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)" }}
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
              <span style={{ fontWeight: 600 }}>{g.name}</span>
              <span style={{ ...mono, fontSize: 11, fontWeight: 600, color: gradeColor(g.grade), display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: gradeColor(g.grade), flexShrink: 0 }} />
                {gradeStatusWord(g.grade)}
              </span>
              <span style={{ color: "var(--muted)" }}>{g.findings[0]?.title ?? "No issues found"}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — Findings & fixes: category-grouped, worst first, teaser-gated */}
      <section style={{ marginBottom: 8 }}>
        <SectionHead n="04" title="Findings & fixes" />
        {shownGroups.map((g, gi) => (
          <div key={g.name} style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
              <span style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                {g.name}
              </span>
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
              {hiddenGroups.map((g, gi) => (
                <div key={g.name} style={{ marginBottom: 30 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
                    <span style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                      {g.name}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: gradeColor(g.grade) }}>{g.grade}</span>
                  </div>
                  {g.findings.map((f, i) => (
                    <FindingRow key={`${g.name}-${f.title}-${i}`} f={f} index={i} />
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, transparent, var(--bg) 55%)",
              }}
            >
              <span style={{ ...mono, fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.02em" }}>
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
        style={{
          marginTop: 16,
          paddingTop: 40,
          borderTop: "1px solid var(--rule)",
          ...(teaser ? { filter: "blur(6px)", userSelect: "none", pointerEvents: "none" as const } : {}),
        }}
      >
        <div>
          <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
            Where you could be
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.12 }}>
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

      {/* Next step, styled as a real offer, not fabricated */}
      {!teaser && (
        <div
          style={{
            marginTop: 40,
            border: "1px solid var(--accent)",
            borderRadius: 12,
            background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
            padding: "clamp(24px, 4vw, 38px)",
            boxShadow: "0 24px 70px -40px var(--accent)",
          }}
        >
          <div style={{ ...mono, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            Free strategy call
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(21px, 3vw, 28px)", fontWeight: 600, lineHeight: 1.2 }}>
            A real conversation about what to fix first, and what it costs.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.6, margin: "14px 0 0", maxWidth: 560 }}>
            No pitch attached to a first reply. We&apos;ll walk through this exact report, prioritize it by what&apos;s
            actually costing you, and tell you honestly if there&apos;s nothing worth fixing.
          </p>
          <div style={{ marginTop: 24 }}>
            <a
              href="/what-am-i-missing"
              className="cta-primary"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--accent-ink)", padding: "14px 24px", fontSize: 14, fontWeight: 700, borderRadius: 6, textDecoration: "none" }}
            >
              Book your call →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
