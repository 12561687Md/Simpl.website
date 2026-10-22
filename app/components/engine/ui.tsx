import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "../../lib/site";

/**
 * Server-safe building blocks for the revamped B2B pages. Styling lives in
 * app/engine.css ("eg-" classes) so every page shares one rhythm.
 */

export function Section({ children, band = false, id, tight = false }: { children: ReactNode; band?: boolean; id?: string; tight?: boolean }) {
  return (
    <section id={id} className={`eg-section${band ? " eg-band" : ""}`} style={tight ? { paddingTop: 64, paddingBottom: 64 } : undefined}>
      <div className="eg-wrap">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eg-eyebrow">{children}</div>;
}

/** Question-led heading + answer-first paragraph (the AEO pattern). */
export function QA({ eyebrow, q, a, children }: { eyebrow?: string; q: ReactNode; a?: ReactNode; children?: ReactNode }) {
  return (
    <div style={{ marginBottom: 44 }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="eg-h2">{q}</h2>
      {a && <p className="eg-answer">{a}</p>}
      {children}
    </div>
  );
}

export function PrimaryCta({ label = SITE.primaryCta.label, href = SITE.primaryCta.href }: { label?: string; href?: string }) {
  return (
    <Link href={href} className="eg-btn primary cta-primary">
      {label} <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export function GhostCta({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="eg-btn ghost">
      {label}
    </Link>
  );
}

export function Ctas({ secondary }: { secondary?: { label: string; href: string } }) {
  return (
    <div className="eg-ctas">
      <PrimaryCta />
      {secondary && <GhostCta {...secondary} />}
    </div>
  );
}

export function Crumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eg-crumbs">
      <Link href="/">Home</Link>
      {items.map((it, i) => (
        <span key={it.path} style={{ display: "inline-flex", gap: 8 }}>
          <span aria-hidden="true">/</span>
          {i === items.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
        </span>
      ))}
    </nav>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="eg-faq">
      {faqs.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>
            <h3 style={{ all: "inherit", padding: 0, display: "inline" }}>{f.q}</h3>
          </summary>
          <p className="a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Soon() {
  return <span className="eg-soon">Rolling out</span>;
}

/** Closing CTA panel used at the bottom of every money page. */
export function FinalCta({
  heading = "See your own top 25 before you pay anything.",
  body = "Tell us what you sell and where. We'll build a 25-account sample of your market: each account with the reason to call, the record behind it and who decides. Thirty minutes to walk through it together.",
}: { heading?: string; body?: string }) {
  return (
    <Section>
      <div className="eg-cta-panel">
        <h2 className="eg-h2" style={{ maxWidth: 760 }}>{heading}</h2>
        <p className="eg-lead">{body}</p>
        <div className="eg-ctas">
          <PrimaryCta />
          <a href={SITE.phoneHref} className="eg-btn ghost">
            Call {SITE.phone}
          </a>
        </div>
        <p className="mono" style={{ marginTop: 22, fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>
          No account manager, sales team or office in the price. You work directly with the person who builds it.
        </p>
      </div>
    </Section>
  );
}
