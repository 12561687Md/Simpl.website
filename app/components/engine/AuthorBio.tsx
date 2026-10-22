import Link from "next/link";

/**
 * Author / E-E-A-T block. Name, role and experience, deliberately WITHOUT a
 * photo (Matt, 2026-10-22: take his face off the site for now).
 */
export default function AuthorBio({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="eg-author" aria-label="About the author">
      <span className="mark" aria-hidden="true">MD</span>
      <div>
        <p style={{ margin: 0, fontSize: 15.5, color: "var(--fg)" }}>
          <b>Matt DuBois</b><span style={{ color: "var(--muted)" }}>, Founder of Simpl</span>
        </p>
        <p className="eg-body" style={{ marginTop: 6, fontSize: 14.5 }}>
          Matt builds every Simpl Account Engine himself: the public-record research, the scoring and the client portal. Before the Account Engine, he built Simpl&apos;s
          website scanner and local SEO service for service businesses.
          {!compact && <> He writes about B2B prospecting, buying signals and local search from that work.</>}{" "}
          <Link href="/about" className="eg-link">About Simpl</Link>
        </p>
      </div>
    </aside>
  );
}
