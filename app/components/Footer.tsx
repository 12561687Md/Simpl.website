import Link from "next/link";

export default function Footer({
  tagline = "Quietly keeping businesses discoverable.",
}: {
  tagline?: string;
}) {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }}>
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "64px 32px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 500,
              letterSpacing: "0.32em",
              fontSize: 14,
              marginBottom: 12,
            }}
          >
            SIMPL
          </div>
          <div
            style={{ color: "var(--muted)", fontSize: 14, fontStyle: "italic" }}
          >
            {tagline}
          </div>
        </div>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link
            href="/scan"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            The Scan
          </Link>
          <Link
            href="/start"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Start
          </Link>
        </nav>
      </div>
    </footer>
  );
}
