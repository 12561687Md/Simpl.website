import type { ReactNode } from "react";

/**
 * Coded mockups of an Account Engine portal: Home, Call list, Account page.
 *
 * Styled after the live client portal (dark rail, sky-blue accent, score
 * pills, source chips), but every account, person and number here is
 * FICTIONAL sample data. No real client or prospect appears, by design:
 * a client's prospect list is confidential. Server-rendered, no JS, scales
 * with its container via container-query units (see .pm-* in engine.css).
 */

export function BrowserFrame({ url = "yourcompany.simpl.pro", children, caption, label }: { url?: string; children: ReactNode; caption?: string; label: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="pm-frame" role="img" aria-label={label}>
        <div className="pm-chrome" aria-hidden="true">
          <div className="dots"><i /><i /><i /></div>
          <div className="url">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            {url}
          </div>
          <div className="sp" />
        </div>
        <div aria-hidden="true">{children}</div>
      </div>
      {caption && <figcaption className="pm-cap">{caption}</figcaption>}
    </figure>
  );
}

const NAV = [
  { b: "Home", s: "Your day, in one place", k: "home" },
  { b: "Call list", s: "Ranked every morning", k: "calls", n: "12" },
  { b: "The map", s: "Your territory", k: "map" },
  { b: "Pipeline", s: "Every open deal", k: "pipe" },
  { b: "All accounts", s: "The whole market", k: "all" },
];

function Rail({ active }: { active: string }) {
  return (
    <div className="pm-rail">
      <div className="pm-brand"><i />Your Company</div>
      {NAV.map((n) => (
        <div key={n.k} className={`pm-nav${n.k === active ? " on" : ""}`}>
          <b>{n.b}{n.n && <em>{n.n}</em>}</b>
          <span>{n.s}</span>
        </div>
      ))}
      <div className="foot">Powered by Simpl</div>
    </div>
  );
}

function Top() {
  return (
    <div className="pm-top">
      <div className="pm-search">Search any account, owner or address</div>
      <span className="pm-live"><i />Live data, updated 6:02 AM</span>
      <span className="pm-count">12 TO CALL NOW</span>
      <span className="pm-avatar">DK</span>
    </div>
  );
}

export type MockRow = { score: number; title: string; why: string; meta: string[] };

const HOME_ROWS: MockRow[] = [
  { score: 91, title: "Lakemont School District", why: "Posted a bid for network cabling and Wi-Fi", meta: ["E-Rate filing"] },
  { score: 88, title: "Harbor Crest Apartments", why: "Sold last month, new owner", meta: ["Deed record"] },
  { score: 84, title: "Fernbrook Memory Care", why: "New license, opening this spring", meta: ["State license"] },
  { score: 79, title: "Oakline Office Park", why: "Renovation permit, 2 floors", meta: ["County permit"] },
  { score: 76, title: "Westvale Surgical Center", why: "Inspection due within 90 days", meta: ["CMS record"] },
];

/** Home: the morning view. */
export function PortalHome({ rows }: { rows?: MockRow[] }) {
  const custom = rows && rows.length >= 3 ? rows : null;
  const best = custom ? custom[0] : { score: 94, title: "", why: "", meta: [] as string[] };
  const rest = custom ? [...custom.slice(1), ...HOME_ROWS].slice(0, 4) : HOME_ROWS.slice(0, 4);
  return (
    <div className="pm-screen">
      <Rail active="home" />
      <div className="pm-main">
        <Top />
        <div className="pm-body">
          <div className="pm-hello">
            <div>
              <h4>Good morning, Dana</h4>
              <p>12 accounts have a reason to hear from you today. 3 changed overnight.</p>
            </div>
            <span className="pm-btn ghost">Morning briefing</span>
          </div>
          <div className="pm-grid">
            <div className="pm-col">
              <div className="pm-card best">
                <div className="pm-lbl"><span>Best call right now</span><b>Why now</b></div>
                <div className="pm-acct">
                  <div className="pm-score">{best.score}</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="pm-t">{custom ? best.title : "Cedar Hollow Assisted Living"}</div>
                    <div className="pm-s">{custom ? best.meta.slice(1).join(" · ") || "Decision maker found" : "112 beds · Administrator and facilities director"}</div>
                    <div className="pm-why">{custom ? best.why : "State inspection cited the resident call system on Aug 12. Re-inspection is due within 60 days."}</div>
                    <div className="pm-tags">
                      <span className="pm-tag src">&#8599; {custom ? best.meta[0] : "State inspection report"}</span>
                      <span className="pm-tag hot">Call today</span>
                    </div>
                  </div>
                  <span className="pm-btn">Open brief</span>
                </div>
              </div>
              <div className="pm-card">
                <div className="pm-lbl"><span>Today&apos;s 10</span><b>See all</b></div>
                {rest.map((r) => (
                  <div className="pm-row" key={r.title}>
                    <div className="pm-score">{r.score}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className="pm-t">{r.title}</div>
                      <div className="pm-s">{r.why}</div>
                    </div>
                    <span className="pm-tag src">&#8599; {r.meta[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pm-col">
              <div className="pm-card">
                <div className="pm-lbl"><span>Changed overnight</span><b>3 new</b></div>
                <div className="pm-change"><i /><span>New owner recorded on a 240-unit property<small>County deed record, 11:40 PM</small></span></div>
                <div className="pm-change"><i className="w" /><span>Inspection posted with 2 citations<small>State survey, 2:15 AM</small></span></div>
                <div className="pm-change"><i className="g" /><span>Decision maker confirmed for 4 accounts<small>Licensing filings</small></span></div>
              </div>
              <div className="pm-card">
                <div className="pm-lbl"><span>Follow-ups due</span><b>5</b></div>
                <div className="pm-change"><i /><span>Silver Pines Senior Living<small>Second call, asked for Thursday</small></span></div>
                <div className="pm-change"><i /><span>Brightwater Medical Pavilion<small>Send the proposal recap</small></span></div>
              </div>
              <div className="pm-card">
                <div className="pm-lbl"><span>Coming up</span></div>
                <div className="pm-change"><i className="w" /><span>9 inspections expected in the next 90 days</span></div>
                <div className="pm-change"><i /><span>14 accounts in budget season now</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CALL_ROWS = [
  { s: 94, n: "Cedar Hollow Assisted Living", l: "112 beds", r: "Cited: resident call system", src: "State inspection", who: "Administrator", st: "Call today" },
  { s: 91, n: "Lakemont School District", l: "9 campuses", r: "Bid posted: cabling and Wi-Fi", src: "E-Rate filing", who: "IT director", st: "Bid open" },
  { s: 88, n: "Harbor Crest Apartments", l: "240 units", r: "New owner, re-bidding vendors", src: "Deed record", who: "Asset manager", st: "This week" },
  { s: 84, n: "Fernbrook Memory Care", l: "Opening soon", r: "New license, tech not chosen", src: "State license", who: "Operator", st: "This week" },
  { s: 81, n: "Oakline Office Park", l: "3 buildings", r: "Renovation permit, 2 floors", src: "County permit", who: "Owner and GC", st: "This week" },
  { s: 79, n: "Westvale Surgical Center", l: "Outpatient", r: "Routine inspection overdue", src: "CMS record", who: "Facilities", st: "This month" },
  { s: 76, n: "Silver Pines Senior Living", l: "86 units", r: "Budget season starts next month", src: "Fiscal calendar", who: "Executive director", st: "This month" },
];

/** Call list: the ranked table. */
export function PortalCallList() {
  return (
    <div className="pm-screen">
      <Rail active="calls" />
      <div className="pm-main">
        <Top />
        <div className="pm-body">
          <div className="pm-hello">
            <div>
              <h4>Call list</h4>
              <p>Ranked by how strong and how recent the reason is. Every reason opens its record.</p>
            </div>
            <span className="pm-btn ghost">Export</span>
          </div>
          <div className="pm-filters">
            <span className="on">Worth a call</span><span>Inspections</span><span>Permits</span><span>New owners</span><span>Bids</span><span>All states</span>
          </div>
          <div className="pm-card" style={{ padding: "0.4em 0.6em" }}>
            <table className="pm-table">
              <colgroup><col style={{ width: "8%" }} /><col style={{ width: "26%" }} /><col style={{ width: "30%" }} /><col style={{ width: "18%" }} /><col style={{ width: "18%" }} /></colgroup>
              <thead>
                <tr><th>Score</th><th>Account</th><th>Reason to call</th><th>Who decides</th><th>When</th></tr>
              </thead>
              <tbody>
                {CALL_ROWS.map((r, i) => (
                  <tr key={r.n} className={i === 0 ? "hi" : undefined}>
                    <td><span className="pm-score" style={{ width: "2.3em", height: "2.3em", fontSize: "0.9em" }}>{r.s}</span></td>
                    <td><b>{r.n}</b><small>{r.l}</small></td>
                    <td>{r.r}<small style={{ color: "#89CFF0" }}>&#8599; {r.src}</small></td>
                    <td>{r.who}<small>Confirmed</small></td>
                    <td><span className={`pm-tag${i === 0 ? " hot" : ""}`}>{r.st}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Account page: the brief a rep reads before the call. */
export function PortalAccount() {
  return (
    <div className="pm-screen">
      <Rail active="all" />
      <div className="pm-main">
        <Top />
        <div className="pm-body">
          <div className="pm-hello">
            <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
              <span className="pm-score big">94</span>
              <div>
                <h4>Cedar Hollow Assisted Living</h4>
                <p>Assisted living, 112 beds · Operator: Cedar Hollow Senior Care (fictional)</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5em" }}>
              <span className="pm-btn ghost">Print brief</span>
              <span className="pm-btn">Add to pipeline</span>
            </div>
          </div>
          <div className="pm-tiles">
            <div className="pm-tile"><b>2</b><span>Citations this year</span></div>
            <div className="pm-tile"><b>60 days</b><span>To re-inspection</span></div>
            <div className="pm-tile"><b>3</b><span>Decision makers</span></div>
            <div className="pm-tile"><b>Q1</b><span>Budget season</span></div>
          </div>
          <div className="pm-grid">
            <div className="pm-col">
              <div className="pm-card best">
                <div className="pm-lbl"><span>Why now</span><b>Proof on every line</b></div>
                <div className="pm-why" style={{ marginTop: 0 }}>The state survey on Aug 12 cited the resident call system for slow response. A plan of correction is due and the follow-up inspection is expected within 60 days.</div>
                <div className="pm-tags">
                  <span className="pm-tag src">&#8599; State inspection report</span>
                  <span className="pm-tag src">&#8599; Licensing record</span>
                  <span className="pm-tag warn">Cited 2x: call system</span>
                </div>
              </div>
              <div className="pm-card">
                <div className="pm-lbl"><span>Record over time</span></div>
                <div className="pm-time">
                  <div><span>Aug 12</span><i className="w" /><span>Survey: call system cited</span></div>
                  <div><span>Mar 3</span><i /><span>Permit: nurse station remodel</span></div>
                  <div><span>Last year</span><i className="w" /><span>Survey: door alarm cited</span></div>
                </div>
              </div>
            </div>
            <div className="pm-col">
              <div className="pm-card">
                <div className="pm-lbl"><span>Who decides</span><b>Find more</b></div>
                <div className="pm-seat"><span className="av">AR</span><div style={{ minWidth: 0 }}><div className="pm-t" style={{ fontSize: "0.88em" }}>A. Rivera</div><div className="pm-s">Administrator</div></div><span className="pm-tag src">&#8599; License</span></div>
                <div className="pm-seat"><span className="av">JM</span><div style={{ minWidth: 0 }}><div className="pm-t" style={{ fontSize: "0.88em" }}>J. Morgan</div><div className="pm-s">Facilities director</div></div><span className="pm-tag src">&#8599; Website</span></div>
                <div className="pm-seat"><span className="av">KL</span><div style={{ minWidth: 0 }}><div className="pm-t" style={{ fontSize: "0.88em" }}>K. Lee</div><div className="pm-s">Regional CFO</div></div><span className="pm-tag src">&#8599; Filing</span></div>
              </div>
              <div className="pm-card">
                <div className="pm-lbl"><span>Your notes</span></div>
                <div className="pm-change"><i /><span>Left a message for the administrator<small>Dana, yesterday</small></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MOCK_CAPTION = "Sample portal. Accounts and people are fictional.";
