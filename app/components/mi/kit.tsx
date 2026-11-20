import Link from "next/link";
import type { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Reveal from "./Reveal";
import MarketForm from "./MarketForm";
import type { PublicRecord, Stat, Source } from "../../lib/records";
import { breadcrumb, ldJson } from "../../lib/schema";

/* ---------- Page shell ---------- */
export function Shell({ children, banner }: { children: ReactNode; banner?: ReactNode }) {
  return (
    <div className="m-page">
      <a href="#main" className="m-skip">Skip to content</a>
      {banner}
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

/* ---------- Breadcrumbs (visual + BreadcrumbList JSON-LD) ---------- */
export function Crumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(breadcrumb(items))} />
      <ol className="m-crumbs" aria-label="Breadcrumb">
        <li><Link href="/">Home</Link></li>
        {items.map((it, i) => (
          <li key={it.path}>{i === items.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}</li>
        ))}
      </ol>
    </>
  );
}

export function PageHero({ crumbs, h1, lead, children }: { crumbs: { name: string; path: string }[]; h1: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="m-pagehero m-hero">
      <div className="m-wrap">
        <Crumbs items={crumbs} />
        <h1 className="m-h1 sm" style={{ maxWidth: 900 }}>{h1}</h1>
        {lead && <p className="m-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function SecHead({ h2, children, id }: { h2: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <Reveal className="m-sechead">
      <h2 className="m-h2" id={id}>{h2}</h2>
      {children}
    </Reveal>
  );
}

/* ---------- Sources ---------- */
export function SourceLine({ sources, pulled, definition }: { sources: Source[]; pulled: string; definition?: string }) {
  return (
    <p className="m-src">
      <span className="k">Source:</span>{" "}
      {sources.map((s, i) => (
        <span key={s.url}>
          {i > 0 && " + "}
          <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
        </span>
      ))}
      . Pulled {pulled}.{definition ? <> {definition}.</> : null}
    </p>
  );
}

/* ---------- A public record, rendered as a paper document ---------- */
export function RecordCard({ r, delay = 0 }: { r: PublicRecord; delay?: number }) {
  return (
    <Reveal as="article" className="m-rec" delay={delay}>
      <div className="when">
        <span className="date">{r.date}</span>
        <span className="place">{r.place}</span>
      </div>
      <h3 className="why">{r.why}</h3>
      <div className="m-paper" role="group" aria-label={`Public record excerpt, ${r.address}`}>
        <div className="hd"><span>{r.docHeader}</span><span>Public record</span></div>
        <div className="addr">{r.address}</div>
        {r.lines.map((l) => (
          <p key={l.text}>{l.hl ? <mark>{l.text}</mark> : l.text}</p>
        ))}
        <div className="rendered">{r.rendered}</div>
      </div>
      <a className="open" href={r.open.url} target="_blank" rel="noopener noreferrer">
        Open the record <span aria-hidden="true">&#8599;</span>
        <span className="sr-only"> (opens the agency&apos;s page in a new tab)</span>
      </a>
      <SourceLine sources={[r.open, ...(r.more || [])]} pulled={r.pulled} />
    </Reveal>
  );
}

/* ---------- Big figure ---------- */
export function Fig({ s }: { s: Stat }) {
  return (
    <div className="m-fig">
      <div className="n">{s.value}</div>
      <div className="l">{s.label}</div>
      <div className="w">{s.where}</div>
      <p className="m-src"><a href={s.source.url} target="_blank" rel="noopener noreferrer">{s.source.name}</a>, pulled {s.pulled}</p>
    </div>
  );
}

/* ---------- A count with sub-counts ---------- */
export function CountCard({ main, subs = [], note }: { main: Stat; subs?: Stat[]; note?: ReactNode }) {
  return (
    <Reveal className="m-count">
      <div className="m-label" style={{ marginBottom: 14 }}>{main.where}, state records</div>
      <div className="n">{main.value}</div>
      <div className="l">{main.label}</div>
      {subs.length > 0 && (
        <ul className="sub">
          {subs.map((s) => (
            <li key={s.id}><b>{s.value}</b><span>{s.label}</span></li>
          ))}
        </ul>
      )}
      {note && <p className="m-body" style={{ fontSize: 14.5, marginTop: 16 }}>{note}</p>}
      <SourceLine sources={[main.source]} pulled={main.pulled} definition={main.definition} />
    </Reveal>
  );
}

/* ---------- FAQ (native details: works without JS) ---------- */
export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="m-faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
          <div className="a">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------- Honest terms (OFFER_AND_PRICING rule 11, decided 2026-11-19) ---------- */
export const TERMS = [
  { t: "Flat price per territory", b: "One number for your market. It does not go up because your reps used it more." },
  { t: "Month to month after setup", b: "Setup is paid once. After that, stay because it works, not because a contract says so." },
  { t: "No credits", b: "You never ration lookups or wonder what a click costs." },
  { t: "No lookup or usage caps", b: "Open every building and every record. Logins are priced by team size and never capped." },
  { t: "No auto-renew trap", b: "If you prepay a year, it renews only when you say yes." },
];

export function Terms() {
  return (
    <ul className="m-terms">
      {TERMS.map((x) => (
        <li key={x.t}><span className="t">{x.t}</span><span className="b">{x.b}</span></li>
      ))}
    </ul>
  );
}

export const WHY_LESS = "You're not paying for an account manager, a sales team, or an office.";

/* ---------- Final CTA with the short form ---------- */
export function FinalCta({ sourcePage, h2 = "See your market.", lead, defaultTrade }: { sourcePage: string; h2?: ReactNode; lead?: ReactNode; defaultTrade?: string }) {
  return (
    <section className="m-final" aria-labelledby="final-cta">
      <div className="m-wrap">
        <div className="m-split">
          <div>
            <h2 className="m-h2" id="final-cta">{h2}</h2>
            <p className="m-lead" style={{ marginTop: 6 }}>
              {lead || <>Tell us your trade and your territory. On a 15-minute call we show you what the public record says about the buildings in it, with the records open on screen.</>}
            </p>
            <p className="m-body" style={{ marginTop: 22 }}>
              Rather talk now? <a className="m-link" href="tel:+19194289452">(919) 428-9452</a> or <a className="m-link" href="mailto:team@simpl.pro">team@simpl.pro</a>.
            </p>
          </div>
          <div className="m-formcard">
            <MarketForm sourcePage={sourcePage} idPrefix={`f${sourcePage.replace(/[^a-z]/gi, "").slice(0, 10) || "home"}`} defaultTrade={defaultTrade} />
          </div>
        </div>
      </div>
    </section>
  );
}
