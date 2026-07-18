import ScrollReveal, { StaggerReveal, StaggerItem, WiggleIn } from "./ScrollReveal";
import { GlowCard } from "@/components/ui/spotlight-card";
import { FlowingLinesUp } from "@/components/ui/flowing-lines";

type Pillar = {
  icon: React.ReactNode;
  label: string;
  headline: string;
  body: string;
};

const stroke = {
  fill: "none",
  stroke: "var(--accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PILLARS: Pillar[] = [
  {
    label: "More traffic",
    headline: "More people find you.",
    body: "We win the search, the map, and the first ten seconds on your site, so the customers already looking for what you do land on you instead of the competitor down the street.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M3 17l5-5 4 3 6-7" />
        <path d="M14 8h4v4" />
      </svg>
    ),
  },
  {
    label: "More sales",
    headline: "More of them turn into money.",
    body: "Traffic that doesn't convert is a vanity metric. We tighten the path from click to booked job so the leads you already earn stop leaking away.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 3.5v3M16 3.5v3M4 10h16" />
        <path d="M9.5 14.5l2 2 3.5-4" />
      </svg>
    ),
  },
  {
    label: "Less stress",
    headline: "You stop being the marketing department.",
    body: "You did not start a business to babysit a website and a Google profile. We watch it, fix it, and report what changed, so your time goes back to the work you actually do.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2M9 3h6" />
      </svg>
    ),
  },
];

export default function OutcomePillars() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <FlowingLinesUp />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "104px 32px" }}>
        <ScrollReveal>
          <div className="eyebrow" style={{ marginBottom: 28 }}>More traffic. More sales. Less stress.</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 600, maxWidth: 760 }}>
            You don&apos;t want marketing.
            <br />
            You want <span style={{ color: "var(--accent)" }}>results.</span>
          </h2>
          <p style={{ marginTop: 20, maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            Marketing is the work. This is what the work is for. Three outcomes, and everything we do ladders up to one of them.
          </p>
        </ScrollReveal>

        <StaggerReveal
          each={0.1}
          style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}
        >
          {PILLARS.map((p, i) => (
            <StaggerItem key={p.label} className="h-full">
              <GlowCard glowColor="pink" className="h-full">
                <div style={{ padding: "30px 26px 28px", display: "flex", flexDirection: "column", height: "100%" }}>
                  <WiggleIn
                    delay={0.25 + i * 0.14}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 11,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--accent-soft)",
                      border: "1px solid var(--accent-line)",
                      marginBottom: 22,
                    }}
                  >
                    {p.icon}
                  </WiggleIn>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg)", marginBottom: 12 }}>
                    {p.label}
                  </div>
                  <h3 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.01em" }}>{p.headline}</h3>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "var(--muted)" }}>{p.body}</p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
