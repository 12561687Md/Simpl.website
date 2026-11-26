import type { Metadata } from "next";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Terms of Service. 2026-11-26: governing law and venue moved to North
 * Carolina to match the client service agreement (Simpl.master
 * docs/delivery/ONBOARDING_KIT/09_SERVICE_AGREEMENT.md), and a client portal
 * section added (docs/security/PROFESSIONAL_OPS.md, section 2). Schema sync
 * rule: the JSON-LD is built from the same constants the page renders.
 */
const EFFECTIVE = "November 27, 2026";
const EFFECTIVE_ISO = "2026-11-27";
const DESCRIPTION =
  "Terms for using Simpl: the website, free scan, paid services and private client portals. North Carolina law applies.";

const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.simpl.pro/terms#webpage",
    url: "https://www.simpl.pro/terms",
    name: "Terms of Service",
    description: DESCRIPTION,
    inLanguage: "en-US",
    dateModified: EFFECTIVE_ISO,
    publisher: {
      "@type": "Organization",
      name: "Simpl",
      url: "https://www.simpl.pro",
      email: "team@simpl.pro",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.simpl.pro" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://www.simpl.pro/terms" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms of Service | Simpl",
  description: DESCRIPTION,
  openGraph: {
    images: OG_IMAGE,
    title: "Terms of Service | Simpl",
    description: DESCRIPTION,
    url: "https://www.simpl.pro/terms",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://www.simpl.pro/terms" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c") }}
        />
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
            Effective date: {EFFECTIVE}
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
              By accessing or using Simpl, run by Simpl Systems LLC
              (&quot;Simpl,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), at simpl.pro or in any Simpl client portal, you
              agree to be bound by these Terms of Service. If you do not agree to these terms, do not use
              our services.
            </p>
            <p style={paragraph}>
              These terms apply to all visitors, users, and customers of Simpl,
              whether using the free scan tool, a client portal, or any paid
              service. If your company has a signed service agreement with
              Simpl, that agreement controls where it differs from these terms.
            </p>
          </div>

          {/* 2. Description of Service */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>2. Description of Service</h2>
            <p style={paragraph}>Simpl provides the following services:</p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Free Scan Tool.</strong>{" "}
                A website scanner that analyzes publicly available data and
                generates a digital presence score across six categories.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Market intelligence services.</strong>{" "}
                A private client portal of ranked buildings and accounts built
                from public records, with related CRM setup, follow-up and call
                answering, scoped in writing for each client.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Local marketing services.</strong>{" "}
                Local SEO, websites, Google Business Profile management and paid
                advertising management, on a monthly retainer or a flat fee.
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
            <p style={paragraph}>When using Simpl, you agree to:</p>
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
                Not use Simpl to scan websites for malicious purposes,
                including but not limited to identifying vulnerabilities for
                exploitation.
              </li>
            </ul>
            <p style={paragraph}>
              We reserve the right to suspend or terminate access for any user
              who violates these responsibilities.
            </p>
          </div>

          {/* 4. Client Portals */}
          <div style={sectionBlock} id="portals">
            <h2 style={sectionHeading}>4. Client Portals</h2>
            <p style={paragraph}>
              Simpl runs private, sign-in-only portals for its clients, such as
              noovis.simpl.pro, sentrics.simpl.pro, the Action Elevator market
              intelligence portal at action.simpl.pro, and Simpl&apos;s own
              internal portal, hq.simpl.pro. This section applies to anyone who
              signs in to one of them.
            </p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Accounts.</strong>{" "}
                Each account is for one named person. Do not share your sign-in,
                password or sign-in codes, and tell us right away at{" "}
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
                if you think someone else has used your account. Your company
                is responsible for who it asks us to give access to, and for
                telling us when someone should lose it.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Acceptable use.</strong>{" "}
                Use the portal only for your company&apos;s own business and
                only within the law, including calling, texting and email laws
                in your own outreach. Do not copy the portal&apos;s data in bulk
                with scripts or scrapers, resell or publish it, share it with
                anyone outside your company, try to reach data or accounts that
                are not yours, test or probe its security without our written
                OK, or interfere with how it runs.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Confidentiality of client data.</strong>{" "}
                Your company&apos;s data in its portal belongs to your company.
                We keep it confidential, use it only to provide your
                company&apos;s service, never sell it, and never use it for
                another client. You agree to keep what you see in the portal,
                including how it works, confidential to your company.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Data from public records.</strong>{" "}
                Much of what a portal shows comes from public records and other
                outside sources. Those sources can be incomplete, late or wrong,
                so check anything important before you rely on it.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Availability.</strong>{" "}
                We work to keep the portals running, but we do not guarantee
                they will always be available, fast or free of errors. We may
                take a portal down for maintenance, and we may add, change or
                remove features; we give notice before changes to how a portal
                is laid out or works.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>Suspension and termination.</strong>{" "}
                We may suspend or end an account that breaks these rules, puts
                the portal or other users at risk, or when your company asks us
                to. A portal ends when your company&apos;s agreement with Simpl
                ends. Your company then gets an export of its data within 30
                days, and then we delete it.
              </li>
            </ul>
            <p style={paragraph}>
              How we handle personal information in the portals is described in
              our{" "}
              <a
                href="/privacy"
                style={{
                  color: "var(--accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* 5. Scan Limitations */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>
              5. Scan Limitations and Disclaimers
            </h2>
            <p style={paragraph}>
              Simpl scans only publicly available data. We analyze HTML content,
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

          {/* 6. Intellectual Property */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>6. Intellectual Property</h2>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>Our property.</strong> The
              Simpl platform, including the scanning engine, scoring rubric,
              website design, branding, and all associated code and content, is
              owned by Simpl. You may not copy, reproduce, or redistribute any
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

          {/* 7. Payment Terms */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>7. Payment Terms</h2>
            <p style={paragraph}>
              Simpl offers a free website scan and report, plus paid services.
              All pricing is quoted individually. Your price is set by the
              scope you and Simpl agree to in writing before work begins:
            </p>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Monthly retainers.
                </strong>{" "}
                Retainer services are billed monthly at the start of each
                billing period. Except where a minimum term applies, you may
                cancel at any time, and your service will continue through the
                end of the current billing period.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  One-time services.
                </strong>{" "}
                Strategy audits and website builds are billed as a flat fee
                quoted in advance.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Website build included with Simpl.team.
                </strong>{" "}
                Where Simpl provides a website build at no charge as part of a
                Simpl.team engagement, that engagement carries a three-month
                minimum term. If you cancel before the third billing period
                ends, the remaining months of that minimum become due, or Simpl
                may instead invoice the build at its standard rate. You keep the
                website either way.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  Paid advertising management.
                </strong>{" "}
                Quoted per account, plus a one-time setup fee equal to 50% of
                the monthly management fee. Advertising spend is billed to you
                directly by the ad platform, is not collected by Simpl, and
                carries no Simpl markup. You retain ownership of your ad
                accounts and data.
              </li>
            </ul>
            <p style={paragraph}>
              All prices are listed in US dollars unless otherwise noted. We
              reserve the right to change pricing with 30 days&apos; notice to
              existing customers.
            </p>
          </div>

          {/* 8. Refund Policy */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>8. Refund Policy</h2>
            <ul style={list}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{ color: "var(--fg)" }}>
                  One-time services.
                </strong>{" "}
                Flat-fee work is non-refundable once delivered. Anything not yet
                started is refunded in full if you cancel.
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

          {/* 9. Service Availability */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>9. Service Availability</h2>
            <p style={paragraph}>
              We make reasonable efforts to keep Simpl available and operational.
              However, we do not guarantee uninterrupted or error-free service.
              Downtime may occur for maintenance, updates, or due to
              circumstances beyond our control.
            </p>
            <p style={paragraph}>
              We are not liable for any losses or damages resulting from service
              interruptions or unavailability.
            </p>
          </div>

          {/* 10. Limitation of Liability */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>10. Limitation of Liability</h2>
            <p style={paragraph}>
              To the fullest extent permitted by law, Simpl and its owners,
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

          {/* 11. Termination */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>11. Termination</h2>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>By you.</strong> You may
              stop using Simpl at any time. If you are on a paid retainer, you
              may cancel, and your service will continue through the end of the
              current billing period.
            </p>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>By us.</strong> We may
              suspend or terminate your access to Simpl at any time if you
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

          {/* 12. Governing Law */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>12. Governing Law</h2>
            <p style={paragraph}>
              These Terms of Service are governed by and construed in accordance
              with the laws of the State of North Carolina, United States,
              without regard to its conflict of law principles. This matches
              our client service agreement.
            </p>
            <p style={paragraph}>
              Any disputes arising from these terms or your use of Simpl shall
              be resolved in the state courts located in New Hanover County,
              North Carolina, or the federal courts for the Eastern District of
              North Carolina, and you consent to the jurisdiction of those
              courts.
            </p>
          </div>

          {/* 13. Changes to These Terms */}
          <div style={sectionBlock}>
            <h2 style={sectionHeading}>13. Changes to These Terms</h2>
            <p style={paragraph}>
              We may update these Terms of Service from time to time. When we
              do, we will update the effective date at the top of this page.
              For material changes, we will make reasonable efforts to notify
              affected users, including client portal users by email or in the
              portal.
            </p>
            <p style={paragraph}>
              Your continued use of Simpl after changes are posted constitutes
              your acceptance of the revised terms.
            </p>
          </div>

          {/* 14. Contact */}
          <div style={{ marginBottom: 0 }}>
            <h2 style={sectionHeading}>14. Contact</h2>
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
                <strong>Simpl Systems LLC</strong>
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
                  href="https://www.simpl.pro"
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
                Location: Wilmington, North Carolina
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
