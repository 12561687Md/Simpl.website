import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import ScanTool from "./ScanTool";

interface Watch { code: string; title: string; desc: string; }
interface Related { href: string; title: string; blurb: string; }
interface ServicePageProps {
  eyebrow: string; code: string; headline: string; accentTail: string; sub: string;
  subHook?: string;
  watches: Watch[]; watchesHook?: string;
  miss: string[]; missHook?: string;
  findingBody: string; findingStat: string; findingLabel: string;
  findingHook?: string;
  related: Related[];
}

export default function ServicePage(p: ServicePageProps) {
  return (
    <div>
      <Header />
      <main>
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 120px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>{p.eyebrow}</div>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 24 }}>{p.code}</div>
          <h1 style={{ margin: 0, fontSize: "clamp(40px, 6.4vw, 81px)", lineHeight: 1.04, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 1000 }}>
            {p.headline}<br /><span style={{ color: "var(--muted)" }}>{p.accentTail}</span>
          </h1>
          <p style={{ marginTop: 40, maxWidth: 680, fontSize: 19, lineHeight: 1.55 }}>{p.sub}</p>
          {p.subHook && <p style={{ marginTop: 16, maxWidth: 680, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>{p.subHook}</p>}
          <div style={{ marginTop: 47, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Link href="/start" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "18px 28px", fontSize: 15, borderRadius: 2 }}>Start watching this surface →</Link>
            <Link href="/scan" style={{ color: "var(--fg)", textDecoration: "none", padding: "17px 26px", fontSize: 15, border: "1px solid var(--rule)", borderRadius: 2 }}>Run a free scan</Link>
          </div>
        </section>

        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>What we watch</div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 400 }}>The signals that decide whether you exist online.</h2>
            <div style={{ marginTop: 72, display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", background: "var(--rule)", border: "1px solid var(--rule)" }}>
              {p.watches.map((w) => (
                <div key={w.code} style={{ background: "var(--bg)", padding: "40px 36px", minHeight: 240, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase" }}>{w.code}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 400, margin: 0 }}>{w.title}</h3>
                  <div style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>{w.desc}</div>
                </div>
              ))}
            </div>
            {p.watchesHook && <p style={{ marginTop: 40, fontSize: 17, lineHeight: 1.55, color: "var(--muted)", maxWidth: 680 }}>{p.watchesHook}</p>}
          </div>
        </section>

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>What you&apos;re missing without it</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 400 }}>These are real. Every one of them.</h2>
          <div style={{ marginTop: 64, borderTop: "1px solid var(--rule)" }}>
            {p.miss.map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 28, alignItems: "baseline", padding: "28px 0", borderBottom: "1px solid var(--rule)" }}>
                <div className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontSize: 17, lineHeight: 1.55 }}>{m}</div>
              </div>
            ))}
          </div>
          {p.missHook && <p style={{ marginTop: 40, fontSize: 17, lineHeight: 1.55, color: "var(--muted)", maxWidth: 680 }}>{p.missHook}</p>}
        </section>

        <section style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--bg-soft)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>Recent finding</div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
              <p style={{ margin: 0, fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.35, fontWeight: 400, borderLeft: "2px solid var(--accent)", paddingLeft: 28 }}>{p.findingBody}</p>
              <div style={{ border: "1px solid var(--rule)", padding: "32px 28px", background: "var(--bg)" }}>
                <div className="mono" style={{ fontSize: 60, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--accent)" }}>{p.findingStat}</div>
                <div className="mono" style={{ marginTop: 14, fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>{p.findingLabel}</div>
              </div>
            </div>
            {p.findingHook && <p style={{ marginTop: 48, fontSize: 17, lineHeight: 1.55, color: "var(--muted)", maxWidth: 680 }}>{p.findingHook}</p>}
          </div>
        </section>

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 400, marginBottom: 64 }}>But this is just one surface. What about the rest?</h2>
          <div style={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {p.related.map((r) => (
              <Link key={r.href} href={r.href} style={{ background: "var(--bg)", padding: "36px 32px", textDecoration: "none", color: "var(--fg)", display: "flex", flexDirection: "column", gap: 16, minHeight: 200 }}>
                <div style={{ fontSize: 22, fontWeight: 400 }}>{r.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>{r.blurb}</div>
                <div className="mono" style={{ marginTop: "auto", fontSize: 12, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>Read more →</div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--rule)", padding: "140px 0", textAlign: "center" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(36px, 5.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 880, marginInline: "auto" }}>
              Something is probably broken right now.<br /><span style={{ color: "var(--muted)" }}>The scan takes thirty seconds to find out.</span>
            </h2>
            <div style={{ marginTop: 56, maxWidth: 760, marginInline: "auto", textAlign: "left" }}><ScanTool compact /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
