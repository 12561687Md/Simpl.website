"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

function gradeColor(g: string) { return !g ? "#8FB4A8" : g.startsWith("A") || g.startsWith("B") ? "#8FB4A8" : g === "C" ? "#E0A852" : "#E05252"; }

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null);
  useEffect(() => { try { const s = localStorage.getItem("simpl_scan_result"); if (s) setResult(JSON.parse(s)); } catch {} }, []);

  if (!result) return (
    <div><Header />
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 96px", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 400, marginBottom: 20 }}>No scan results found</h1>
        <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 40 }}>Run a scan first to see your results.</p>
        <Link href="/" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "14px 28px", fontSize: 15, borderRadius: 2 }}>Run a scan →</Link>
      </section>
      <Footer />
    </div>
  );

  const categories = result.categories || {};
  const findings = result.findings || [];
  const critical = findings.filter((f: any) => f.severity === "critical");
  const warnings = findings.filter((f: any) => f.severity === "warning");
  const info = findings.filter((f: any) => f.severity === "info");

  function FindingGroup({ items, label, color }: { items: any[]; label: string; color: string }) {
    if (!items.length) return null;
    return (
      <div style={{ marginBottom: 36 }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: "0.12em", color, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: color }} />
          {label} ({items.length})
        </div>
        {items.map((f: any, i: number) => (
          <div key={i} style={{ background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 8, padding: "16px 20px", marginBottom: 8, borderLeft: `3px solid ${color}` }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{f.title}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{f.category}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div><Header />
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 12 }}>
          <div style={{ fontSize: "clamp(60px, 10vw, 100px)", fontWeight: 300, color: gradeColor(result.grade), letterSpacing: "-0.03em", lineHeight: 1 }}>{result.grade}</div>
          <div>
            <div style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 500 }}>SIMPL Score: {result.percentage ?? result.score}%</div>
            <div className="mono" style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{result.url}</div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginBottom: 40 }}>
          {result.response_time_ms}ms · SSL {result.ssl_valid ? "valid" : "missing"} · {findings.length} findings
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 48 }}>
          {Object.entries(categories).map(([name, data]: [string, any]) => (
            <div key={name} style={{ background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 8, padding: "18px 16px" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, lineHeight: 1.3 }}>{name}</div>
              <div style={{ fontSize: 28, fontWeight: 300, color: gradeColor(data.grade) }}>{data.grade}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{data.score}/{data.max}</div>
            </div>
          ))}
        </div>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: "0 0 40px 0" }} />

        <FindingGroup items={critical} label="Fix Now" color="#E05252" />
        <FindingGroup items={warnings} label="Should Fix" color="#E0A852" />
        <FindingGroup items={info} label="Good to Know" color="#8FB4A8" />

        <div style={{ marginTop: 48, padding: 32, background: "var(--bg-soft)", border: "1px solid var(--rule)", borderRadius: 8, textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>What happens next</div>
          <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 600, margin: "0 auto 24px" }}>
            Every issue above is costing you leads and revenue. SIMPL monitors your digital presence 24/7 and fixes problems automatically.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/start" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "14px 28px", fontSize: 15, borderRadius: 2 }}>Get started →</Link>
            <Link href="/" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 4, padding: "14px 28px", fontSize: 15 }}>Run another scan</Link>
          </div>
        </div>
      </section>
      <div style={{ height: 80 }} />
      <Footer />
    </div>
  );
}
