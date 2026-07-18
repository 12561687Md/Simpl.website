import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", background: "var(--bg-soft)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 32px 40px" }}>

        {/* Top row: logo + columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="grid-footer">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
              <span style={{ fontWeight: 500, letterSpacing: "0.32em", fontSize: 14 }}>SIMPL</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
              Your digital presence, handled. One scan to see what's broken. One team to fix it.
            </p>
            <a href="mailto:team@simpl.pro" className="mono" style={{ display: "inline-block", marginTop: 16, fontSize: 12, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>
              team@simpl.pro
            </a>
            <a href="tel:+19194289452" className="mono" style={{ display: "block", marginTop: 10, fontSize: 12, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2, width: "fit-content" }}>
              Call now: (919) 428-9452
            </a>
          </div>

          {/* Product */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Product</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/scan" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Free Scan</Link>
              <Link href="/about" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Why SIMPL</Link>
              <Link href="/start" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Pricing</Link>
              <Link href="/results" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Results</Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Services</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/services/quick-wins" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Quick Wins</Link>
              <Link href="/services/local-seo" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Local SEO</Link>
              <Link href="/services/paid-ads" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Paid Ads</Link>
              <Link href="/services/organic-growth" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Organic Growth</Link>
              <Link href="/services/strategy" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Strategy</Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Resources</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/how-it-works" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>How It Works</Link>
              <Link href="/blog" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Blog</Link>
              <Link href="/faq" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>FAQ</Link>
              <Link href="/success-stories" style={{ color: "var(--fg)", textDecoration: "none", fontSize: 14 }}>Success Stories</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>
            &copy; {new Date().getFullYear()} SIMPL. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 12 }}>Privacy</Link>
            <Link href="/terms" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 12 }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
