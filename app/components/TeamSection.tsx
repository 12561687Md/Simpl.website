import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { StaggerReveal, StaggerItem } from "./ScrollReveal";

// The combined "what we stand for" set (this section absorbed the standalone
// beliefs block, so this is now the single place Simpl states its principles).
const BELIEFS = [
  {
    title: "You should never be the last to know.",
    body: "When your listing drops or a form breaks, you hear it from us first, not from a slow month.",
  },
  {
    title: "Winning beats being busy.",
    body: "We don't report posts published or hours logged. We report whether you're winning more customers than last month.",
  },
  {
    title: "You pay for results, not overhead.",
    body: "No account manager, no sales floor, no office lease in your invoice. That's the only reason the price looks the way it does.",
  },
  {
    title: "We'd rather show you what's broken.",
    body: "Every conversation starts with your real score and the real gaps. If there's nothing worth fixing, we'll say so.",
  },
];

export default function TeamSection() {
  return (
    <section>{/* Transparent so the shared page-wide starfield flows through. */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "88px 32px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
          gap: 64,
          alignItems: "center",
        }}
        className="grid-founder"
      >
        {/* Founder photo: a real face is the least corny, most trust-building
            thing this section can hold. Drop the headshot at
            public/team/matt-dubois.jpg. */}
        <ScrollReveal direction="right">
          <figure
            className="surface-card"
            style={{
              margin: "0 auto",
              maxWidth: 320,
              width: "100%",
              position: "relative",
              aspectRatio: "4 / 5",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--rule)",
              boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
            }}
          >
            <Image
              src="/team/matt-dubois.png"
              alt="Matt DuBois, founder and CEO of Simpl"
              fill
              sizes="(max-width: 900px) 100vw, 380px"
              style={{ objectFit: "cover", objectPosition: "50% 18%" }}
            />
            {/* Scrim sits over the dark blazer at the bottom of the frame, so the
                white caption stays legible without dimming his face. */}
            <figcaption
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "56px 24px 22px",
                background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.78))",
                display: "flex",
                alignItems: "center",
                gap: 11,
              }}
            >
              <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", flexShrink: 0 }} />
              <span style={{ display: "grid", gap: 2 }}>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>Matt DuBois</span>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>
                  Founder &amp; CEO
                </span>
              </span>
            </figcaption>
          </figure>
        </ScrollReveal>

        {/* What we stand for: the mission folded into one short intro, then the
            principles. Kept tight so the section doesn't eat the scroll. */}
        <div>
          <ScrollReveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>What we stand for</div>
            <p style={{ margin: 0, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
              Simpl was born inside the digital marketing industry, watching owners overpay for services they couldn&apos;t measure and agencies bill for busywork. We built the opposite: one team, one honest number, and an obsession with making it radically simpler. Plain and simpl.
            </p>
          </ScrollReveal>
          <StaggerReveal each={0.09} style={{ marginTop: 28, display: "grid", gap: 2 }}>
            {BELIEFS.map((b) => (
              <StaggerItem key={b.title}>
                <div style={{ padding: "16px 0", borderTop: "1px solid var(--rule)" }}>
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
