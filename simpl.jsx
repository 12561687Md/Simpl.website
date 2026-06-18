// simpl.jsx — shared primitives, header, footer, scan tool
// Used by every SIMPL page. Loaded BEFORE each page's own JSX.
//
// Exposes on window:
//   pageStyles, linkStyle, useReveal, Reveal, PulseDot,
//   Header, Footer, ScanTool, ScanFinding, ShellSection

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

const NAV_ITEMS = [
  { href: "Simpl Homepage.html", label: "Home",            id: "home"   },
  { href: "Scan.html",           label: "The Scan",        id: "scan"   },
  { href: "Discoverability.html",label: "Discoverability", id: "disc"   },
  { href: "Performance.html",    label: "Performance",     id: "perf"   },
  { href: "Reputation.html",     label: "Reputation",      id: "rep"    },
  { href: "Spend.html",          label: "Spend",           id: "spend"  },
];

const pageStyles = {
  shell: { maxWidth: 1120, margin: "0 auto", padding: "0 32px" },
  rule:  { border: 0, borderTop: "1px solid var(--rule)", margin: 0 },
  eyebrow: {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--muted)",
    fontWeight: 400,
  },
};

const linkStyle = { color: "var(--fg)", textDecoration: "none", fontSize: 15, fontWeight: 400 };

function useReveal() {
  const ref = useRefS(null);
  useEffectS(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, as: Tag = "div", style, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

function PulseDot({ size = 7, color = "var(--pulse)" }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: size, height: size }}>
      <span className="pulse-dot" style={{ position: "absolute", inset: 0, background: color, borderRadius: 999 }} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Header — sticky, with full nav                                      */
/* ------------------------------------------------------------------ */

function Header({ active }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 10,
      background: "color-mix(in srgb, var(--bg) 80%, transparent)",
      backdropFilter: "saturate(140%) blur(14px)",
      WebkitBackdropFilter: "saturate(140%) blur(14px)",
      borderBottom: "1px solid var(--rule)",
    }}>
      <div style={{
        ...pageStyles.shell,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72, gap: 24,
      }}>
        <a href="Simpl Homepage.html" style={{
          textDecoration: "none", color: "var(--fg)",
          fontWeight: 500, letterSpacing: "0.32em", fontSize: 15,
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          <PulseDot size={6} />
          SIMPL
        </a>
        <nav style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          {NAV_ITEMS.filter(n => n.id !== "home").map((n) => (
            <a key={n.id} href={n.href}
              className={"nav-link" + (active === n.id ? " active" : "")}>
              {n.label}
            </a>
          ))}
          <a href="Start.html" className="cta-primary" style={{
            color: "var(--accent-ink)", textDecoration: "none",
            padding: "10px 18px", fontSize: 14, letterSpacing: "0.02em",
            borderRadius: 2, marginLeft: 8,
          }}>Start →</a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer({ tag = "Quietly keeping businesses discoverable." }) {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", position: "relative", zIndex: 1 }}>
      <div style={{
        ...pageStyles.shell, padding: "56px 32px 64px",
        display: "grid", gap: 40,
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
        }}>
          <div>
            <div style={{ letterSpacing: "0.32em", fontSize: 14, fontWeight: 500, marginBottom: 12 }}>SIMPL</div>
            <div style={{ color: "var(--muted)", fontSize: 14, maxWidth: 240, lineHeight: 1.5 }}>{tag}</div>
          </div>
          <div>
            <div className="mono" style={{ ...pageStyles.eyebrow, marginBottom: 14 }}>Coverage</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a href="Discoverability.html" style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Discoverability</a>
              <a href="Performance.html"     style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Performance</a>
              <a href="Reputation.html"      style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Reputation</a>
              <a href="Spend.html"           style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Spend</a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ ...pageStyles.eyebrow, marginBottom: 14 }}>The Tool</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a href="Scan.html"  style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>The Scan</a>
              <a href="Start.html" style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Start a trial</a>
              <a href="Start.html#contact" style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Contact</a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ ...pageStyles.eyebrow, marginBottom: 14 }}>Legal</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a href="#privacy" style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Privacy</a>
              <a href="#terms"   style={{ ...linkStyle, fontSize: 14, color: "var(--muted)" }}>Terms</a>
            </div>
          </div>
        </div>
        <div style={{
          paddingTop: 24, borderTop: "1px solid var(--rule)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          color: "var(--muted)", fontSize: 13,
        }}>
          <span className="mono">© 2026 SIMPL.PRO</span>
          <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <PulseDot size={5} /> Operations · steady
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Scan tool — the SIMPL field. Used on Home + Scan + Start pages.    */
/* ------------------------------------------------------------------ */

const SCAN_STEPS = [
  "resolving site…",
  "checking indexing…",
  "reading page speed…",
  "pulling review deltas…",
  "scanning ad inventory…",
];

function ScanTool({ finding, costLabel = "Lost traffic", showFooter = true, onDone }) {
  const [url, setUrl] = useStateS("");
  const [state, setState] = useStateS("idle");
  const [stepIdx, setStepIdx] = useStateS(0);
  const timer = useRefS(null);
  const stepTimer = useRefS(null);

  useEffectS(() => {
    if (state !== "scanning") return;
    setStepIdx(0);
    stepTimer.current = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, SCAN_STEPS.length - 1));
    }, 280);
    return () => clearInterval(stepTimer.current);
  }, [state]);

  function run(e) {
    e && e.preventDefault();
    if (!url.trim()) return;
    setState("scanning");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState("done");
      if (onDone) onDone(url);
    }, 1600);
  }
  function reset() { setState("idle"); setUrl(""); }

  const defaultFinding = "Three service pages are blocked from Google by a robots directive added March 14. Your homepage ranks. Your money pages don't.";

  return (
    <div>
      <form onSubmit={run} className="scan-form ticks" style={{
        display: "flex", alignItems: "stretch",
        borderBottom: "1px solid var(--fg)",
        maxWidth: 760,
      }}>
        <span className="tick-bl" /><span className="tick-br" /><span className="scan-glow" />
        <span className="mono" style={{
          display: "flex", alignItems: "center", paddingRight: 14,
          color: "var(--muted)", fontSize: 14, letterSpacing: "0.04em",
        }}>https://</span>
        <input
          type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="yourbusiness.com"
          style={{
            flex: 1, border: 0, outline: "none", background: "transparent",
            padding: "22px 0", fontSize: 22, color: "var(--fg)",
            letterSpacing: "-0.01em",
          }}
        />
        <button type="submit" style={{
          border: 0, background: "var(--fg)", color: "var(--bg)",
          padding: "0 28px", fontSize: 15, letterSpacing: "0.02em",
          cursor: "pointer", borderRadius: 0,
        }}>
          {state === "scanning" ? "Scanning…" : "Run scan"}
        </button>
      </form>
      <div style={{ marginTop: 32, maxWidth: 760, minHeight: 180 }}>
        {state === "scanning" && (
          <div className="mono" style={{ color: "var(--muted)", fontSize: 13, letterSpacing: "0.04em", lineHeight: 1.9 }}>
            {SCAN_STEPS.slice(0, stepIdx + 1).map((s, i) => (
              <div key={i} style={{ opacity: i === stepIdx ? 1 : 0.55 }}>→ {s}</div>
            ))}
          </div>
        )}
        {state === "done" && (
          <div style={{ border: "1px solid var(--rule)", background: "var(--bg-soft)", padding: "28px 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", columnGap: 28, rowGap: 10, alignItems: "baseline" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase" }}>
                Finding 01
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.55 }}>{finding || defaultFinding}</div>
              <div className="mono" style={{ fontSize: 13, color: "var(--accent)", whiteSpace: "nowrap" }}>{costLabel}</div>
            </div>
            {showFooter && (
              <div style={{
                marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--rule)",
                display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap",
                color: "var(--muted)", fontSize: 14,
              }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  4 more findings waiting
                </span>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginLeft: "auto" }}>
                  <button onClick={reset} style={{
                    background: "transparent", border: 0, color: "var(--fg)",
                    textDecoration: "underline", textUnderlineOffset: 4,
                    cursor: "pointer", padding: 0, font: "inherit",
                  }}>Run another</button>
                  <a href="Start.html" className="cta-primary" style={{
                    color: "var(--accent-ink)",
                    textDecoration: "none", padding: "10px 18px",
                    fontSize: 13, letterSpacing: "0.02em", borderRadius: 2,
                  }}>See the other four →</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page hero — eyebrow / headline / sub used across service pages     */
/* ------------------------------------------------------------------ */

function PageHero({ eyebrow, headline, sub, accentTail, children }) {
  return (
    <section style={{ ...pageStyles.shell, paddingTop: 140, paddingBottom: 96, position: "relative" }}>
      <Reveal>
        <div style={{ ...pageStyles.eyebrow, marginBottom: 48, display: "flex", alignItems: "center", gap: 14 }}>
          <PulseDot size={6} />
          <span>{eyebrow}</span>
          <span className="shimmer-line" aria-hidden="true" style={{ marginLeft: 6 }} />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h1 style={{
          margin: 0,
          fontSize: "clamp(40px, 6.4vw, 81px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          fontWeight: 400,
          maxWidth: 1000,
        }}>
          {headline}
          {accentTail && <><br /><span style={{ color: "var(--muted)" }}>{accentTail}</span></>}
        </h1>
      </Reveal>
      {sub && (
        <Reveal delay={260}>
          <p style={{ marginTop: 40, maxWidth: 680, fontSize: 19, lineHeight: 1.55 }}>
            {sub}
          </p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={380}>
          <div style={{ marginTop: 47 }}>{children}</div>
        </Reveal>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section title — eyebrow + h2 + optional sub                         */
/* ------------------------------------------------------------------ */

function SectionTitle({ eyebrow, h2, sub, align = "left" }) {
  return (
    <>
      <Reveal>
        <div style={{
          ...pageStyles.eyebrow, marginBottom: 28,
          textAlign: align,
          display: align === "center" ? "inline-flex" : "flex",
          alignItems: "center", gap: 12,
          width: align === "center" ? "auto" : undefined,
          justifyContent: align === "center" ? "center" : undefined,
        }}>
          {align === "center" && <span className="shimmer-line" aria-hidden="true" />}
          <span>{eyebrow}</span>
          {align === "center" && <span className="shimmer-line" aria-hidden="true" />}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          margin: 0, textAlign: align,
          fontSize: "clamp(28px, 3.6vw, 41px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          fontWeight: 400,
          maxWidth: align === "center" ? 820 : 820,
          marginLeft: align === "center" ? "auto" : undefined,
          marginRight: align === "center" ? "auto" : undefined,
        }}>{h2}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={140}>
          <p style={{
            color: "var(--muted)", maxWidth: 620, marginTop: 20,
            textAlign: align,
            marginLeft: align === "center" ? "auto" : undefined,
            marginRight: align === "center" ? "auto" : undefined,
          }}>{sub}</p>
        </Reveal>
      )}
    </>
  );
}

/* Expose on window so per-page scripts can use them */
Object.assign(window, {
  pageStyles, linkStyle,
  useReveal, Reveal, PulseDot,
  Header, Footer, ScanTool, PageHero, SectionTitle,
  NAV_ITEMS,
});
