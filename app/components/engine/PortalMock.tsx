/**
 * Coded mock of a client portal's "Today's best calls" screen.
 *
 * ILLUSTRATIVE ONLY: no real client, account or person appears here. The
 * accounts are generic descriptions and the note under the frame says so.
 * Replace with a real (blurred) portal screenshot once a client approves.
 */
const DEFAULT_ROWS = [
  {
    score: 94,
    title: "Assisted living community, 112 beds",
    why: "State inspection cited the resident call system. Re-inspection due within 60 days.",
    meta: ["State inspection report", "Administrator + Facilities", "Call today"],
  },
  {
    score: 88,
    title: "Medical office building, new owner",
    why: "Deed recorded last week. New owners re-bid security and access control in year one.",
    meta: ["County deed record", "Owner + Property manager", "This week"],
  },
  {
    score: 81,
    title: "School district, 9 campuses",
    why: "Posted a request for bids on network cabling and Wi-Fi for next school year.",
    meta: ["E-Rate Form 470", "IT Director", "Bid window open"],
  },
];

export default function PortalMock({
  address = "yourcompany.simpl.pro",
  heading = "Today's best calls",
  rows = DEFAULT_ROWS,
}: {
  address?: string;
  heading?: string;
  rows?: { score: number; title: string; why: string; meta: string[] }[];
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="eg-portal" role="img" aria-label={`Illustration of a Simpl client portal showing ${heading.toLowerCase()} with the reason, the record and who decides for each account`}>
        <div className="bar">
          <div className="dots" aria-hidden="true"><i /><i /><i /></div>
          <div className="addr">{address}</div>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)", letterSpacing: "0.08em" }}>
            <span className="pulse-dot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginRight: 6, verticalAlign: 1 }} />
            UPDATED 6:00 AM
          </span>
        </div>
        <div className="body">
          <div className="hd">
            <b>{heading}</b>
            <span>{rows.length} of 25 ranked</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.title} className={`acct${i === 0 ? " top" : ""}`}>
              <div className="score">{r.score}</div>
              <div>
                <div className="t">{r.title}</div>
                <div className="why">{r.why}</div>
                <div className="meta">
                  {r.meta.map((m, j) => (
                    <span key={m} className={j === 0 ? "src" : undefined}>{j === 0 ? `↗ ${m}` : m}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="eg-mock-note">Illustration. Every reason in a real portal links to its public record.</figcaption>
    </figure>
  );
}
