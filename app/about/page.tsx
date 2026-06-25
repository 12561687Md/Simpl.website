import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";

export const metadata: Metadata = {
  title: "About | SIMPL",
  description:
    "We built SIMPL because nobody should have to guess if their online presence is working. One scan, six categories, a score from 0 to 100.",
  alternates: { canonical: "https://simpl.pro/about" },
};

const BELIEFS = [
  {
    headline: "Transparency over jargon.",
    body: "You should understand every issue we find without a marketing degree.",
  },
  {
    headline: "Results over retainers.",
    body: "If we're not making you money, we shouldn't be charging you money.",
  },
  {
    headline: "Speed over process.",
    body: "A 30-second scan tells you more than a 3-week discovery phase.",
  },
  {
    headline: "Your business, your data.",
    body: "We never sell your information. Your scan results are yours.",
  },
];

export default function AboutPage() {
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
            Why SIMPL
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
            We built SIMPL because nobody should have to guess if their online presence is working.
          </h1>
          <p
            style={{
              marginTop: 28,
              maxWidth: 680,
              fontSize: 19,
              lineHeight: 1.55,
            }}
          >
            Most small businesses are paying for marketing they can&apos;t measure, websites they can&apos;t audit, and listings they don&apos;t know are broken. We got tired of watching it happen.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* The Problem */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 32,
            }}
          >
            The problem
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
            Digital presence is complicated. It shouldn&apos;t be.
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
            Your website, your Google listing, your reviews, your social profiles, your SEO, your ads. They all affect whether the phone rings. Most business owners have no idea which ones are working and which ones are quietly costing them money. The agencies that do know charge $5,000 a month and send you a PDF you don&apos;t read.
          </p>
          <p
            style={{
              marginTop: 24,
              fontSize: 15,
              color: "var(--accent)",
              lineHeight: 1.55,
            }}
          >
            So what if you could see it all in one place, in 30 seconds, without paying anyone?
          </p>
        </section>

        {/* The Approach */}
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
                color: "var(--muted)",
                marginBottom: 32,
              }}
            >
              Our approach
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
              We made it simpl. Plain and simpl.
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
              One scan. Six categories. A score from 0 to 100. Every issue ranked by how much it&apos;s costing you. No jargon, no 47-page reports, no monthly calls where someone reads you a spreadsheet. You see what&apos;s broken. We fix it. You see the results. That&apos;s the whole thing.
            </p>
            <p
              style={{
                marginTop: 24,
                fontSize: 15,
                color: "var(--accent)",
                lineHeight: 1.55,
              }}
            >
              But who would build something like that, and why?
            </p>
          </div>
        </section>

        {/* The Founder */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 32,
            }}
          >
            Who built this
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
            Years in the industry. One obsession.
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
            SIMPL was built by someone who spent years inside the digital marketing industry watching the same problems repeat. Businesses overpaying for services they couldn&apos;t measure. Agencies selling retainers with no accountability. Website issues going unnoticed for months while leads disappeared.
          </p>
          <p
            style={{
              marginTop: 20,
              maxWidth: 640,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            The only thing on his mind through all of it was how to make the whole thing simpler for everyone. Not a little simpler. Fundamentally simpler. That obsession became SIMPL.
          </p>
          <p
            style={{
              marginTop: 24,
              fontSize: 15,
              color: "var(--accent)",
              lineHeight: 1.55,
            }}
          >
            The obsession turned into a set of beliefs. Here&apos;s what drives every decision we make.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What We Believe */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 32,
            }}
          >
            What we believe
          </div>
          <div
            className="grid-beliefs"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--rule)",
              border: "1px solid var(--rule)",
            }}
          >
            {BELIEFS.map((b) => (
              <div
                key={b.headline}
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
                    fontSize: 20,
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {b.headline}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {b.body}
                </div>
              </div>
            ))}
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
            See where you stand. It takes 30 seconds.
          </h2>
          <div style={{ marginTop: 48 }}>
            <ScanTool compact />
          </div>
        </section>
      </main>
      <Footer tagline="Built for the businesses nobody else is watching." />
    </div>
  );
}
