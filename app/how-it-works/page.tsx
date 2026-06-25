import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";

export const metadata: Metadata = {
  title: "How It Works | SIMPL",
  description:
    "Three steps between not knowing what's broken and having it fixed. Run the free scan, get the full report, let our team handle the rest.",
  alternates: { canonical: "https://simpl.pro/how-it-works" },
};

const CATEGORY_PREVIEWS = [
  { cat: "Website", grade: "B" },
  { cat: "SEO", grade: "C" },
  { cat: "Content", grade: "D" },
  { cat: "Social", grade: "D" },
  { cat: "Crawl", grade: "B" },
  { cat: "GBP", grade: "C" },
];

const REPORT_ITEMS = [
  "Every finding, ranked by severity",
  "Which issues cost you the most leads",
  "What to fix first vs. what can wait",
  "Category-by-category breakdown with grades",
  "Competitor context for your industry",
];

const TIERS = [
  {
    name: "Core",
    price: "$497/mo",
    desc: "SEO foundations, content fixes, GBP optimization. The essentials that move the needle for most businesses.",
    who: "You know what's broken. You need someone to fix it.",
  },
  {
    name: "Agent",
    price: "$997/mo",
    desc: "Full optimization across all six categories. Ongoing monitoring, monthly reporting, continuous improvement.",
    who: "You want everything handled. No gaps, no guesswork.",
  },
  {
    name: "Pro",
    price: "$1,997/mo",
    desc: "Everything in Agent plus paid ads management, conversion optimization, and growth strategy.",
    who: "You're ready to grow. Not just fix, but scale.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 64px" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 40,
            }}
          >
            How it works
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: 900,
            }}
          >
            How SIMPL works
          </h1>
          <p
            style={{
              marginTop: 28,
              maxWidth: 620,
              fontSize: 19,
              lineHeight: 1.55,
            }}
          >
            Three steps between not knowing what&apos;s broken and having it
            fixed.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Step 1: Run the free scan */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 32,
            }}
          >
            Step 01 / Run the free scan
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              maxWidth: 800,
            }}
          >
            Type your URL. Get your SIMPL Score in 30 seconds.
          </h2>
          <p
            style={{
              marginTop: 20,
              maxWidth: 640,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            No signup, no email, no strings. Just a URL and a button. SIMPL
            checks six categories and grades each one from A through F. Most
            businesses are failing at least three.
          </p>

          {/* Score ring preview + category grades */}
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 40,
              alignItems: "center",
              maxWidth: 600,
            }}
            className="grid-step1-preview"
          >
            {/* Score ring */}
            <div style={{ position: "relative", width: 140, height: 140 }}>
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="var(--rule)"
                  strokeWidth="3"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 62}
                  strokeDashoffset={2 * Math.PI * 62 * 0.38}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 200,
                    color: "var(--accent)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  C+
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}
                >
                  62%
                </span>
              </div>
            </div>

            {/* Category grade chips */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              {CATEGORY_PREVIEWS.map((c) => {
                const color =
                  c.grade.startsWith("D") || c.grade.startsWith("F")
                    ? "#E05252"
                    : c.grade.startsWith("C")
                      ? "#E0A852"
                      : "#8FB4A8";
                return (
                  <div
                    key={c.cat}
                    style={{
                      textAlign: "center",
                      padding: "8px 4px",
                      background: "var(--bg-soft)",
                      border: "1px solid var(--rule)",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 8,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 2,
                      }}
                    >
                      {c.cat}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 400, color }}>
                      {c.grade}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top findings preview */}
          <div style={{ marginTop: 32, maxWidth: 600 }}>
            <div
              className="mono"
              style={{
                fontSize: 9,
                letterSpacing: "0.14em",
                color: "#E05252",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Sample findings
            </div>
            {[
              "Missing meta descriptions on 4 pages",
              "No Google Business Profile found",
              "No schema markup detected",
            ].map((f) => (
              <div
                key={f}
                style={{
                  borderLeft: "2px solid #E05252",
                  paddingLeft: 12,
                  marginBottom: 5,
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: "var(--fg)",
                }}
              >
                {f}
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 32,
              fontSize: 15,
              color: "var(--accent)",
              lineHeight: 1.55,
            }}
          >
            That&apos;s the summary. But the scan found 23 more issues you
            haven&apos;t seen yet.
          </p>
        </section>

        {/* Step 2: Get the full report */}
        <section
          style={{
            background: "var(--bg-soft)",
            borderTop: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 32,
              }}
            >
              Step 02 / Get the full report
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                maxWidth: 800,
              }}
            >
              Enter your email. Unlock every finding, priority-ordered.
            </h2>
            <p
              style={{
                marginTop: 20,
                maxWidth: 640,
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--muted)",
              }}
            >
              The free scan shows you the highlights. The full report shows you
              everything: what&apos;s costing you leads, what to fix first, and
              what can wait. You decide if you want to fix it yourself or let us
              handle it.
            </p>

            {/* What the report includes */}
            <div
              style={{
                marginTop: 48,
                display: "grid",
                gap: 1,
                background: "var(--rule)",
                border: "1px solid var(--rule)",
                maxWidth: 600,
              }}
            >
              {REPORT_ITEMS.map((item, i) => (
                <div
                  key={item}
                  style={{
                    background: "var(--bg)",
                    padding: "18px 24px",
                    display: "grid",
                    gridTemplateColumns: "32px 1fr",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      color: "var(--accent)",
                      fontSize: 12,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.4 }}>{item}</div>
                </div>
              ))}
            </div>

            {/* Email capture preview */}
            <div
              style={{
                marginTop: 40,
                background: "var(--bg)",
                border: "1px solid var(--rule)",
                borderRadius: 4,
                padding: "24px 28px",
                maxWidth: 440,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                Get the full report delivered to your inbox.
              </div>
              <div style={{ display: "flex", gap: 0 }}>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid var(--rule)",
                    borderRight: 0,
                    background: "transparent",
                    color: "var(--muted)",
                    padding: "11px 14px",
                    fontSize: 13,
                    borderRadius: "3px 0 0 3px",
                    fontFamily:
                      "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  your@email.com
                </div>
                <div
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-ink)",
                    padding: "11px 18px",
                    fontSize: 12,
                    borderRadius: "0 3px 3px 0",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 600,
                  }}
                >
                  Send report
                </div>
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 9,
                  color: "var(--muted)",
                  marginTop: 8,
                  letterSpacing: "0.06em",
                }}
              >
                Free. No spam. Delivered in seconds.
              </div>
            </div>

            <p
              style={{
                marginTop: 32,
                fontSize: 15,
                color: "var(--accent)",
                lineHeight: 1.55,
              }}
            >
              Now you know exactly what&apos;s wrong. The question is: who fixes
              it?
            </p>
          </div>
        </section>

        {/* Step 3: Let our team fix it */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 32,
            }}
          >
            Step 03 / Let our team fix it
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              maxWidth: 800,
            }}
          >
            Pick a tier that matches where you are. We do the work.
          </h2>
          <p
            style={{
              marginTop: 20,
              maxWidth: 640,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            You don&apos;t need to learn SEO. You don&apos;t need to manage
            freelancers. You don&apos;t need to figure out what &quot;schema
            markup&quot; means. Pick a plan, and our team handles everything from
            there.
          </p>

          {/* Tier cards */}
          <div
            className="grid-how-tiers"
            style={{
              marginTop: 48,
              display: "grid",
              gap: 1,
              background: "var(--rule)",
              border: "1px solid var(--rule)",
            }}
          >
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                style={{
                  background: "var(--bg)",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                    }}
                  >
                    Simpl.{t.name.toLowerCase()}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 13,
                      color: "var(--fg)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {t.price}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {t.desc}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.4,
                    fontStyle: "italic",
                    color: "var(--fg)",
                    opacity: 0.7,
                    marginTop: 4,
                  }}
                >
                  {t.who}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/start"
              className="cta-primary"
              style={{
                color: "var(--accent-ink)",
                textDecoration: "none",
                padding: "12px 24px",
                fontSize: 14,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              See full tier breakdown →
            </Link>
            <span
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              Every engagement starts with a conversation, not a checkout page.
            </span>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Bottom CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4.5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: 800,
            }}
          >
            Start with the scan. It&apos;s free.
          </h2>
          <p
            style={{
              marginTop: 20,
              maxWidth: 560,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            Takes 30 seconds. No signup. You&apos;ll see your score, your
            grades, and the first batch of findings before you decide anything.
          </p>
          <div style={{ marginTop: 48 }}>
            <ScanTool compact />
          </div>
        </section>
      </main>
      <Footer tagline="Three steps. One team. Your digital presence, handled." />
    </div>
  );
}
