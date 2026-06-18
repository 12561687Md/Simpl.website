// service-page.jsx — shared layout for the four coverage pages
// Loaded by Discoverability / Performance / Reputation / Spend.
// Consumes a `page` prop with the shape defined in each page's HTML.

const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

function ServiceHero({ page }) {
  return (
    <section style={{ ...pageStyles.shell, paddingTop: 140, paddingBottom: 120, position: "relative" }}>
      <Reveal>
        <div style={{ ...pageStyles.eyebrow, marginBottom: 48, display: "flex", alignItems: "center", gap: 14 }}>
          <PulseDot size={6} />
          <span>{page.eyebrow}</span>
          <span className="shimmer-line" aria-hidden="true" style={{ marginLeft: 6 }} />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="mono" style={{
          fontSize: 12, letterSpacing: "0.18em",
          color: "var(--accent)", textTransform: "uppercase",
          marginBottom: 24,
        }}>
          {page.code}
        </div>
      </Reveal>
      <Reveal delay={180}>
        <h1 style={{
          margin: 0,
          fontSize: "clamp(40px, 6.4vw, 81px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          fontWeight: 400,
          maxWidth: 1000,
        }}>
          {page.headline}<br />
          <span style={{ color: "var(--muted)" }}>{page.accentTail}</span>
        </h1>
      </Reveal>
      <Reveal delay={300}>
        <p style={{ marginTop: 40, maxWidth: 680, fontSize: 19, lineHeight: 1.55 }}>
          {page.sub}
        </p>
      </Reveal>
      <Reveal delay={420}>
        <div style={{ marginTop: 47, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <a href="Start.html" className="cta-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            color: "var(--accent-ink)",
            textDecoration: "none", padding: "18px 28px",
            fontSize: 15, letterSpacing: "0.02em", borderRadius: 2,
          }}>
            Start watching this surface
            <span aria-hidden="true" style={{ opacity: 0.7 }}>→</span>
          </a>
          <a href="Scan.html" className="cta-ghost" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            color: "var(--fg)", textDecoration: "none",
            padding: "17px 26px", fontSize: 15, letterSpacing: "0.02em",
            border: "1px solid var(--rule)", borderRadius: 2,
          }}>
            Run a free scan
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function WhatWeWatch({ page }) {
  return (
    <section style={{
      background: "var(--bg-soft)",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
    }}>
      <div style={{ ...pageStyles.shell, paddingTop: 159, paddingBottom: 159 }}>
        <SectionTitle
          eyebrow="What we watch"
          h2="The signals that decide whether you exist online."
          sub="Continuous, hourly. Not a quarterly audit. Not a once-a-year report. The same checks, every hour, forever."
        />
        <div style={{
          marginTop: 72, display: "grid", gap: 1,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          background: "var(--rule)", border: "1px solid var(--rule)",
        }}>
          {page.watches.map((w, i) => (
            <Reveal key={w.code} delay={i * 60}>
              <div style={{
                background: "var(--bg)",
                padding: "40px 36px",
                minHeight: 240,
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                <div className="mono" style={{
                  fontSize: 11, letterSpacing: "0.18em",
                  color: "var(--accent)", textTransform: "uppercase",
                }}>{w.code}</div>
                <div style={{ fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.2, fontWeight: 400 }}>{w.h}</div>
                <div style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>{w.p}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYoureMissing({ page }) {
  return (
    <section style={{ ...pageStyles.shell, paddingTop: 159, paddingBottom: 159 }}>
      <SectionTitle
        eyebrow="What you're missing without it"
        h2="The kinds of things that go wrong quietly."
        sub="A non-exhaustive list of the patterns SIMPL is built to catch in this surface alone."
      />
      <div style={{ marginTop: 64, borderTop: "1px solid var(--rule)" }}>
        {page.miss.map((m, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="finding-row" style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              gap: 28, alignItems: "baseline",
              padding: "28px 16px", borderBottom: "1px solid var(--rule)",
              marginLeft: -16, marginRight: -16,
            }}>
              <div className="mono" style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.12em" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.55 }}>{m}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FindingExample({ page }) {
  return (
    <section style={{
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      background: "var(--bg-soft)",
    }}>
      <div style={{ ...pageStyles.shell, paddingTop: 140, paddingBottom: 140 }}>
        <Reveal>
          <div style={{ ...pageStyles.eyebrow, marginBottom: 32 }}>{page.finding.eyebrow}</div>
        </Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)",
          gap: 56, alignItems: "start",
        }}>
          <Reveal>
            <p style={{
              margin: 0,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.35, letterSpacing: "-0.01em",
              fontWeight: 400,
              borderLeft: "2px solid var(--accent)",
              paddingLeft: 28,
            }}>{page.finding.body}</p>
          </Reveal>
          <Reveal delay={140}>
            <div style={{
              border: "1px solid var(--rule)", padding: "32px 28px",
              background: "var(--bg)",
            }}>
              <div className="mono" style={{
                fontSize: 60, letterSpacing: "-0.02em", lineHeight: 1,
                color: "var(--accent)",
              }}>{page.finding.stat}</div>
              <div className="mono" style={{
                marginTop: 14,
                fontSize: 11, letterSpacing: "0.18em",
                color: "var(--muted)", textTransform: "uppercase",
              }}>{page.finding.statLabel}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RelatedSurfaces({ page }) {
  return (
    <section style={{ ...pageStyles.shell, paddingTop: 140, paddingBottom: 140 }}>
      <SectionTitle
        eyebrow="The other three surfaces"
        h2="Discoverability is one of four. SIMPL watches them all."
      />
      <div style={{
        marginTop: 64, display: "grid", gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        background: "var(--rule)", border: "1px solid var(--rule)",
      }}>
        {page.related.map((r, i) => (
          <Reveal key={r.id} delay={i * 80}>
            <a href={r.href} className="finding-row" style={{
              background: "var(--bg)", padding: "36px 32px",
              textDecoration: "none", color: "var(--fg)",
              display: "flex", flexDirection: "column", gap: 16,
              minHeight: 200,
            }}>
              <div style={{ fontSize: 22, letterSpacing: "-0.01em", fontWeight: 400 }}>{r.title}</div>
              <div style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>{r.blurb}</div>
              <div className="mono" style={{
                marginTop: "auto", fontSize: 12, letterSpacing: "0.14em",
                color: "var(--accent)", textTransform: "uppercase",
              }}>Read more →</div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCTA() {
  return (
    <section style={{
      borderTop: "1px solid var(--rule)",
      position: "relative", overflow: "hidden",
    }}>
      <div className="grid-bg" aria-hidden="true" style={{
        position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none",
      }} />
      <div style={{ ...pageStyles.shell, paddingTop: 140, paddingBottom: 140, position: "relative", textAlign: "center" }}>
        <Reveal>
          <h2 style={{
            margin: 0,
            fontSize: "clamp(36px, 5.2vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            maxWidth: 880, marginLeft: "auto", marginRight: "auto",
          }}>
            Start a free scan.<br />
            <span style={{ color: "var(--muted)" }}>You'll know more in thirty seconds.</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ marginTop: 56, maxWidth: 760, marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
            <ScanTool />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicePage({ page }) {
  return (
    <div>
      <Header active={page.active} />
      <main>
        <ServiceHero page={page} />
        <WhatWeWatch page={page} />
        <WhatYoureMissing page={page} />
        <FindingExample page={page} />
        <RelatedSurfaces page={page} />
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
}

Object.assign(window, { ServicePage });
