"use client";

import { useState, useEffect, useRef } from "react";

const SIMPL_API = "https://simpl-production-7c1b.up.railway.app";
const SCAN_STEPS = [
  "resolving site…",
  "checking SSL certificate…",
  "fetching page content…",
  "analyzing structure…",
  "checking on-page SEO…",
  "scanning for schema markup…",
  "checking social presence…",
  "searching Google Business Profile…",
  "verifying business identity…",
  "calculating SIMPL Score…",
];

function gradeColor(grade: string | undefined) {
  if (!grade) return "#8FB4A8";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#8FB4A8";
  if (grade === "C") return "#E0A852";
  return "#E05252";
}

function severityColor(s: string) {
  return s === "critical" ? "#E05252" : s === "warning" ? "#E0A852" : "#8FB4A8";
}

interface Finding {
  severity: string;
  title: string;
  category: string;
}

interface BusinessInfo {
  name: string | null;
  type: string | null;
  industry: string | null;
  location: string | null;
  phone: string | null;
  email: string | null;
}

interface ScanResult {
  url: string;
  score: number;
  percentage: number;
  grade: string;
  business: BusinessInfo;
  summary: string;
  response_time_ms: number;
  ssl_valid: boolean;
  ssl_days_remaining?: number;
  social_profiles: string[];
  social_missing: string[];
  categories: Record<string, { grade: string; score?: number; max?: number }>;
  findings: Finding[];
  findings_count: number;
  findings_shown: number;
  findings_hidden: number;
  critical_count: number;
  warning_count: number;
  is_free_tier: boolean;
}

export default function ScanTool({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state !== "scanning") return;
    setStepIdx(0);
    stepTimer.current = setInterval(
      () => setStepIdx((i) => Math.min(i + 1, SCAN_STEPS.length - 1)),
      2000
    );
    return () => {
      if (stepTimer.current) clearInterval(stepTimer.current);
    };
  }, [state]);

  function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setState("scanning");
    setResult(null);
    setError(null);

    fetch(SIMPL_API + "/scan/quick", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim() }),
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (stepTimer.current) clearInterval(stepTimer.current);
        setResult(data);
        setState("done");
        try {
          localStorage.setItem("simpl_scan_result", JSON.stringify(data));
        } catch {}
      })
      .catch(() => {
        if (stepTimer.current) clearInterval(stepTimer.current);
        setError("Could not scan that URL. Check the address and try again.");
        setState("idle");
      });
  }

  function reset() {
    setState("idle");
    setUrl("");
    setResult(null);
    setError(null);
  }

  return (
    <div>
      <form
        onSubmit={run}
        style={{
          display: "flex",
          alignItems: "stretch",
          borderBottom: "1px solid var(--fg)",
          maxWidth: 760,
        }}
      >
        <span
          className="mono"
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: 14,
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          https://
        </span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourbusiness.com"
          style={{
            flex: 1,
            border: 0,
            outline: "none",
            background: "transparent",
            padding: "22px 0",
            fontSize: 22,
            color: "var(--fg)",
            letterSpacing: "-0.01em",
          }}
        />
        <button
          type="submit"
          disabled={state === "scanning"}
          style={{
            border: 0,
            background: "var(--fg)",
            color: "var(--bg)",
            padding: "0 28px",
            fontSize: 15,
            cursor: state === "scanning" ? "wait" : "pointer",
            opacity: state === "scanning" ? 0.7 : 1,
          }}
        >
          {state === "scanning" ? "Scanning…" : "Run scan"}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: 16, color: "#E05252", fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: 32, maxWidth: 760, minHeight: compact ? 80 : 120 }}>
        {state === "scanning" && (
          <div>
            {/* Progress bar */}
            <div style={{ position: "relative", height: 2, background: "var(--rule)", marginBottom: 24, borderRadius: 1, overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  background: "var(--accent)",
                  borderRadius: 1,
                  width: `${Math.min(((stepIdx + 1) / SCAN_STEPS.length) * 85 + 10, 95)}%`,
                  transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Scanning {url}
              </div>
              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--muted)" }}
              >
                ~{Math.max(20 - (stepIdx + 1) * 2, 2)}s remaining
              </div>
            </div>
            <div
              className="mono"
              style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.9 }}
            >
              {SCAN_STEPS.slice(0, stepIdx + 1).map((s, i) => (
                <div key={i} style={{ opacity: i === stepIdx ? 1 : 0.55 }}>
                  → {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {state === "done" && result && (
          <div
            style={{
              border: "1px solid var(--rule)",
              background: "var(--bg-soft)",
              padding: "28px 32px",
            }}
          >
            {/* Business identification */}
            {result.business && result.business.name && (
              <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  {result.business.name}
                </div>
                <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {result.business.industry && <span>{result.business.industry}</span>}
                  {result.business.industry && result.business.location && <span>·</span>}
                  {result.business.location && <span>{result.business.location}</span>}
                  {result.business.phone && <><span>·</span><span>{result.business.phone}</span></>}
                </div>
              </div>
            )}

            {/* Score */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 20,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 300,
                  color: gradeColor(result.grade),
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {result.grade}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 500 }}>
                  SIMPL Score: {result.percentage ?? result.score}%
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
                >
                  {result.url} · {result.response_time_ms}ms · SSL{" "}
                  {result.ssl_valid ? "valid" : "missing"}
                </div>
              </div>
            </div>

            {result.categories && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: 8,
                  marginBottom: 20,
                  borderTop: "1px solid var(--rule)",
                  paddingTop: 20,
                }}
              >
                {Object.entries(result.categories).map(([name, data]) => (
                  <div
                    key={name}
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--rule)",
                      borderRadius: 6,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 400,
                        color: gradeColor(data.grade),
                      }}
                    >
                      {data.grade}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social media profiles */}
            {(result.social_profiles?.length > 0 || result.social_missing?.length > 0) && (
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 16, marginBottom: 16 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>
                  Social Presence
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {result.social_profiles?.map((p) => (
                    <span key={p} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 99, background: "#8FB4A822", color: "#8FB4A8", fontFamily: "'JetBrains Mono', monospace" }}>
                      {p}
                    </span>
                  ))}
                  {result.social_missing?.filter(p => ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"].includes(p)).map((p) => (
                    <span key={p} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 99, background: "#E0525222", color: "#E05252", fontFamily: "'JetBrains Mono', monospace", opacity: 0.7 }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {result.summary && (
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 20, marginBottom: 16 }}>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
                  {result.summary}
                </p>
              </div>
            )}

            {/* Top findings */}
            {result.findings && result.findings.length > 0 && (
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 20 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 14 }}>
                  Top {result.findings_shown || result.findings.length} of {result.findings_count} findings
                </div>
                {result.findings.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
                    <span className="mono" style={{ fontSize: 10, padding: "2px 8px", borderRadius: 3, background: severityColor(f.severity) + "22", color: severityColor(f.severity), textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                      {f.severity}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.5 }}>{f.title}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto", whiteSpace: "nowrap" }}>{f.category}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Hidden findings gate */}
            {(result.findings_hidden ?? 0) > 0 && (
              <div style={{ marginTop: 20, padding: "20px 24px", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 6, textAlign: "center" }}>
                <div className="mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                  +{result.findings_hidden} more findings
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 16px", lineHeight: 1.5 }}>
                  Enter your email to see the complete report with all {result.findings_count} findings, detailed category scores, and actionable recommendations.
                </p>
                <a href="/results" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "12px 24px", fontSize: 14, borderRadius: 2, display: "inline-block" }}>
                  Get the full report →
                </a>
              </div>
            )}

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid var(--rule)",
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {result.critical_count > 0
                  ? `${result.critical_count} critical`
                  : ""}
                {result.critical_count > 0 && result.warning_count > 0
                  ? " · "
                  : ""}
                {result.warning_count > 0
                  ? `${result.warning_count} warnings`
                  : ""}
                {result.critical_count === 0 && result.warning_count === 0
                  ? "Looking good"
                  : ""}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <button
                  onClick={reset}
                  style={{
                    background: "transparent",
                    border: 0,
                    color: "var(--fg)",
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    cursor: "pointer",
                    padding: 0,
                    font: "inherit",
                  }}
                >
                  Run another
                </button>
                <a
                  href="/results"
                  className="cta-primary"
                  style={{
                    color: "var(--accent-ink)",
                    textDecoration: "none",
                    padding: "10px 18px",
                    fontSize: 13,
                    letterSpacing: "0.02em",
                    borderRadius: 2,
                  }}
                >
                  Get the full report →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
