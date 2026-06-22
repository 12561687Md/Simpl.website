"use client";

import { useState, useEffect, useRef } from "react";

const SIMPL_API = "https://simpl-506452749067.us-east1.run.app";
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
  if (grade === "N/A") return "#555";
  if (grade.startsWith("A") || grade.startsWith("B")) return "#8FB4A8";
  if (grade === "C") return "#E0A852";
  return "#E05252";
}

interface Finding { severity: string; title: string; category: string; }
interface BusinessInfo { name: string | null; type: string | null; industry: string | null; location: string | null; phone: string | null; email: string | null; }
interface ScanResult {
  url: string; score: number; percentage: number; grade: string;
  business: BusinessInfo; summary: string;
  response_time_ms: number; ssl_valid: boolean;
  social_profiles: string[]; social_missing: string[];
  categories: Record<string, { grade: string; score?: number; max?: number }>;
  findings: Finding[]; findings_count: number;
  findings_shown: number; findings_hidden: number;
  critical_count: number; warning_count: number; is_free_tier: boolean;
}

const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

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
    stepTimer.current = setInterval(() => setStepIdx((i) => Math.min(i + 1, SCAN_STEPS.length - 1)), 2000);
    return () => { if (stepTimer.current) clearInterval(stepTimer.current); };
  }, [state]);

  function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setState("scanning"); setResult(null); setError(null);
    fetch(SIMPL_API + "/scan/quick", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim() }),
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => {
        if (stepTimer.current) clearInterval(stepTimer.current);
        setResult(data); setState("done");
        try { localStorage.setItem("simpl_scan_result", JSON.stringify(data)); } catch {}
      })
      .catch(() => {
        if (stepTimer.current) clearInterval(stepTimer.current);
        setError("Could not scan that URL. Check the address and try again.");
        setState("idle");
      });
  }

  function reset() { setState("idle"); setUrl(""); setResult(null); setError(null); }

  const critical = result?.findings?.filter(f => f.severity === "critical") || [];
  const warnings = result?.findings?.filter(f => f.severity === "warning") || [];

  return (
    <div>
      {/* Input form */}
      <form onSubmit={run} style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--fg)", maxWidth: 760 }}>
        <span style={{ ...mono, display: "flex", alignItems: "center", paddingRight: 14, color: "var(--muted)", fontSize: 14 }}>https://</span>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="yourbusiness.com"
          style={{ flex: 1, border: 0, outline: "none", background: "transparent", padding: "22px 0", fontSize: 22, color: "var(--fg)", letterSpacing: "-0.01em" }} />
        <button type="submit" disabled={state === "scanning"}
          style={{ border: 0, background: "var(--fg)", color: "var(--bg)", padding: "0 28px", fontSize: 15, cursor: state === "scanning" ? "wait" : "pointer", opacity: state === "scanning" ? 0.7 : 1 }}>
          {state === "scanning" ? "Scanning…" : "Run scan"}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, color: "#E05252", fontSize: 14 }}>{error}</div>}

      <div style={{ marginTop: 32, maxWidth: 760, minHeight: compact ? 80 : 120 }}>

        {/* Scanning progress */}
        {state === "scanning" && (
          <div>
            <div style={{ position: "relative", height: 2, background: "var(--rule)", marginBottom: 24, borderRadius: 1, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "var(--accent)", borderRadius: 1, width: `${Math.min(((stepIdx + 1) / SCAN_STEPS.length) * 85 + 10, 95)}%`, transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ ...mono, fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scanning {url}</div>
              <div style={{ ...mono, fontSize: 11, color: "var(--muted)" }}>~{Math.max(20 - (stepIdx + 1) * 2, 2)}s</div>
            </div>
            <div style={{ ...mono, color: "var(--muted)", fontSize: 13, lineHeight: 1.9 }}>
              {SCAN_STEPS.slice(0, stepIdx + 1).map((s, i) => (
                <div key={i} style={{ opacity: i === stepIdx ? 1 : 0.45 }}>→ {s}</div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {state === "done" && result && (
          <div>

            {/* 1. Business Identity Bar */}
            {result.business?.name && (
              <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 16, marginBottom: 32 }}>
                <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em" }}>{result.business.name}</div>
                <div style={{ ...mono, fontSize: 12, color: "var(--muted)", marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  {result.business.industry && <span>{result.business.industry}</span>}
                  {result.business.location && <><span style={{ opacity: 0.4 }}>·</span><span>{result.business.location}</span></>}
                  {result.business.phone && <><span style={{ opacity: 0.4 }}>·</span><span>{result.business.phone}</span></>}
                </div>
              </div>
            )}

            {/* 2. The Score */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 96, fontWeight: 200, color: gradeColor(result.grade), letterSpacing: "-0.05em", lineHeight: 0.9 }}>
                {result.grade}
              </div>
              <div style={{ ...mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginTop: 12 }}>
                SIMPL Score
              </div>
              <div style={{ fontSize: 32, fontWeight: 300, marginTop: 4, letterSpacing: "-0.02em" }}>
                {result.percentage ?? result.score}%
              </div>
              {result.summary && (
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", marginTop: 16, maxWidth: 480, marginInline: "auto" }}>
                  {result.summary}
                </p>
              )}
            </div>

            {/* 3. Category Grades — single row */}
            {result.categories && (
              <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 32, borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
                {Object.entries(result.categories).map(([name, data]) => {
                  const shortName = name.replace("Website Foundation", "Website").replace("Content & Pages", "Content").replace("Trust & Conversion", "Trust").replace("Schema & Structure", "Schema").replace("On-Page SEO", "SEO").replace("Social Presence", "Social").replace("Google Business Profile", "GBP");
                  return (
                    <div key={name} style={{ flex: 1, textAlign: "center", padding: "16px 4px", borderRight: "1px solid var(--rule)" }}>
                      <div style={{ ...mono, fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{shortName}</div>
                      <div style={{ fontSize: 20, fontWeight: 400, color: gradeColor(data.grade) }}>{data.grade}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. Social Presence — dots */}
            {(result.social_profiles?.length > 0 || result.social_missing?.length > 0) && (
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
                {result.social_profiles?.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 99, background: "#8FB4A8" }} />
                    <span style={{ ...mono, fontSize: 11, color: "#8FB4A8" }}>{p}</span>
                  </div>
                ))}
                {result.social_missing?.filter(p => ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"].includes(p)).map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.4 }}>
                    <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 99, background: "#E05252" }} />
                    <span style={{ ...mono, fontSize: 11, color: "var(--muted)" }}>{p}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Top Findings */}
            {(critical.length > 0 || warnings.length > 0) && (
              <div style={{ marginBottom: 24 }}>
                {critical.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", color: "#E05252", textTransform: "uppercase", marginBottom: 10 }}>Fix Now</div>
                    {critical.map((f, i) => (
                      <div key={i} style={{ borderLeft: "2px solid #E05252", paddingLeft: 16, marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>
                        {f.title}
                      </div>
                    ))}
                  </div>
                )}
                {warnings.length > 0 && (
                  <div>
                    <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", color: "#E0A852", textTransform: "uppercase", marginBottom: 10 }}>Should Fix</div>
                    {warnings.map((f, i) => (
                      <div key={i} style={{ borderLeft: "2px solid #E0A852", paddingLeft: 16, marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>
                        {f.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. The Gate */}
            {(result.findings_hidden ?? 0) > 0 && (
              <div style={{ background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 6, padding: "32px 28px", textAlign: "center", marginBottom: 32 }}>
                <div style={{ ...mono, fontSize: 13, color: "var(--accent)", letterSpacing: "0.1em" }}>
                  +{result.findings_hidden} more findings
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8, marginBottom: 20, lineHeight: 1.5 }}>
                  We found {result.findings_count} issues across your digital presence.<br />
                  Enter your email to see the complete report.
                </p>
                <div style={{ display: "flex", maxWidth: 400, marginInline: "auto", gap: 0 }}>
                  <input type="email" placeholder="your@email.com"
                    style={{ flex: 1, border: "1px solid var(--rule)", borderRight: 0, background: "transparent", color: "var(--fg)", padding: "14px 16px", fontSize: 14, outline: "none", borderRadius: "4px 0 0 4px", ...mono }} />
                  <a href="/results" style={{ background: "var(--accent)", color: "var(--accent-ink)", padding: "14px 20px", fontSize: 13, textDecoration: "none", borderRadius: "0 4px 4px 0", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                    Get the full report →
                  </a>
                </div>
                <div style={{ ...mono, fontSize: 10, color: "var(--muted)", marginTop: 10, opacity: 0.6 }}>No spam. Just your complete audit.</div>
              </div>
            )}

            {/* 7. Bottom CTA */}
            <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
                Every issue above is costing you leads.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button onClick={reset} style={{ background: "transparent", border: 0, color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer", padding: 0, font: "inherit", fontSize: 14 }}>
                  Run another
                </button>
                <a href="/start" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "10px 20px", fontSize: 13, borderRadius: 2 }}>
                  Get started →
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
