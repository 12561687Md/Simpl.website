import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";

export const metadata: Metadata = {
  title: "Why SIMPL | Built for businesses tired of guessing",
  description:
    "Nobody told you your Google listing was broken. That's why we built SIMPL. One scan, six categories, zero guesswork.",
  alternates: { canonical: "https://simpl.pro/about" },
};

const BELIEFS = [
  {
    headline: "Transparency over jargon.",
    body: "You should understand every issue we find without a marketing degree.",
  },
  {
    headline: "Results over retainers.",
    body: "If we're not making you money, we shouldn't be taking yours.",
  },
  {
    headline: "Speed over process.",
    body: "A 30-second scan tells you more than a 3-week discovery phase ever will.",
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
            Nobody told you your Google listing was broken. That&apos;s why we built SIMPL.
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
            Your digital presence has more moving parts than you think. Most of them are breaking quietly.
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
            Your website. Your Google listing. Your reviews. Your social profiles. Your SEO. Your ads. They all affect whether the phone rings tomorrow. Most business owners have no way to know which ones are working and which ones are silently leaking leads. The last person who could tell you was charging $3,000 a month and sending you a PDF full of graphs you didn&apos;t ask for. You&apos;re not bad at marketing. You just never had the right tool.
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
              How we think about it
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
              One scan. Six grades. Every answer.
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
              Type your URL. In 30 seconds, SIMPL checks six areas of your digital presence and grades each one A through F. Every issue ranked by severity. You see exactly what&apos;s costing you leads and what to fix first. No jargon. No 47-page reports. No monthly calls where someone reads you a spreadsheet. You see what&apos;s broken. We fix it. You see the results. That&apos;s the whole thing. Plain and simpl.
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
            SIMPL was built by someone who spent years inside the digital marketing industry watching the same problems on repeat. Businesses overpaying for services they couldn&apos;t measure. Agencies selling retainers with no accountability. Website problems going unnoticed for months while leads quietly disappeared. Every client conversation started the same way: &quot;I&apos;m paying for all this stuff and I have no idea if it&apos;s working.&quot;
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
            The only thing on his mind through all of it was how to make the whole thing simpler for everyone. Not a little simpler. Fundamentally simpler. That obsession became SIMPL. Plain and simpl.
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
            Find out in 30 seconds what most agencies take 3 weeks to tell you.
          </h2>
          <div style={{ marginTop: 48 }}>
            <ScanTool compact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
