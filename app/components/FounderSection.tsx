import ScrollReveal from "./ScrollReveal";
import { StaggerReveal, StaggerItem } from "./ScrollReveal";

const BELIEFS = [
  {
    title: "You should never be the last to know.",
    body: "When your listing drops or your form breaks, you find out from us, not from a slow month. That is the entire point of watching it.",
  },
  {
    title: "You're not paying for overhead.",
    body: "No account manager, no sales floor, no office lease baked into your invoice. That is why the price looks the way it does, and it is the only reason.",
  },
  {
    title: "I'd rather show you what's broken.",
    body: "Every conversation starts with your real score and the real gaps. If there's nothing worth fixing, I'll tell you that too.",
  },
];

export default function FounderSection() {
  return (
    <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
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
        {/* Portrait. Placeholder frame until the real photo drops in: swap the
            inner block for next/image with the same border-radius + ratio. */}
        <ScrollReveal direction="right">
          <div style={{ position: "relative" }}>
            <div
              className="surface-card"
              data-founder-photo="placeholder"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(120% 90% at 50% 0%, rgba(155,255,26,0.06), transparent 55%), linear-gradient(180deg, var(--bg-elev-2), var(--bg-elev))",
              }}
            >
              <div style={{ textAlign: "center", padding: 24 }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--rule-strong)" strokeWidth="1.25" style={{ margin: "0 auto" }}>
                  <circle cx="12" cy="8.5" r="4" />
                  <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
                </svg>
                <div className="mono" style={{ marginTop: 16, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
                  Portrait coming
                </div>
              </div>
            </div>
            {/* Name plate, overlapping the frame corner for depth. */}
            <div
              className="glass"
              style={{
                position: "absolute",
                bottom: -18,
                left: -14,
                padding: "12px 18px",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>Matt DuBois</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--muted)" }}>Founder, SIMPL</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Copy + beliefs */}
        <div>
          <ScrollReveal>
            <div className="eyebrow" style={{ marginBottom: 26 }}>A real person, not a portal</div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 42px)", lineHeight: 1.12, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 560 }}>
              You&apos;ll deal with the person doing the work.
            </h2>
            <p style={{ marginTop: 20, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
              SIMPL isn&apos;t a call center with a logo. It&apos;s built and run by one person who answers your emails and owns the outcome. Here&apos;s what that means for you.
            </p>
          </ScrollReveal>

          <StaggerReveal each={0.1} style={{ marginTop: 36, display: "grid", gap: 4 }}>
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
