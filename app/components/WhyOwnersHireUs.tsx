const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The second section: concrete reasons owners hire us, each a distinct promise.
 * The looping phone that used to sit beside this now lives in the hero card, so
 * this is a single, centered text panel (no phone) to avoid two phones stacked
 * back to back. No scroll-reveal animation: renders fully visible in raw HTML.
 */

const REASONS = [
  {
    t: "You'll see problems before your customers do.",
    b: "We watch your site, your Google profile and your rankings around the clock. When something breaks or slips, you hear it from us first, not from a phone that stopped ringing.",
  },
  {
    t: "We watch your competitors so you don't have to.",
    b: "You'll know exactly who's ahead of you locally, for which searches, and what it takes to pass them. Every month, the gap gets smaller.",
  },
  {
    t: "One team for everything you're online.",
    b: "Website, SEO, Google Business Profile, reviews, ads. Not five vendors and five invoices. One team, one number to call, one score that tells you it's working.",
  },
];

export default function WhyOwnersHireUs() {
  return (
    <section style={{ overflow: "hidden", padding: "clamp(40px, 7vw, 72px) 24px" }}>
      <div
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "clamp(28px, 5vw, 48px)",
          border: "1px solid var(--rule)",
          borderRadius: 24,
          background: "rgba(255,255,255,0.018)",
          boxShadow: "0 24px 70px -34px rgba(0,0,0,0.85)",
        }}
      >
        <div
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 12 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
          Why owners hire us
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, maxWidth: 620 }}>
          You run the business. We run the internet.
        </h2>

        <div style={{ marginTop: 36, display: "grid", gap: 26 }}>
          {REASONS.map((r) => (
            <div key={r.t} style={{ paddingLeft: 18, borderLeft: "2px solid var(--accent)" }}>
              <div style={{ fontSize: 17.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 7 }}>{r.t}</div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{r.b}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <a
            href="/start-now"
            style={{ ...mono, fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 3 }}
          >
            See how we fit your business →
          </a>
        </div>
      </div>
    </section>
  );
}
