"use client";

import { motion, useReducedMotion } from "framer-motion";
import PhoneLoop from "./PhoneLoop";
import type { PlaceDetails, ScanResult } from "../lib/scan-types";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

function gradeColor(grade: string | undefined) {
  // Missing or N/A is not a passing grade. Neutral grey, never accent green, so
  // an absent category can never masquerade as an A.
  if (!grade || grade === "N/A") return "#8A8D8C";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#9BFF1A";
  if (grade.startsWith("C")) return "#E0A852";
  return "#E05252";
}

function ScoreRing({ grade, percentage, size = 148 }: { grade: string; percentage: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const color = gradeColor(grade);
  const reduce = useReducedMotion();

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--rule)" strokeWidth="3" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - percentage / 100) : c }}
          animate={{ strokeDashoffset: c * (1 - percentage / 100) }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.2 }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.34, fontWeight: 200, color, lineHeight: 1, letterSpacing: "-0.04em" }}>{grade}</span>
        <span style={{ ...mono, fontSize: size * 0.095, color: "var(--muted)", marginTop: 3 }}>{percentage}%</span>
      </div>
    </div>
  );
}

/**
 * The report. No gate, nothing withheld.
 *
 * The email was taken before we spent a cent, so by the time anyone reads this
 * they have already paid the only price we charge. Blurring findings here would
 * be charging twice.
 */
export default function ScanReport({ place, result }: { place: PlaceDetails; result: ScanResult }) {
  const reduce = useReducedMotion();

  const pct = result.percentage ?? result.score ?? 0;
  const findings = result.findings ?? [];
  const ordered = [
    ...findings.filter((f) => f.severity === "critical"),
    ...findings.filter((f) => f.severity === "warning"),
    ...findings.filter((f) => f.severity !== "critical" && f.severity !== "warning"),
  ];

  return (
    <div style={{ maxWidth: 940, margin: "0 auto" }}>
      {/* Identity + score */}
      <div style={{ display: "flex", gap: 34, alignItems: "center", flexWrap: "wrap", marginBottom: 34 }}>
        <ScoreRing grade={result.grade} percentage={pct} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
            Scan complete
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4.4vw, 38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            {place.name ?? result.business?.name}
          </h1>
          <div style={{ ...mono, fontSize: 11.5, color: "var(--muted)", marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {place.address && <span>{place.address}</span>}
            {place.phone && (
              <>
                <span style={{ opacity: 0.3 }}>·</span>
                <span>{place.phone}</span>
              </>
            )}
          </div>

          {/* Google's own numbers, rendered only when Google actually has them.
              No rating is shown as no rating, never as a zero or a placeholder. */}
          {place.rating !== null && place.reviewCount !== null && (
            <div style={{ ...mono, fontSize: 11.5, color: "var(--muted)", marginTop: 6 }}>
              {place.rating.toFixed(1)} on Google · {place.reviewCount} review{place.reviewCount === 1 ? "" : "s"}
            </div>
          )}

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 16 }}>
            {result.critical_count > 0 && (
              <span style={{ ...mono, fontSize: 12, color: "#E05252", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#E05252", boxShadow: "0 0 0 3px rgba(224,82,82,0.18)" }} />
                {result.critical_count} critical
              </span>
            )}
            {result.warning_count > 0 && (
              <span style={{ ...mono, fontSize: 12, color: "#E0A852", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#E0A852" }} />
                {result.warning_count} warning{result.warning_count === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category grades */}
      {result.categories && (
        <div
          className="grid-category-grades"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Object.keys(result.categories).length}, 1fr)`,
            border: "1px solid var(--rule)",
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 30,
          }}
        >
          {Object.entries(result.categories).map(([name, data], i, arr) => {
            const short = name
              .replace("Website Foundation", "Website")
              .replace("Content & Pages", "Content")
              .replace("On-Page SEO", "SEO")
              .replace("Social Presence", "Social")
              .replace("Google Business Profile", "GBP");
            return (
              <motion.div
                key={name}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                style={{
                  textAlign: "center",
                  padding: "12px 2px",
                  borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                  background: "var(--bg-soft)",
                }}
              >
                <div style={{ ...mono, fontSize: 9.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden" }}>
                  {short}
                </div>
                <div style={{ fontSize: 19, fontWeight: 400, color: gradeColor(data.grade) }}>{data.grade}</div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Findings */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
          What we found
        </div>
        {ordered.map((f, i) => (
          <motion.div
            key={`${f.title}-${i}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            // Capped: with 17 findings an uncapped stagger would still be
            // animating a second after the reader started reading.
            transition={{ duration: 0.3, delay: Math.min(0.4 + i * 0.04, 1.1) }}
            style={{
              borderLeft: `3px solid ${f.severity === "critical" ? "#E05252" : "#E0A852"}`,
              background: f.severity === "critical" ? "rgba(224,82,82,0.05)" : "transparent",
              padding: "10px 0 10px 14px",
              marginBottom: 8,
              fontSize: 14.5,
              lineHeight: 1.45,
              borderRadius: "0 3px 3px 0",
            }}
          >
            {f.title}
          </motion.div>
        ))}
      </div>

      {/* The aspirational close: their real problems above, and beside the phone
          the state those problems turn into once we fix them. The phone is the
          `optimized` PhoneLoop — an A score, all green, live signals. */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="split-phone-grid"
        style={{ marginTop: 8, paddingTop: 40, borderTop: "1px solid var(--rule)" }}
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
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginTop: 28 }}>
            <a
              href="/start"
              className="cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "var(--accent-ink)",
                padding: "14px 24px",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Start fixing this →
            </a>
            <span style={{ ...mono, fontSize: 11.5, color: "var(--muted)" }}>A copy is in your inbox.</span>
          </div>
        </div>

        <div className="split-phone-visual" style={{ display: "flex", justifyContent: "center" }}>
          <PhoneLoop optimized />
        </div>
      </motion.div>
    </div>
  );
}
