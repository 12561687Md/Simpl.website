import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SIMPL collects, uses, and protects your information. We never sell your data.",
  alternates: { canonical: "https://simpl.pro/privacy" },
};

const sectionHeading: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px, 3vw, 32px)",
  lineHeight: 1.15,
  letterSpacing: "-0.015em",
  fontWeight: 500,
  marginBottom: 20,
};

const paragraph: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: 17,
  lineHeight: 1.65,
  color: "var(--muted)",
};

const list: React.CSSProperties = {
  margin: "0 0 16px",
  paddingLeft: 24,
  fontSize: 17,
  lineHeight: 1.65,
  color: "var(--muted)",
};

const sectionBlock: React.CSSProperties = {
  marginBottom: 56,
};

export default function PrivacyPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "120px 32px 64px",
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 40,
            }}
          >
            Legal
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: 900,
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 15,
              color: "var(--muted)",
              lineHeight: 1.55,
            }}
          >
            Last updated: June 2026
          </p>
        </section>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid var(--rule)",
            margin: 0,
          }}
        />

        {/* Content */}
        <section
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: "80px 32px 96px",
          }}
        >
          {/* Intro */}
          <div style={sectionBlock}>
            <p style={paragraph}>
              SIMPL (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              operates the website at simpl.pro and the SIMPL scanning and
              digital presence platform. This Privacy Policy explains what
              information we collect, how we use it, and your choices regarding
              that information.
            </p>
            <p style={paragraph}>
              By using SIMPL, you agree to the collection and use of information
              as described in this policy. If you do not agree, please do not use
              our services.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>1. Information We Collect</h2>

            <h3
              style={{
                fontSize: 19,
                fontWeight: 500,
                margin: "0 0 12px",
              }}
            >
              Information you provide directly
            </h3>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>URLs you scan.</strong>{" "}
                When you use our free scan tool, you enter a website URL. No
                account is required.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Email address.</strong>{" "}
                If you request a full report, we ask for your email so we can
                deliver it.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Contact form submissions.
                </strong>{" "}
                Our pricing page includes a contact form that collects your name,
                email, phone number, and message.
              </li>
            </ul>

            <h3
              style={{
                fontSize: 19,
                fontWeight: 500,
                margin: "24px 0 12px",
              }}
            >
              Information collected automatically
            </h3>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Scan results.</strong>{" "}
                When a scan completes, the results are stored in our database for
                historical reference.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Local storage data.
                </strong>{" "}
                We use your browser&apos;s localStorage to cache scan results so
                you can return to them without re-scanning. This data stays on
                your device and is not sent to us.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Anonymous analytics.
                </strong>{" "}
                We use Vercel Analytics and Vercel Speed Insights to understand
                general usage patterns. These tools collect anonymous,
                aggregated data such as page views and performance metrics. They
                do not track individual users or use cookies.
              </li>
            </ul>

            <h3
              style={{
                fontSize: 19,
                fontWeight: 500,
                margin: "24px 0 12px",
              }}
            >
              Information we do not collect
            </h3>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                We do not use cookies for advertising or tracking.
              </li>
              <li style={{ marginBottom: 8 }}>
                We do not use third-party ad trackers.
              </li>
              <li style={{ marginBottom: 8 }}>
                We do not scrape or store passwords, credentials, or login
                information from the websites we scan.
              </li>
              <li style={{ marginBottom: 8 }}>
                We do not access admin panels, databases, or any
                non-public areas of scanned websites. Our scans only read
                publicly available HTML.
              </li>
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>2. How We Use Your Information</h2>
            <p style={paragraph}>We use the information we collect to:</p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                Run scans and generate reports on your digital presence.
              </li>
              <li style={{ marginBottom: 8 }}>
                Deliver scan results and reports to your email when requested.
              </li>
              <li style={{ marginBottom: 8 }}>
                Respond to inquiries submitted through our contact form.
              </li>
              <li style={{ marginBottom: 8 }}>
                Improve the accuracy and performance of our scanning platform.
              </li>
              <li style={{ marginBottom: 8 }}>
                Understand general usage patterns through anonymous analytics.
              </li>
            </ul>
            <p style={paragraph}>
              We do not sell your personal information. We do not share your
              email address with third parties for marketing purposes.
            </p>
          </div>

          {/* 3. How We Protect Your Information */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>
              3. How We Protect Your Information
            </h2>
            <p style={paragraph}>
              We take reasonable measures to protect the information we collect.
              Our database connections use SSL encryption. Access to production
              systems is restricted to authorized personnel. API endpoints
              validate all input server-side.
            </p>
            <p style={paragraph}>
              No method of transmission over the internet or electronic storage
              is 100% secure. While we work to protect your information, we
              cannot guarantee absolute security.
            </p>
          </div>

          {/* 4. Data Retention */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>4. Data Retention</h2>
            <p style={paragraph}>
              Scan results are stored in our database to provide scan history
              and improve our platform. Contact form submissions are retained
              as long as necessary to respond to your inquiry and for our
              internal records.
            </p>
            <p style={paragraph}>
              If you would like us to delete your data, contact us at{" "}
              <a
                href="mailto:hi@simpl.pro"
                style={{
                  color: "var(--accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                hi@simpl.pro
              </a>{" "}
              and we will process your request within 30 days.
            </p>
          </div>

          {/* 5. Third-Party Services */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>5. Third-Party Services</h2>
            <p style={paragraph}>
              We use the following third-party services to operate SIMPL. Each
              has its own privacy policy governing how it handles data:
            </p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Vercel</strong> -
                Website hosting, analytics, and performance monitoring.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Google Cloud Run</strong>{" "}
                - API hosting for our scanning engine.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Neon</strong> - Database
                hosting (PostgreSQL).
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>ScrapingBee</strong> -
                Page fetching proxy used during scans to retrieve publicly
                available HTML.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>SerpWow</strong> - Search
                engine results data for visibility analysis.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Google Places API
                </strong>{" "}
                - Business listing data for Google Business Profile analysis.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Resend</strong> - Email
                delivery service for sending scan reports.
              </li>
            </ul>
            <p style={paragraph}>
              We do not share your personal information with these services
              beyond what is necessary to operate the platform. For example,
              ScrapingBee receives the URL you scan but not your email address.
            </p>
          </div>

          {/* 6. Your Rights */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>6. Your Rights</h2>
            <p style={paragraph}>
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Right to know.
                </strong>{" "}
                You can request details about what personal information we have
                collected about you.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Right to delete.
                </strong>{" "}
                You can request that we delete your personal information.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Right to opt out.
                </strong>{" "}
                We do not sell personal information, so there is nothing to opt
                out of in that regard. If we send you emails, you can
                unsubscribe at any time.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Right to non-discrimination.
                </strong>{" "}
                We will not discriminate against you for exercising any of these
                rights.
              </li>
            </ul>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>
                California residents (CCPA):
              </strong>{" "}
              Under the California Consumer Privacy Act, you have the right to
              request disclosure of what personal information we collect, the
              right to request deletion, and the right to opt out of the sale
              of personal information. We do not sell personal information. To
              exercise these rights, contact us at{" "}
              <a
                href="mailto:hi@simpl.pro"
                style={{
                  color: "var(--accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                hi@simpl.pro
              </a>
              .
            </p>
          </div>

          {/* 7. Children's Privacy */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>7. Children&apos;s Privacy</h2>
            <p style={paragraph}>
              SIMPL is not directed at children under the age of 13. We do not
              knowingly collect personal information from children under 13. If
              we become aware that we have collected personal information from a
              child under 13, we will take steps to delete that information
              promptly. If you believe a child under 13 has provided us with
              personal information, please contact us at{" "}
              <a
                href="mailto:hi@simpl.pro"
                style={{
                  color: "var(--accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                hi@simpl.pro
              </a>
              .
            </p>
          </div>

          {/* 8. Changes to This Policy */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>8. Changes to This Policy</h2>
            <p style={paragraph}>
              We may update this Privacy Policy from time to time. When we do,
              we will update the &quot;Last updated&quot; date at the top of this
              page. We encourage you to review this policy periodically. Your
              continued use of SIMPL after any changes indicates your acceptance
              of the updated policy.
            </p>
          </div>

          {/* 9. Contact */}
          <div style={{ marginBottom: 0 }}>
            <h2 style={sectionHeading}>9. Contact</h2>
            <p style={paragraph}>
              If you have questions about this Privacy Policy or want to
              exercise your data rights, contact us at:
            </p>
            <div
              style={{
                background: "var(--bg-soft)",
                border: "1px solid var(--rule)",
                padding: "28px 32px",
                fontSize: 17,
                lineHeight: 1.65,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <strong>SIMPL</strong>
              </div>
              <div style={{ color: "var(--muted)" }}>
                Email:{" "}
                <a
                  href="mailto:hi@simpl.pro"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--accent)",
                  }}
                >
                  hi@simpl.pro
                </a>
              </div>
              <div style={{ color: "var(--muted)" }}>
                Website:{" "}
                <a
                  href="https://simpl.pro"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--accent)",
                  }}
                >
                  simpl.pro
                </a>
              </div>
              <div style={{ color: "var(--muted)" }}>
                Location: United States
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
