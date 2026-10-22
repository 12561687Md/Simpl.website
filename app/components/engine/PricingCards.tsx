import Link from "next/link";
import { PLANS, money } from "../../lib/site";
import { Soon } from "./ui";

/** Base / Pro cards. Data: PLANS in app/lib/site.ts (mirrors the pricing sheet). */
export default function PricingCards() {
  return (
    <>
      <div className="eg-price-grid">
        {PLANS.map((p) => (
          <div key={p.id} className={`eg-plan${p.id === "pro" ? " pro" : ""}`}>
            {"badge" in p && p.badge && <div className="badge">{p.badge}</div>}
            <div className="name">{p.name}</div>
            <div className="price">
              {money(p.monthly)}
              <span>/ month</span>
            </div>
            <div className="setup">
              <b>{money(p.setup)}</b> one-time setup
            </div>
            <p className="tag">{p.tag}</p>

            <div className="vs">
              <div className="lbl">What this costs anywhere else</div>
              {p.replaces.map(([k, v]) => (
                <div key={k} className="row">
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
              <div className="row tot">
                <span>{p.name}</span>
                <b>{money(p.monthly)}/mo</b>
              </div>
            </div>

            <div className="fl">{p.featLead}</div>
            <ul className="eg-list">
              {p.features.map((f) => (
                <li key={f.b}>
                  <span>
                    <b>{f.b}</b> {f.t}
                    {"soon" in f && f.soon && <Soon />}
                  </span>
                </li>
              ))}
            </ul>

            <div className="btn-row">
              <Link href={p.cta.href} className={`eg-btn ${p.id === "pro" ? "primary cta-primary" : "ghost"}`}>
                {p.cta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 22, fontSize: 15, color: "var(--muted)", maxWidth: 820, lineHeight: 1.6 }}>
        <b style={{ color: "var(--fg)" }}>See your own top 25 before you pay anything.</b> You own your portal, your lists and your data.
        Items marked <Soon /> are in build now; you get a date for each one on the call, and we never call them done until they are.
      </p>
    </>
  );
}
