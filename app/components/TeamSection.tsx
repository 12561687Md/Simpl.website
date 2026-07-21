import ScrollReveal from "./ScrollReveal";
import { StaggerReveal, StaggerItem } from "./ScrollReveal";

// The combined "what we stand for" set (this section absorbed the standalone
// beliefs block, so this is now the single place Simpl states its principles).
const BELIEFS = [
  {
    title: "You should never be the last to know.",
    body: "When your listing drops or your form breaks, you find out from us, not from a slow month. That is the entire point of watching it.",
  },
  {
    title: "Winning beats being busy.",
    body: "Other agencies report activity: posts published, hours logged. We report one thing, whether you are winning more customers than last month. Everything starts there.",
  },
  {
    title: "You're paying for results, not overhead.",
    body: "No account manager, no sales floor, no office lease baked into your invoice. That is why the price looks the way it does, and it is the only reason.",
  },
  {
    title: "We'd rather show you what's broken.",
    body: "Every conversation starts with your real score and the real gaps. If there's nothing worth fixing, we'll tell you that too.",
  },
];

// Real, unfabricated numbers, pulled from the same figures used elsewhere on
// the site (results/page.tsx) rather than invented for this card.
const COVERAGE = [
  { n: "24/7", l: "continuous monitoring" },
  { n: "<4h", l: "typical reply time" },
  { n: "6", l: "areas watched, every scan" },
];

export default function TeamSection() {
  return (
    <section>{/* Transparent so the shared page-wide starfield flows through. */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "104px 32px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
          gap: 64,
          alignItems: "center",
        }}
        className="grid-founder"
      >
        {/* Coverage card: real numbers instead of a person's face, deliberately —
            Simpl is a small team, not a solo act, and a stat is honest where a
            stock-feeling headshot placeholder wasn't earning trust. */}
        <ScrollReveal direction="right">
          <div
            className="surface-card"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              background:
                "radial-gradient(120% 90% at 50% 0%, rgba(137,207,240,0.06), transparent 55%), linear-gradient(180deg, var(--bg-elev-2), var(--bg-elev))",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }} />
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
                The Simpl team
              </div>
            </div>
            <div style={{ display: "grid", gap: 20 }}>
              {COVERAGE.map((c) => (
                <div key={c.l} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span className="mono" style={{ fontSize: 28, fontWeight: 300, color: "var(--fg)", minWidth: 64 }}>{c.n}</span>
                  <span style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.4 }}>{c.l}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Copy + beliefs */}
        <div>
          <ScrollReveal>
            <div className="eyebrow" style={{ marginBottom: 26 }}>A real team, not a portal</div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 42px)", lineHeight: 1.12, letterSpacing: "-0.02em", fontWeight: 500, maxWidth: 560 }}>
              You&apos;ll deal with the team doing the work.
            </h2>
            <p style={{ marginTop: 20, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
              Simpl isn&apos;t a call center reading from a script. It&apos;s a small, hands-on team that answers your emails and owns the outcome. Here&apos;s what we stand for, and what that means for you.
            </p>
          </ScrollReveal>

          <div className="mono" style={{ marginTop: 34, marginBottom: 4, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
            What we stand for
          </div>
          <StaggerReveal each={0.1} style={{ marginTop: 8, display: "grid", gap: 4 }}>
            {BELIEFS.map((b) => (
              <StaggerItem key={b.title}>
                <div style={{ padding: "20px 0", borderTop: "1px solid var(--rule)" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted)", maxWidth: 560 }}>{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
