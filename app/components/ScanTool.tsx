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
  if (grade.startsWith("A")) return "#8FB4A8";
  if (grade.startsWith("B")) return "#8FB4A8";
  if (grade.startsWith("C")) return "#E0A852";
  return "#E05252";
}

function isValidPhone(phone: string | null | undefined): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10 && /^1[5-7]\d{8,}$/.test(digits)) return false;
  return /[-()+\s]/.test(phone) || (digits.length >= 7 && digits.length <= 11);
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

function ScoreRing({ grade, percentage, size = 130 }: { grade: string; percentage: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percentage / 100);
  const color = gradeColor(grade);

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--rule)" strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: size * 0.35, fontWeight: 200, color, lineHeight: 1, letterSpacing: "-0.04em" }}>
          {grade}
        </span>
        <span style={{ ...mono, fontSize: size * 0.1, color: "var(--muted)", marginTop: 2 }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}

export default function ScanTool({ compact = false, onStateChange }: { compact?: boolean; onStateChange?: (state: "idle" | "scanning" | "done") => void }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { onStateChange?.(state); }, [state, onStateChange]);

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
  const pct = result?.percentage ?? result?.score ?? 0;

  return (
    <div>
      {/* Input */}
      <form onSubmit={run} style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--fg)", maxWidth: 760 }}>
        <span style={{ ...mono, display: "flex", alignItems: "center", paddingRight: 14, color: "var(--muted)", fontSize: 14 }}>https://</span>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="yourbusiness.com"
          style={{ flex: 1, border: 0, outline: "none", background: "transparent", padding: "18px 0", fontSize: 20, color: "var(--fg)", letterSpacing: "-0.01em" }} />
        <button type="submit" disabled={state === "scanning"}
          style={{ border: 0, background: "var(--fg)", color: "var(--bg)", padding: "0 24px", fontSize: 14, cursor: state === "scanning" ? "wait" : "pointer", opacity: state === "scanning" ? 0.7 : 1 }}>
          {state === "scanning" ? "Scanning…" : "Run scan"}
        </button>
      </form>
      {state === "idle" && !compact && (
        <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, letterSpacing: "0.06em", opacity: 0.75 }}>
          Your data stays private. We never store credentials or contact your domain.
        </div>
      )}

      {error && <div style={{ marginTop: 16, color: "#E05252", fontSize: 14 }}>{error}</div>}

      <div style={{ marginTop: 24, minHeight: compact ? 60 : 80 }}>

        {/* Scanning */}
        {state === "scanning" && (
          <div>
            <div style={{ position: "relative", height: 2, background: "var(--rule)", marginBottom: 20, borderRadius: 1, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "var(--accent)", borderRadius: 1, width: `${Math.min(((stepIdx + 1) / SCAN_STEPS.length) * 85 + 10, 95)}%`, transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ ...mono, fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scanning {url}</div>
              <div style={{ ...mono, fontSize: 11, color: "var(--muted)" }}>~{Math.max(20 - (stepIdx + 1) * 2, 2)}s</div>
            </div>
            <div style={{ ...mono, color: "var(--muted)", fontSize: 12, lineHeight: 1.8 }}>
              {SCAN_STEPS.slice(0, stepIdx + 1).map((s, i) => (
                <div key={i} style={{ opacity: i === stepIdx ? 1 : 0.4 }}>→ {s}</div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {state === "done" && result && (
          <div>

            {/* Score + Business Identity — side by side */}
            <div style={{ display: "flex", gap: 32, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
              <ScoreRing grade={result.grade} percentage={pct} size={130} />
              <div style={{ flex: 1, minWidth: 200 }}>
                {result.business?.name && (
                  <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 4 }}>
                    {result.business.name}
                  </div>
                )}
                <div style={{ ...mono, fontSize: 11, color: "var(--muted)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  {result.business?.industry && <span>{result.business.industry}</span>}
                  {result.business?.location && <><span style={{ opacity: 0.3 }}>·</span><span>{result.business.location}</span></>}
                  {isValidPhone(result.business?.phone) && <><span style={{ opacity: 0.3 }}>·</span><span>{result.business.phone}</span></>}
                </div>
                {result.summary && (
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)", margin: "10px 0 0", maxWidth: 500 }}>
                    {result.summary}
                  </p>
                )}
              </div>
            </div>

            {/* Category Grades */}
            {result.categories && (
              <div style={{
                display: "flex", gap: 0, marginBottom: 20,
                border: "1px solid var(--rule)", borderRadius: 4, overflow: "hidden",
              }}>
                {Object.entries(result.categories).map(([name, data], i, arr) => {
                  const short = name
                    .replace("Website Foundation", "Website")
                    .replace("Content & Pages", "Content")
                    .replace("On-Page SEO", "SEO")
                    .replace("Social Presence", "Social")
                    .replace("Google Business Profile", "GBP");
                  return (
                    <div key={name} style={{
                      flex: 1, textAlign: "center", padding: "10px 2px",
                      borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                      background: "var(--bg-soft)",
                    }}>
                      <div style={{ ...mono, fontSize: 8, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden" }}>{short}</div>
                      <div style={{ fontSize: 18, fontWeight: 400, color: gradeColor(data.grade) }}>{data.grade}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Social Presence */}
            {(result.social_profiles?.length > 0 || result.social_missing?.length > 0) && (
              <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ ...mono, fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Social</span>
                {result.social_profiles?.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "#8FB4A8" }} />
                    <span style={{ ...mono, fontSize: 10, color: "#8FB4A8" }}>{p}</span>
                  </div>
                ))}
                {result.social_missing?.filter(p => ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"].includes(p)).map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "#E05252" }} />
                    <span style={{ ...mono, fontSize: 10, color: "var(--muted)", opacity: 0.75 }}>{p}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Findings */}
            {(critical.length > 0 || warnings.length > 0) && (
              <div style={{ marginBottom: 20 }}>
                {critical.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ ...mono, fontSize: 9, letterSpacing: "0.14em", color: "#E05252", textTransform: "uppercase", marginBottom: 6 }}>Fix Now</div>
                    {critical.map((f, i) => (
                      <div key={i} style={{ borderLeft: "2px solid #E05252", paddingLeft: 12, marginBottom: 5, fontSize: 13, lineHeight: 1.4, color: "var(--fg)" }}>
                        {f.title}
                      </div>
                    ))}
                  </div>
                )}
                {warnings.length > 0 && (
                  <div>
                    <div style={{ ...mono, fontSize: 9, letterSpacing: "0.14em", color: "#E0A852", textTransform: "uppercase", marginBottom: 6 }}>Should Fix</div>
                    {warnings.map((f, i) => (
                      <div key={i} style={{ borderLeft: "2px solid #E0A852", paddingLeft: 12, marginBottom: 5, fontSize: 13, lineHeight: 1.4, color: "var(--fg)" }}>
                        {f.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Email Gate + CTA */}
            <div style={{ background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 4, padding: "24px 28px", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6, lineHeight: 1.3 }}>
                    {result.findings_count > 5
                      ? `We found ${result.findings_count} issues — you're only seeing ${result.findings_shown}.`
                      : "You've seen the summary. The full report shows you exactly what to fix and how."}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 16px", lineHeight: 1.5 }}>
                    {(result.critical_count ?? critical.length) > 0
                      ? `${result.critical_count ?? critical.length} critical issue${(result.critical_count ?? critical.length) > 1 ? "s" : ""} need${(result.critical_count ?? critical.length) === 1 ? "s" : ""} attention now. Get the full breakdown — priority order, what to fix first, what can wait.`
                      : "Get the full breakdown with every finding, priority order, and exactly what to fix first."}
                  </p>
                  <div style={{ display: "flex", maxWidth: 400, gap: 0 }}>
                    <input type="email" placeholder="your@email.com"
                      style={{ flex: 1, border: "1px solid var(--rule)", borderRight: 0, background: "transparent", color: "var(--fg)", padding: "11px 14px", fontSize: 13, outline: "none", borderRadius: "3px 0 0 3px", ...mono }} />
                    <a href="/results" style={{ background: "var(--accent)", color: "var(--accent-ink)", padding: "11px 18px", fontSize: 12, textDecoration: "none", borderRadius: "0 3px 3px 0", whiteSpace: "nowrap", display: "flex", alignItems: "center", fontWeight: 600 }}>
                      Send my report →
                    </a>
                  </div>
                  <div style={{ ...mono, fontSize: 9, color: "var(--muted)", marginTop: 8, letterSpacing: "0.06em" }}>Free. No spam. Delivered in seconds.</div>
                </div>
                <div style={{ width: 1, background: "var(--rule)", alignSelf: "stretch", display: "flex" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 160, justifyContent: "center" }}>
                  <a href="/start" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "11px 20px", fontSize: 13, borderRadius: 3, textAlign: "center", fontWeight: 600 }}>
                    Fix this for me →
                  </a>
                  <button onClick={reset} style={{ background: "transparent", border: "1px solid var(--rule)", color: "var(--fg)", cursor: "pointer", padding: "10px 20px", font: "inherit", fontSize: 13, borderRadius: 3 }}>
                    Scan another site
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
