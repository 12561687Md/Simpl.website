"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RELATIONSHIP_OPTIONS } from "../lib/scan-types";
import type { PlaceDetails, ScanResult, Relationship } from "../lib/scan-types";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

// How many findings are visible before the gate. Enough to prove the scan is
// real and specific, few enough that the rest is worth an email.
const FREE_FINDINGS = 3;

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

const SIMPL_API = "https://simpl-506452749067.us-east1.run.app";

export default function ScanReport({ place, result }: { place: PlaceDetails; result: ScanResult }) {
  const [step, setStep] = useState<"email" | "relationship" | "unlocked">("email");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [optIn, setOptIn] = useState(true);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // The complete result. /scan/quick deliberately withholds most findings, so
  // the unlock isn't a CSS reveal: it's a second call that returns the other
  // twelve. Until it lands there is genuinely nothing more to show.
  const [full, setFull] = useState<ScanResult | null>(null);
  const reduce = useReducedMotion();

  const unlocked = step === "unlocked";
  const active = full ?? result;

  const pct = active.percentage ?? active.score ?? 0;
  const findings = active.findings ?? [];
  const ordered = [
    ...findings.filter((f) => f.severity === "critical"),
    ...findings.filter((f) => f.severity === "warning"),
    ...findings.filter((f) => f.severity !== "critical" && f.severity !== "warning"),
  ];
  const visible = unlocked ? ordered : ordered.slice(0, FREE_FINDINGS);
  // Count from the scan's own total, not the array length: the array is short
  // by design before the gate.
  const totalFindings = result.findings_count ?? ordered.length;
  const lockedCount = Math.max(totalFindings - FREE_FINDINGS, 0);

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setErr(null);
    // No network call yet. The address is only worth saving once we know who
    // they are, and asking the qualifier here keeps the perceived cost at one
    // field per screen.
    setStep("relationship");
  }

  function submitRelationship(rel: Relationship) {
    setRelationship(rel);
    setSending(true);
    setErr(null);

    // Fetch the complete findings and save the lead in parallel. The unlock is
    // gated on the report call only: the visitor is owed their results whether
    // or not our CRM write succeeds.
    const fullReq = fetch(`${SIMPL_API}/scan/full`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: result.url, email: email.trim() }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("report failed");
        return r.json() as Promise<ScanResult>;
      })
      .then((data) => setFull(data));

    const capture = fetch("/api/capture-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        scanUrl: result.url,
        scanScore: pct,
        scanGrade: result.grade,
        businessName: place.name ?? result.business?.name ?? undefined,
        placeId: place.placeId,
        relationship: rel,
        optIn,
        findings: result.findings,
        categories: result.categories,
      }),
    }).catch(() => {
      // Logged, never surfaced. A failed lead write is our problem, and holding
      // the report hostage over it would punish the visitor for our outage.
      console.error("capture-email failed");
    });

    Promise.allSettled([fullReq, capture]).then(() => {
      setSending(false);
      // A failed full-report call is the one case worth saying out loud: the
      // alternative is silently showing three findings while claiming all
      // seventeen are unlocked.
      setFull((prev) => {
        if (!prev) setErr("We couldn't load every finding. Your emailed report has the full list.");
        return prev;
      });
      setStep("unlocked");
    });
  }

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
              No rating is shown as no rating. */}
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
        <div className="grid-category-grades" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Object.keys(result.categories).length}, 1fr)`,
          border: "1px solid var(--rule)",
          borderRadius: 6,
          overflow: "hidden",
          marginBottom: 30,
        }}>
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
        {visible.map((f, i) => (
          <motion.div
            key={`${f.title}-${i}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: Math.min(0.4 + i * 0.05, 1) }}
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

        {/* Locked findings. Real rows, blurred and inert, so the value behind
            the gate is visibly specific rather than a promise. */}
        {!unlocked && lockedCount > 0 && (
          <div style={{ position: "relative", marginTop: 4 }}>
            <div aria-hidden="true" style={{ filter: "blur(6px)", opacity: 0.5, userSelect: "none", pointerEvents: "none" }}>
              {ordered.slice(FREE_FINDINGS, FREE_FINDINGS + 3).map((f, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `3px solid ${f.severity === "critical" ? "#E05252" : "#E0A852"}`,
                    padding: "10px 0 10px 14px",
                    marginBottom: 8,
                    fontSize: 14.5,
                    lineHeight: 1.45,
                  }}
                >
                  {f.title}
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
                background: "linear-gradient(180deg, transparent, var(--bg) 82%)",
              }}
            >
              <span style={{ ...mono, fontSize: 12, color: "var(--muted)" }}>
                + {lockedCount} more issue{lockedCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Gate */}
      {!unlocked ? (
        <div
          style={{
            background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
            border: "1px solid var(--accent)",
            boxShadow: "0 0 0 1px rgba(155,255,26,0.08), 0 16px 48px -24px var(--accent)",
            borderRadius: 8,
            padding: "28px 30px",
          }}
        >
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: reduce ? 0 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -10 }}
                transition={{ duration: 0.22 }}
              >
                <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
                  Step 1 of 2
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, lineHeight: 1.35 }}>
                  You&apos;re seeing {visible.length} of {ordered.length + (result.findings_hidden ?? 0)} issues we found.
                </div>
                <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "0 0 18px", lineHeight: 1.55, maxWidth: 480 }}>
                  Unlock every finding and the order to fix them in. Your report opens right here, and we&apos;ll email you a link so you can come back to it.
                </p>
                <form onSubmit={submitEmail} style={{ display: "flex", maxWidth: 440 }}>
                  <label htmlFor="gate-email" className="sr-only">Your email address</label>
                  <input
                    id="gate-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      ...mono,
                      flex: 1,
                      border: "1px solid var(--rule)",
                      borderRight: 0,
                      background: "var(--bg)",
                      color: "var(--fg)",
                      padding: "13px 14px",
                      fontSize: 14,
                      outline: "none",
                      borderRadius: "4px 0 0 4px",
                      minHeight: 48,
                      minWidth: 0,
                    }}
                  />
                  <button
                    type="submit"
                    className="cta-primary"
                    style={{
                      color: "var(--accent-ink)",
                      padding: "0 20px",
                      fontSize: 13,
                      border: 0,
                      borderRadius: "0 4px 4px 0",
                      whiteSpace: "nowrap",
                      fontWeight: 600,
                      cursor: "pointer",
                      minHeight: 48,
                    }}
                  >
                    Continue →
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="rel"
                initial={{ opacity: 0, x: reduce ? 0 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -10 }}
                transition={{ duration: 0.22 }}
              >
                <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
                  Step 2 of 2
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 18, lineHeight: 1.35 }}>
                  What&apos;s your relationship to {place.name ?? "this business"}?
                </div>

                <div role="group" aria-label="Your relationship to this business" style={{ display: "grid", gap: 8, maxWidth: 460 }}>
                  {RELATIONSHIP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={sending}
                      onClick={() => submitRelationship(opt.value)}
                      style={{
                        textAlign: "left",
                        padding: "14px 16px",
                        borderRadius: 5,
                        border: "1px solid var(--rule)",
                        background: relationship === opt.value ? "rgba(155,255,26,0.08)" : "var(--bg)",
                        color: "var(--fg)",
                        fontSize: 14.5,
                        cursor: sending ? "wait" : "pointer",
                        minHeight: 48,
                        transition: "border-color 140ms ease, background 140ms ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 18, maxWidth: 460, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={optIn}
                    onChange={(e) => setOptIn(e.target.checked)}
                    style={{ marginTop: 3, accentColor: "var(--accent)", width: 15, height: 15, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                    Keep watching my score and my competitors. Email me when something changes.
                  </span>
                </label>

                {err && <div style={{ fontSize: 12.5, color: "#E05252", marginTop: 10 }}>{err}</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingTop: 8 }}
        >
          <span style={{ ...mono, fontSize: 12, color: err ? "#E0A852" : "var(--muted)", maxWidth: 560, lineHeight: 1.5 }}>
            {err ?? `Full report unlocked. We sent a copy to ${email}.`}
          </span>
          <a
            href="/start"
            className="cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "var(--accent-ink)",
              padding: "13px 22px",
              fontSize: 13.5,
              fontWeight: 600,
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            Start fixing this →
          </a>
        </motion.div>
      )}
    </div>
  );
}
