import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "../../lib/site";
import { breadcrumb, ldJson } from "../../lib/schema";

/**
 * Server-rendered building blocks for every marketing page. Styling lives in
 * app/engine.css. Color comes from the section tone, never from the component,
 * so the same card works on ink, paper, deep, mist and accent.
 */

export type Tone = "ink" | "paper" | "deep" | "mist" | "accent";

export function Section({
  children,
  tone = "ink",
  id,
  tight = false,
  className = "",
  label,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  tight?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`eg-section tone-${tone}${tight ? " tight" : ""} ${className}`.trim()}>
      <div className="eg-wrap">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eg-eyebrow">{children}</div>;
}

/** Section heading + answer-first paragraph (the AEO pattern). */
export function QA({ eyebrow, q, a, children, center = false }: { eyebrow?: string; q: ReactNode; a?: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`eg-head${center ? " eg-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="eg-h2">{q}</h2>
      {a && <p className="eg-answer">{a}</p>}
      {children}
    </div>
  );
}

export function PrimaryCta({ label = SITE.primaryCta.label, href = SITE.primaryCta.href }: { label?: string; href?: string }) {
  return (
    <Link href={href} className="eg-btn primary">
      {label} <span className="arr" aria-hidden="true">&rarr;</span>
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

/** The CTA pair used everywhere: the promise, then the plain booking link. */
export function Ctas({ secondary = { label: SITE.book.label, href: SITE.book.href }, primary }: { secondary?: { label: string; href: string } | null; primary?: { label: string; href: string } }) {
  return (
    <div className="eg-ctas">
      <PrimaryCta {...(primary || {})} />
      {secondary && <GhostCta {...secondary} />}
    </div>
  );
}

/** Visible breadcrumb + matching BreadcrumbList JSON-LD, from one array. */
export function Crumbs({ items, schema = true }: { items: { name: string; path: string }[]; schema?: boolean }) {
  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(breadcrumb(items))} />}
      <nav aria-label="Breadcrumb" className="eg-crumbs">
        <Link href="/">Home</Link>
        {items.map((it, i) => (
          <span key={it.path} style={{ display: "inline-flex", gap: 8 }}>
            <span aria-hidden="true">/</span>
            {i === items.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
          </span>
        ))}
      </nav>
    </>
  );
}

export function Pills({ items }: { items: string[] }) {
  return (
    <div className="eg-pills">
      {items.map((p) => (
        <span key={p} className="eg-pill">
          <i aria-hidden="true" />
          {p}
        </span>
      ))}
    </div>
  );
}

/**
 * Page hero. The H1 carries the page's primary keyword; `sub` carries the
 * brand line. `visual` renders in a right column (split) or full width below.
 */
export function Hero({
  crumbs,
  eyebrow,
  h1,
  sub,
  lead,
  pills,
  ctas = true,
  secondary,
  note,
  visual,
  layout = "below",
}: {
  crumbs?: { name: string; path: string }[];
  eyebrow?: string;
  h1: ReactNode;
  sub?: ReactNode;
  lead?: ReactNode;
  pills?: string[];
  ctas?: boolean | ReactNode;
  secondary?: { label: string; href: string } | null;
  note?: ReactNode;
  visual?: ReactNode;
  layout?: "below" | "split";
}) {
  const copy = (
    <div>
      {crumbs && <Crumbs items={crumbs} />}
      {pills && <Pills items={pills} />}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="eg-h1">{h1}</h1>
      {sub && <p className="eg-sub">{sub}</p>}
      {lead && <p className="eg-lead">{lead}</p>}
      {ctas === true ? <Ctas secondary={secondary} /> : ctas || null}
      {note && <p className="eg-note">{note}</p>}
    </div>
  );
  if (visual && layout === "split") {
    return (
      <section className="eg-hero tone-ink">
        <div className="eg-wrap eg-hero-grid">
          {copy}
          <div>{visual}</div>
        </div>
      </section>
    );
  }
  return (
    <section className={`eg-hero tone-ink${visual ? " with-visual" : ""}`}>
      <div className="eg-wrap">
        {copy}
        {visual && <div className="eg-hero-visual">{visual}</div>}
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="eg-faq">
      {faqs.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>
            <h3>{f.q}</h3>
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

/** Numbered step rows: title left, the answer and bullets right. */
export function Steps({ steps }: { steps: { k?: string; h: ReactNode; first?: string; b: string; bullets?: string[] }[] }) {
  return (
    <div className="eg-steps">
      {steps.map((s, i) => (
        <div key={i} className="eg-step">
          <div>
            <div className="k">{s.k || `Step 0${i + 1}`}</div>
            <h3>{s.h}</h3>
          </div>
          <div>
            {s.first && <p className="first">{s.first}</p>}
            <p className="eg-body">{s.b}</p>
            {s.bullets && (
              <ul className="eg-list" style={{ marginTop: 18 }}>
                {s.bullets.map((b) => (
                  <li key={b}>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Without vs with, side by side. */
export function Versus({ without, withUs, withLabel = "With the Account Engine", withoutLabel = "Without it" }: { without: string[]; withUs: ReactNode[]; withLabel?: string; withoutLabel?: string }) {
  return (
    <div className="eg-vs">
      <div className="side">
        <span className="mono-label">{withoutLabel}</span>
        <ul className="eg-list x">
          {without.map((t) => (
            <li key={t}>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mid" aria-hidden="true">
        <span>VS</span>
      </div>
      <div className="side us">
        <span className="mono-label">{withLabel}</span>
        <ul className="eg-list">
          {withUs.map((t, i) => (
            <li key={i}>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Related links block for internal linking at the bottom of money pages. */
export function Related({ heading = "Keep reading", links, tone = "paper" }: { heading?: string; links: { href: string; label: string; desc?: string }[]; tone?: Tone }) {
  return (
    <Section tone={tone} tight label={heading}>
      <h2 className="mono-label" style={{ margin: "0 0 18px", fontWeight: 500 }}>{heading}</h2>
      <div className="eg-g3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="eg-card link">
            <span className="eg-h3" style={{ display: "block" }}>{l.label}</span>
            {l.desc && <p className="eg-body" style={{ fontSize: 15 }}>{l.desc}</p>}
            <span className="go">Read more <span aria-hidden="true">&rarr;</span></span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/** Closing CTA band at the bottom of every page. */
export function FinalCta({
  heading = "See your top prospects before you spend a dollar.",
  body = "Tell us what you sell and where. We build a sample of your market: the accounts worth a call right now, the reason for each, the record behind it and who decides. Then we walk you through it.",
  primary,
}: { heading?: string; body?: string; primary?: { label: string; href: string } }) {
  return (
    <section className="eg-final tone-accent" aria-label="Get started">
      <div className="eg-wrap inner">
        <div>
          <h2 className="eg-h2" style={{ maxWidth: 760 }}>{heading}</h2>
          <p className="eg-answer" style={{ color: "var(--muted)" }}>{body}</p>
          <Ctas primary={primary} secondary={primary?.href === "/book" ? { label: "See your top prospects", href: "/top-prospects" } : undefined} />
        </div>
        <div className="side">
          Prefer to talk first? Call <a href={SITE.phoneHref}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You work directly with the person who builds your engine.
        </div>
      </div>
    </section>
  );
}
