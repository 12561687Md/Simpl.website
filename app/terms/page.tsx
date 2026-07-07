import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | SIMPL",
  description:
    "Terms and conditions for using SIMPL, the digital presence scanning and agency platform.",
  openGraph: {
    title: "Terms of Service | SIMPL",
    description: "Terms and conditions for using SIMPL, the digital presence scanning and agency platform.",
    url: "https://simpl.pro/terms",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/terms" },
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

export default function TermsPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://simpl.pro/terms" }
          ]
        }) }} />
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
            Terms of Service
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
          {/* 1. Acceptance */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>1. Acceptance of Terms</h2>
            <p style={paragraph}>
              By accessing or using SIMPL (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) at simpl.pro, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, do not use
              our services.
            </p>
            <p style={paragraph}>
              These terms apply to all visitors, users, and customers of SIMPL,
              whether using the free scan tool or any paid service.
            </p>
          </div>

          {/* 2. Description of Service */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>2. Description of Service</h2>
            <p style={paragraph}>SIMPL provides the following services:</p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Free Scan Tool.</strong>{" "}
                A website scanner that analyzes publicly available data and
                generates a digital presence score across six categories.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Paid Reports.</strong>{" "}
                Detailed audit reports delivered as branded HTML documents
                covering your website health, SEO, Google Business Profile,
                and more.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Agency Services.</strong>{" "}
                Ongoing digital marketing and presence management on monthly
                retainer, including quick wins, local SEO, paid advertising,
                organic growth, and strategic consulting.
              </li>
            </ul>
            <p style={paragraph}>
              We reserve the right to modify, suspend, or discontinue any part
              of the service at any time with reasonable notice.
            </p>
          </div>

          {/* 3. User Responsibilities */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>3. User Responsibilities</h2>
            <p style={paragraph}>When using SIMPL, you agree to:</p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                Provide accurate URLs and information when using the scan tool
                or contact forms.
              </li>
              <li style={{ marginBottom: 8 }}>
                Use the service for lawful purposes only.
              </li>
              <li style={{ marginBottom: 8 }}>
                Not abuse, overload, or attempt to disrupt the scanning
                platform through automated mass requests, denial-of-service
                attacks, or similar activities.
              </li>
              <li style={{ marginBottom: 8 }}>
                Not attempt to reverse-engineer, decompile, or extract the
                source code of our scanning engine.
              </li>
              <li style={{ marginBottom: 8 }}>
                Not use SIMPL to scan websites for malicious purposes,
                including but not limited to identifying vulnerabilities for
                exploitation.
              </li>
            </ul>
            <p style={paragraph}>
              We reserve the right to suspend or terminate access for any user
              who violates these responsibilities.
            </p>
          </div>

          {/* 4. Scan Limitations */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>
              4. Scan Limitations and Disclaimers
            </h2>
            <p style={paragraph}>
              SIMPL scans only publicly available data. We analyze HTML content,
              metadata, headers, and publicly listed business information. We do
              not access password-protected areas, admin panels, databases, or
              any private content.
            </p>
            <p style={paragraph}>
              Scan results are informational and provided on an &quot;as
              is&quot; basis. They are not legal, financial, or professional
              advice. Scores and grades represent our assessment based on
              publicly available data at the time of the scan and may not
              reflect the complete picture of your digital presence.
            </p>
            <p style={paragraph}>
              We make reasonable efforts to ensure accuracy, but we do not
              guarantee that scan results are error-free or comprehensive.
              Results may vary depending on external factors such as website
              availability, caching, or third-party data sources.
            </p>
          </div>

          {/* 5. Intellectual Property */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>5. Intellectual Property</h2>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>Our property.</strong> The
              SIMPL platform, including the scanning engine, scoring rubric,
              website design, branding, and all associated code and content, is
              owned by SIMPL. You may not copy, reproduce, or redistribute any
              part of our platform without written permission.
            </p>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>Your data.</strong> You
              retain ownership of any data you provide to us, including the URLs
              you scan and the information you submit through forms. Scan
              results generated about your website belong to you, and you are
              free to share them as you see fit.
            </p>
          </div>

          {/* 6. Payment Terms */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>6. Payment Terms</h2>
            <p style={paragraph}>
              SIMPL offers a free website scan and report, plus recurring paid
              services:
            </p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Monthly retainers (Simpl.core at $497/mo and above).
                </strong>{" "}
                Retainer services are billed monthly at the start of each
                billing period. You may cancel at any time, and your service
                will continue through the end of the current billing period.
              </li>
            </ul>
            <p style={paragraph}>
              All prices are listed in US dollars unless otherwise noted. We
              reserve the right to change pricing with 30 days&apos; notice to
              existing customers.
            </p>
          </div>

          {/* 7. Refund Policy */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>7. Refund Policy</h2>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  One-time reports.
                </strong>{" "}
                Because reports are generated and delivered instantly, they are
                non-refundable once delivered.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Monthly retainers.
                </strong>{" "}
                New retainer clients are eligible for a full refund within the
                first 7 days of their initial billing period if they are not
                satisfied with the service. After the 7-day window, retainers
                are non-refundable for the current billing period but can be
                canceled to prevent future charges.
              </li>
            </ul>
            <p style={paragraph}>
              To request a refund, contact us at{" "}
              <a
                href="mailto:team@simpl.pro"
                style={{
                  color: "var(--accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                team@simpl.pro
              </a>{" "}
              within the eligible window.
            </p>
          </div>

          {/* 8. Service Availability */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>8. Service Availability</h2>
            <p style={paragraph}>
              We make reasonable efforts to keep SIMPL available and operational.
              However, we do not guarantee uninterrupted or error-free service.
              Downtime may occur for maintenance, updates, or due to
              circumstances beyond our control.
            </p>
            <p style={paragraph}>
              We are not liable for any losses or damages resulting from service
              interruptions or unavailability.
            </p>
          </div>

          {/* 9. Limitation of Liability */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>9. Limitation of Liability</h2>
            <p style={paragraph}>
              To the fullest extent permitted by law, SIMPL and its owners,
              employees, and contractors shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising
              from your use of the service.
            </p>
            <p style={paragraph}>
              Scan results and reports are informational. We are not responsible
              for business decisions you make based on our scan results, scores,
              or recommendations. You acknowledge that our service provides
              analysis based on publicly available data and that results should
              be considered alongside your own judgment and professional advice.
            </p>
            <p style={paragraph}>
              In no event shall our total liability exceed the amount you paid
              to us in the 12 months preceding the claim, or $100, whichever
              is greater.
            </p>
          </div>

          {/* 10. Termination */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>10. Termination</h2>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>By you.</strong> You may
              stop using SIMPL at any time. If you are on a paid retainer, you
              may cancel, and your service will continue through the end of the
              current billing period.
            </p>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>By us.</strong> We may
              suspend or terminate your access to SIMPL at any time if you
              violate these terms, abuse the platform, or engage in conduct that
              we determine, in our sole discretion, to be harmful to the service
              or other users.
            </p>
            <p style={paragraph}>
              Upon termination, any provisions of these terms that by their
              nature should survive will remain in effect, including intellectual
              property rights, limitation of liability, and governing law.
            </p>
          </div>

          {/* 11. Governing Law */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>11. Governing Law</h2>
            <p style={paragraph}>
              These Terms of Service are governed by and construed in accordance
              with the laws of the State of New York, United States, without
              regard to its conflict of law principles.
            </p>
            <p style={paragraph}>
              Any disputes arising from these terms or your use of SIMPL shall
              be resolved in the state or federal courts located in New York,
              and you consent to the jurisdiction of those courts.
            </p>
          </div>

          {/* 12. Changes to These Terms */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>12. Changes to These Terms</h2>
            <p style={paragraph}>
              We may update these Terms of Service from time to time. When we
              do, we will update the &quot;Last updated&quot; date at the top of
              this page. For material changes, we will make reasonable efforts
              to notify affected users.
            </p>
            <p style={paragraph}>
              Your continued use of SIMPL after changes are posted constitutes
              your acceptance of the revised terms.
            </p>
          </div>

          {/* 13. Contact */}
          <div style={{ marginBottom: 0 }}>
            <h2 style={sectionHeading}>13. Contact</h2>
            <p style={paragraph}>
              If you have questions about these Terms of Service, contact us at:
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
                  href="mailto:team@simpl.pro"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--accent)",
                  }}
                >
                  team@simpl.pro
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
