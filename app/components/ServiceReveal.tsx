import Link from "next/link";

/**
 * "What we do" → Custom Website showcase: the REAL Wildgrove site (the same one
 * at /demo/wildgrove), embedded live and scrollable, no slider, no mockups.
 * embed=1 strips the demo's Before/After bar so it's just the site.
 */
export const REVEAL_HREFS = new Set<string>(["/services/website-build"]);

export default function ServiceReveal({ href }: { href: string }) {
  if (!REVEAL_HREFS.has(href)) return null;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9, gap: 8 }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>A real Simpl-built site</span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.06em", color: "var(--fg-dim)", whiteSpace: "nowrap" }}>scroll it &middot; it&apos;s live</span>
      </div>
      <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--rule)", boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)", height: "clamp(420px, 62vh, 560px)", background: "#fff" }}>
        <iframe
          src="/demo/wildgrove?embed=1"
          title="Wildgrove Landscaping, a real site built by Simpl"
          loading="lazy"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
      <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "var(--muted)" }}>
        This is a real, complete site we built, scroll through it. <Link href="/demo/wildgrove" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }}>Open the full demo →</Link>
      </p>
    </div>
  );
}
