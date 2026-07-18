"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  // Missing or N/A is not a passing grade. Render it neutral grey, never the
  // success color, so an absent category can't masquerade as an A. A passing
  // grade is deliberately --ok (a dedicated success green), not --accent —
  // conflating "this passed" with "this is on brand" was the old system's
  // mistake, and the new brand accent is blue, not green.
  if (!grade || grade === "N/A") return "#8A8D8C";
  if (grade.startsWith("A")) return "var(--ok)";
  if (grade.startsWith("B")) return "var(--ok)";
  if (grade.startsWith("C")) return "#E0A852";
  return "#E05252";
}

function isValidPhone(phone: string | null | undefined): boolean {
  if (!phone) return false;
  if (/^\d+\.\d+$/.test(phone)) return false;
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

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

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

export default function ScanTool({
  compact = false,
  onStateChange,
  initialUrl = "",
  autoRun = false,
}: {
  compact?: boolean;
  onStateChange?: (state: "idle" | "scanning" | "done") => void;
  /** Prefills the input. Without this, a caller that already collected a URL
   *  (e.g. UrlFallbackScanner falling back after finding no verified Google
   *  listing) loses it: this component owns its own `url` state, so the
   *  visitor would otherwise have to retype what they just typed. */
  initialUrl?: string;
  /** Fires `run()` once on mount when true, skipping the extra click a
   *  caller that already has a URL and already got an explicit submit
   *  shouldn't need to ask for again. */
  autoRun?: boolean;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoRan = useRef(false);

  const [reportEmail, setReportEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (autoRun && initialUrl.trim() && !autoRan.current) {
      autoRan.current = true;
      run();
      return;
    }
    if (!compact && window.innerWidth > 768) inputRef.current?.focus();
  }, [compact]);

  useEffect(() => { onStateChange?.(state); }, [state, onStateChange]);

  useEffect(() => {
    if (state !== "scanning") return;
    setStepIdx(0);
    stepTimer.current = setInterval(() => setStepIdx((i) => Math.min(i + 1, SCAN_STEPS.length - 1)), 2000);
    return () => { if (stepTimer.current) clearInterval(stepTimer.current); };
  }, [state]);

  function run(e?: React.FormEvent) {
    e?.preventDefault();
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

  function sendReport(e: React.FormEvent) {
    e.preventDefault();
    if (!reportEmail.trim() || !result) return;
    setEmailState("sending");
    setEmailError(null);
    fetch("/api/capture-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: reportEmail.trim(),
        scanUrl: result.url,
        scanScore: result.percentage ?? result.score,
        scanGrade: result.grade,
        businessName: result.business?.name ?? undefined,
        findings: result.findings,
        categories: result.categories,
      }),
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.success) throw new Error(data.error || "Could not send your report.");
        setEmailState("sent");
      })
      .catch((err) => {
        setEmailState("error");
        setEmailError(err.message || "Could not send your report. Try again.");
      });
  }

  const critical = result?.findings?.filter(f => f.severity === "critical") || [];
  const warnings = result?.findings?.filter(f => f.severity === "warning") || [];
  const pct = result?.percentage ?? result?.score ?? 0;
  const totalIssues = result?.findings_count ?? (critical.length + warnings.length);
  const criticalCount = result?.critical_count ?? critical.length;
  const warningCount = result?.warning_count ?? warnings.length;
  const hiddenCount = result?.findings_hidden ?? 0;

  return (
    <div>
      {/* Input */}
      <form onSubmit={run} style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--fg)", maxWidth: 760, minWidth: 0 }}>
        <span className="hide-mobile" style={{ ...mono, display: "flex", alignItems: "center", paddingRight: 14, color: "var(--muted)", fontSize: 14, flexShrink: 0 }}>https://</span>
        <input ref={inputRef} type="text" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="yourbusiness.com"
          autoCorrect="off" autoCapitalize="none" spellCheck={false}
          style={{ flex: 1, border: 0, outline: "none", background: "transparent", padding: "14px 0", fontSize: "clamp(16px, 4vw, 20px)", color: "var(--fg)", letterSpacing: "-0.01em", minHeight: 48, minWidth: 0 }} />
        <button type="submit" disabled={state === "scanning"}
          style={{ border: 0, background: "var(--fg)", color: "var(--bg)", padding: "0 16px", fontSize: 13, cursor: state === "scanning" ? "wait" : "pointer", opacity: state === "scanning" ? 0.7 : 1, minHeight: 48, flexShrink: 0, whiteSpace: "nowrap" }}>
          {state === "scanning" ? "Scanning…" : "Find what's broken"}
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
              <div style={{ ...mono, fontSize: 11, color: "var(--fg)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scanning {url}</div>
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
        <AnimatePresence>
        {state === "done" && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* Results heading — sets the "here's your diagnosis" moment */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ok)", marginBottom: 14 }}
            >
              Scan complete
            </motion.div>

            {/* Score + Business Identity — side by side, business identity dominant */}
            <div style={{ display: "flex", gap: 32, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
              >
                <ScoreRing grade={result.grade} percentage={pct} size={140} />
              </motion.div>
              <div style={{ flex: 1, minWidth: 220 }}>
                {result.business?.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.1 }}
                  >
                    {result.business.name}
                  </motion.div>
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
                {/* Why you should care — severity breakdown, builds urgency fast */}
                {(criticalCount > 0 || warningCount > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 }}
                    style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginTop: 14 }}
                  >
                    {criticalCount > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 99, background: "#E05252", boxShadow: "0 0 0 3px rgba(224,82,82,0.18)" }} />
                        <span style={{ ...mono, fontSize: 12, color: "#E05252", fontWeight: 600 }}>{criticalCount} critical</span>
                      </div>
                    )}
                    {warningCount > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 99, background: "#E0A852" }} />
                        <span style={{ ...mono, fontSize: 12, color: "#E0A852", fontWeight: 600 }}>{warningCount} warning{warningCount === 1 ? "" : "s"}</span>
                      </div>
                    )}
                    {totalIssues > 0 && (
                      <span style={{ ...mono, fontSize: 11, color: "var(--muted)" }}>· {totalIssues} issue{totalIssues === 1 ? "" : "s"} found</span>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Category Grades */}
            {result.categories && (
              <div className="grid-category-grades" style={{
                display: "grid", gridTemplateColumns: `repeat(${Object.keys(result.categories).length}, 1fr)`,
                gap: 0, marginBottom: 20,
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
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                      style={{
                        textAlign: "center", padding: "10px 2px",
                        borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                        background: "var(--bg-soft)",
                      }}
                    >
                      <div style={{ ...mono, fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden" }}>{short}</div>
                      <div style={{ fontSize: 18, fontWeight: 400, color: gradeColor(data.grade) }}>{data.grade}</div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Social Presence */}
            {(result.social_profiles?.length > 0 || result.social_missing?.length > 0) && (
              <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ ...mono, fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Social</span>
                {result.social_profiles?.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ ...mono, fontSize: 11, color: "var(--ok)", fontWeight: 600 }}>✓</span>
                    <span style={{ ...mono, fontSize: 11, color: "var(--ok)" }}>{p}</span>
                  </div>
                ))}
                {result.social_missing?.filter(p => ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"].includes(p)).map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ ...mono, fontSize: 11, color: "#E05252", fontWeight: 600, opacity: 0.85 }}>✕</span>
                    <span style={{ ...mono, fontSize: 11, color: "var(--muted)", opacity: 0.8 }}>{p}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Findings */}
            {(critical.length > 0 || warnings.length > 0) && (
              <div style={{ marginBottom: 24 }}>
                {critical.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", color: "#E05252", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "#E05252" }} />
                      Fix now
                    </div>
                    {critical.map((f, i) => (
                      <motion.div
                        key={i}
                        className="finding-row"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                        style={{
                          borderLeft: "3px solid #E05252", paddingLeft: 14, paddingTop: 8, paddingBottom: 8,
                          marginBottom: 8, fontSize: 14, lineHeight: 1.45, color: "var(--fg)",
                          background: "rgba(224,82,82,0.05)", borderRadius: "0 3px 3px 0",
                        }}
                      >
                        {f.title}
                      </motion.div>
                    ))}
                  </div>
                )}
                {warnings.length > 0 && (
                  <div>
                    <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", color: "#E0A852", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "#E0A852" }} />
                      Should fix
                    </div>
                    {warnings.map((f, i) => (
                      <motion.div
                        key={i}
                        className="finding-row"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.55 + i * 0.05 }}
                        style={{
                          borderLeft: "2px solid #E0A852", paddingLeft: 14, paddingTop: 7, paddingBottom: 7,
                          marginBottom: 8, fontSize: 14, lineHeight: 1.45, color: "var(--fg)",
                          borderRadius: "0 3px 3px 0",
                        }}
                      >
                        {f.title}
                      </motion.div>
                    ))}
                  </div>
                )}
                {hiddenCount > 0 && (
                  <div style={{ ...mono, fontSize: 11, color: "var(--muted)", marginTop: 4, paddingLeft: 14 }}>
                    + {hiddenCount} more issue{hiddenCount === 1 ? "" : "s"} in your full report
                  </div>
                )}
              </div>
            )}

            {/* Email Gate — single focused action: unlock the rest of the diagnosis */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              style={{
                background: "linear-gradient(180deg, var(--bg-soft), var(--bg))",
                border: "1px solid var(--accent)",
                boxShadow: "0 0 0 1px rgba(137,207,240,0.08), 0 16px 48px -24px var(--accent)",
                borderRadius: 6, padding: "26px 28px", marginBottom: 14,
              }}
            >
              {emailState === "sent" ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "inline-block", width: 9, height: 9, borderRadius: 99, background: "var(--ok)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)" }}>Check your inbox. Your full report is on its way.</div>
                    <a href="/results" style={{ ...mono, fontSize: 11, color: "var(--accent)", letterSpacing: "0.06em", display: "inline-block", marginTop: 8 }}>
                      View full report now →
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                    Unlock the full diagnosis
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 8, lineHeight: 1.35 }}>
                    {totalIssues > result.findings_shown
                      ? `You're seeing ${result.findings_shown} of ${totalIssues} issues we found.`
                      : "Get the complete breakdown sent straight to your inbox."}
                  </div>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "0 0 18px", lineHeight: 1.55, maxWidth: 480 }}>
                    Your email unlocks every finding, the priority order to fix them in, and the exact category breakdown behind your score. No sales call, no spam, just the report.
                  </p>
                  <form onSubmit={sendReport} style={{ display: "flex", maxWidth: 420, gap: 0 }}>
                    <input type="email" required placeholder="your@email.com" value={reportEmail}
                      onChange={(e) => setReportEmail(e.target.value)}
                      disabled={emailState === "sending"}
                      style={{ flex: 1, border: "1px solid var(--rule)", borderRight: 0, background: "var(--bg)", color: "var(--fg)", padding: "13px 14px", fontSize: 14, outline: "none", borderRadius: "3px 0 0 3px", minHeight: 46, ...mono }} />
                    <button type="submit" disabled={emailState === "sending"} className="cta-primary"
                      style={{ color: "var(--accent-ink)", padding: "0 20px", fontSize: 13, border: 0, borderRadius: "0 3px 3px 0", whiteSpace: "nowrap", display: "flex", alignItems: "center", fontWeight: 600, cursor: emailState === "sending" ? "wait" : "pointer", opacity: emailState === "sending" ? 0.7 : 1, minHeight: 46 }}>
                      {emailState === "sending" ? "Sending…" : "Show me everything →"}
                    </button>
                  </form>
                  {emailState === "error" && emailError && (
                    <div style={{ fontSize: 12, color: "#E05252", marginTop: 8 }}>{emailError}</div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                    <span style={{ ...mono, fontSize: 9, color: "var(--accent)" }}>●</span>
                    <span style={{ ...mono, fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.04em" }}>
                      Your data stays private. Free. No spam. Delivered in seconds.
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Secondary actions — separate from the email gate, clearly de-prioritized */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}
            >
              <a href="/start" style={{ ...mono, fontSize: 12.5, color: "var(--fg)", letterSpacing: "0.02em", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: 2 }}>
                Or skip ahead — start fixing this with our team →
              </a>
              <button onClick={reset} style={{ background: "transparent", border: 0, color: "var(--muted)", cursor: "pointer", padding: 0, font: "inherit", fontSize: 12.5, textDecoration: "underline", textUnderlineOffset: 3 }}>
                Try another site
              </button>
            </motion.div>

          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
