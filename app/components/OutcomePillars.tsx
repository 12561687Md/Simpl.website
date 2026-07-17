import ScrollReveal, { StaggerReveal, StaggerItem, WiggleIn } from "./ScrollReveal";
import { GlowCard } from "@/components/ui/spotlight-card";
import { SmokeShader } from "@/components/ui/smoke-shader";

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
    label: "More calls",
    headline: "The phone rings more.",
    body: "We fix the reasons people can't find you or don't trust what they see: your Google listing, your search visibility, the first ten seconds on your site.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />
      </svg>
    ),
  },
  {
    label: "More booked jobs",
    headline: "More of them turn into work.",
    body: "Traffic that doesn't convert is a vanity metric. We tighten the path from click to booked job so the calls you already earn stop leaking away.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 3.5v3M16 3.5v3M4 10h16" />
        <path d="M9.5 14.5l2 2 3.5-4" />
      </svg>
    ),
  },
  {
    label: "Fewer wasted hours",
    headline: "You stop being the marketing department.",
    body: "You did not start a business to babysit a website and a Google profile. We watch it, fix it, and report what changed, so your time goes back to the work.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2M9 3h6" />
      </svg>
    ),
  },
];

export default function OutcomePillars() {
  const smokeMask = "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)";
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* Calm smoke atmosphere behind the glow cards. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ WebkitMaskImage: smokeMask, maskImage: smokeMask }} aria-hidden="true">
        <SmokeShader style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "104px 32px" }}>
        <ScrollReveal>
          <div className="eyebrow" style={{ marginBottom: 28 }}>Why owners hire us</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 760 }}>
            You don&apos;t want marketing.
            <br />
            <span style={{ color: "var(--muted)" }}>You want what it&apos;s supposed to do.</span>
          </h2>
        </ScrollReveal>

        <StaggerReveal
          each={0.1}
          style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}
        >
          {PILLARS.map((p, i) => (
            <StaggerItem key={p.label} className="h-full">
              <GlowCard glowColor="green" className="h-full">
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
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
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
