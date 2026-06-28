"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SIMPL_API = "https://simpl-506452749067.us-east1.run.app";
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

function gradeColor(g: string) {
  if (!g || g === "N/A") return "#555";
  if (g.startsWith("A") || g.startsWith("B")) return "#8FB4A8";
  if (g.startsWith("C")) return "#E0A852";
  return "#E05252";
}

function sevColor(s: string) {
  if (s === "critical") return "#E05252";
  if (s === "warning") return "#E0A852";
  return "#8FB4A8";
}

function sevLabel(s: string) {
  if (s === "critical") return "Fix Now";
  if (s === "warning") return "Should Fix";
  return "Good to Know";
}

function isValidPhone(phone: string | null | undefined): boolean {
  if (!phone) return false;
  if (/^\d+\.\d+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10 && /^1[5-7]\d{8,}$/.test(digits)) return false;
  return /[-()+\s]/.test(phone) || (digits.length >= 7 && digits.length <= 11);
}

function ScoreRing({ grade, percentage, size = 160 }: { grade: string; percentage: number; size?: number }) {
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percentage / 100);
  const color = gradeColor(grade);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--rule)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.35, fontWeight: 200, color, lineHeight: 1, letterSpacing: "-0.04em" }}>{grade}</span>
        <span style={{ ...mono, fontSize: size * 0.1, color: "var(--muted)", marginTop: 4 }}>{percentage}%</span>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("simpl_scan_result");
      if (stored) {
        const freeResult = JSON.parse(stored);
        const scannedUrl = freeResult.url;
        if (scannedUrl) {
          fetch(SIMPL_API + "/scan/full", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: scannedUrl }),
          })
            .then((r) => r.json())
            .then((data) => { setResult(data); setLoading(false); })
            .catch(() => { setResult(freeResult); setLoading(false); });
        } else {
          setResult(freeResult);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "160px 32px", textAlign: "center" }}>
          <div style={{ ...mono, fontSize: 13, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Generating your full report…</div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return (
      <div>
        <Header />
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "160px 32px", textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, marginBottom: 16 }}>No scan results found</h1>
          <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 32 }}>Run a scan first to see your full report.</p>
          <Link href="/" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "12px 24px", fontSize: 14, borderRadius: 3 }}>Find out what's broken →</Link>
        </section>
        <Footer />
      </div>
    );
  }

  const categories = result.categories || {};
  const findings = result.findings || [];
  const biz = result.business || {};
  const pct = result.percentage ?? result.score ?? 0;
  const critical = findings.filter((f: any) => f.severity === "critical");
  const warnings = findings.filter((f: any) => f.severity === "warning");
  const info = findings.filter((f: any) => f.severity === "info");

  // Group findings by category
  const byCategory: Record<string, any[]> = {};
  for (const f of findings) {
    const cat = f.category || "Other";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(f);
  }

  const failingCategories = Object.entries(categories).filter(
    ([, data]: [string, any]) => data.grade && !data.grade.startsWith("A") && !data.grade.startsWith("B") && data.grade !== "N/A"
  );

  return (
    <div>
      <Header />
      <main>

        {/* Report Header */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 32px 0" }}>
          <div style={{ ...mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span>Full Audit Report</span>
            <span>{result.url}</span>
          </div>

          {/* Score + Business */}
          <div style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 40, flexWrap: "wrap" }}>
            <ScoreRing grade={result.grade} percentage={pct} size={160} />
            <div style={{ flex: 1, minWidth: 240 }}>
              {biz.name && (
                <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 6 }}>
                  {biz.name}
                </div>
              )}
              <div style={{ ...mono, fontSize: 12, color: "var(--muted)", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
                {biz.industry && <span>{biz.industry}</span>}
                {biz.location && <><span style={{ opacity: 0.3 }}>·</span><span>{biz.location}</span></>}
                {isValidPhone(biz.phone) && <><span style={{ opacity: 0.3 }}>·</span><span>{biz.phone}</span></>}
              </div>
              {result.summary && (
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg)", margin: "0 0 16px", maxWidth: 500 }}>
                  {result.summary}
                </p>
              )}
              <div style={{ ...mono, fontSize: 11, color: "var(--muted)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <span>{result.response_time_ms}ms response</span>
                <span>SSL {result.ssl_valid ? "valid" : "missing"}</span>
                <span>{findings.length} findings</span>
                {critical.length > 0 && <span style={{ color: "#E05252" }}>{critical.length} critical</span>}
              </div>
            </div>
          </div>
        </section>

        {/* Category Breakdown */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 40px" }}>
          <div className="grid-category-grades" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 0, border: "1px solid var(--rule)", borderRadius: 6, overflow: "hidden",
          }}>
            {Object.entries(categories).map(([name, data]: [string, any], i, arr) => {
              const short = name
                .replace("Website Foundation", "Website")
                .replace("Content & Pages", "Content")
                .replace("On-Page SEO", "SEO")
                .replace("Social Presence", "Social")
                .replace("Google Business Profile", "GBP");
              return (
                <div key={name} style={{
                  textAlign: "center", padding: "16px 8px",
                  borderRight: i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                  background: "var(--bg-soft)",
                }}>
                  <div style={{ ...mono, fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{short}</div>
                  <div style={{ fontSize: 24, fontWeight: 300, color: gradeColor(data.grade) }}>{data.grade}</div>
                  {data.score !== undefined && data.max !== undefined && (
                    <div style={{ ...mono, fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{data.score}/{data.max}</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Social Presence */}
        {(result.social_profiles?.length > 0 || result.social_missing?.length > 0) && (
          <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 40px" }}>
            <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>Social Presence</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {result.social_profiles?.map((p: string) => (
                <span key={p} style={{ ...mono, fontSize: 11, padding: "5px 12px", borderRadius: 99, background: "rgba(143,180,168,0.12)", color: "#8FB4A8" }}>{p}</span>
              ))}
              {result.social_missing?.filter((p: string) => ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"].includes(p)).map((p: string) => (
                <span key={p} style={{ ...mono, fontSize: 11, padding: "5px 12px", borderRadius: 99, background: "rgba(224,82,82,0.1)", color: "#E05252", opacity: 0.7 }}>{p}</span>
              ))}
            </div>
          </section>
        )}

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
        </div>

        {/* Findings by Category */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "40px 32px" }}>
          <div style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 24 }}>
            All Findings ({findings.length})
          </div>

          {Object.entries(byCategory).map(([catName, catFindings]) => {
            const catData = categories[catName];
            const catGrade = catData?.grade;
            return (
              <div key={catName} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{catName}</div>
                  {catGrade && (
                    <div style={{ ...mono, fontSize: 14, color: gradeColor(catGrade), fontWeight: 500 }}>{catGrade}</div>
                  )}
                </div>
                {catFindings.map((f: any, i: number) => (
                  <div key={i} style={{
                    borderLeft: `3px solid ${sevColor(f.severity)}`,
                    background: "var(--bg-soft)",
                    padding: "12px 16px",
                    marginBottom: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.4 }}>{f.title}</div>
                    <div style={{ ...mono, fontSize: 9, color: sevColor(f.severity), textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {sevLabel(f.severity)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </section>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />
        </div>

        {/* CTA Section */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "56px 32px 40px" }}>
          <div style={{ background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 6, padding: "40px 36px", display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 10, lineHeight: 1.3 }}>
                {critical.length > 0
                  ? `${critical.length} critical issue${critical.length > 1 ? "s" : ""} and ${warnings.length} warnings.`
                  : `${findings.length} issues found across your digital presence.`}
              </div>
              <p style={{ fontSize: 15, color: "var(--muted)", margin: "0 0 20px", lineHeight: 1.55 }}>
                {failingCategories.length > 0
                  ? `Your weakest areas: ${failingCategories.slice(0, 3).map(([n]) => n.replace("Website Foundation", "Website").replace("Content & Pages", "Content").replace("On-Page SEO", "SEO").replace("Social Presence", "Social").replace("Google Business Profile", "GBP")).join(", ")}. Every one of these is costing you leads right now.`
                  : "Each of these issues is silently costing you traffic, leads, and revenue."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/start" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "12px 24px", fontSize: 14, borderRadius: 3, fontWeight: 600 }}>
                  Start fixing this →
                </Link>
                <Link href="/" style={{ color: "var(--fg)", textDecoration: "none", padding: "12px 24px", fontSize: 14, border: "1px solid var(--rule)", borderRadius: 3 }}>
                  Try another site
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 180 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ ...mono, fontSize: 24, color: "var(--accent)", fontWeight: 300 }}>24/7</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>continuous monitoring</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ ...mono, fontSize: 24, color: "var(--accent)", fontWeight: 300 }}>&lt;1h</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>alert response time</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ ...mono, fontSize: 24, color: "var(--accent)", fontWeight: 300 }}>30+</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>auto-fix issue types</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <div style={{ height: 40 }} />
      <Footer />
    </div>
  );
}
