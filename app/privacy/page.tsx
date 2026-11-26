import type { Metadata } from "next";
import type { ReactNode } from "react";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Privacy policy, rewritten 2026-11-26 (Simpl.master
 * docs/security/PROFESSIONAL_OPS.md, section 2). One policy with a section per
 * kind of person: website visitors, portal users, phone line callers, business
 * contacts. The SMS section carries id="sms" so form consent lines can link to
 * /privacy#sms. Schema sync rule: the JSON-LD below is built from the same
 * constants the page renders (description, effective date).
 */

const EFFECTIVE = "November 27, 2026";
const EFFECTIVE_ISO = "2026-11-27";
const DESCRIPTION =
  "What Simpl collects on its website, client portals, support phone line and business research, who helps us handle it, how long we keep it, and your choices. We never sell your data.";
const EMAIL = "team@simpl.pro";

export const metadata: Metadata = {
  title: "Privacy Policy | Simpl",
  description: DESCRIPTION,
  openGraph: {
    images: OG_IMAGE,
    title: "Privacy Policy | Simpl",
    description: DESCRIPTION,
    url: "https://www.simpl.pro/privacy",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://www.simpl.pro/privacy" },
};

const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.simpl.pro/privacy#webpage",
    url: "https://www.simpl.pro/privacy",
    name: "Privacy Policy",
    description: DESCRIPTION,
    inLanguage: "en-US",
    dateModified: EFFECTIVE_ISO,
    publisher: {
      "@type": "Organization",
      name: "Simpl",
      url: "https://www.simpl.pro",
      email: EMAIL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.simpl.pro" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://www.simpl.pro/privacy" },
    ],
  },
];

const sectionHeading: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px, 3vw, 32px)",
  lineHeight: 1.15,
  letterSpacing: "-0.015em",
  fontWeight: 500,
  marginBottom: 20,
};

const subHeading: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 500,
  margin: "24px 0 12px",
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

const linkStyle: React.CSSProperties = {
  color: "var(--accent)",
  textDecoration: "none",
  borderBottom: "1px solid var(--accent)",
};

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <div style={sectionBlock} id={id}>
      <h2 style={sectionHeading}>{title}</h2>
      {children}
    </div>
  );
}

function Item({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <li style={{ marginBottom: 8 }}>
      {label && <strong style={{ color: "var(--fg)" }}>{label}</strong>} {children}
    </li>
  );
}

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} style={linkStyle}>
      {EMAIL}
    </a>
  );
}

export default function PrivacyPage() {
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
          <div style={sectionBlock}>
            <p style={paragraph}>
              Simpl Systems LLC (&quot;Simpl,&quot; &quot;we,&quot; &quot;us&quot;)
              runs the website at simpl.pro, the free website scan, private
              client portals, and the research and support services we provide
              to our business clients. This policy explains what we collect, why
              we collect it, who helps us handle it, how long we keep it, and the
              choices you have.
            </p>
            <p style={paragraph}>
              We never sell personal information, and we never share it for
              anyone else&apos;s advertising.
            </p>
          </div>

          <Section title="1. Who this policy covers">
            <ul style={list}>
              <Item label="Website visitors.">
                People who visit simpl.pro, run the free scan, or fill out one of
                our forms (section 2).
              </Item>
              <Item label="Client portal users.">
                People who sign in to a Simpl client portal, such as
                noovis.simpl.pro, sentrics.simpl.pro, action.simpl.pro or our own
                internal portal, hq.simpl.pro (section 3).
              </Item>
              <Item label="Phone line callers.">
                People who call a support phone line we answer for one of our
                clients (section 4).
              </Item>
              <Item label="Business contacts.">
                People whose work contact details appear in the business research
                we do for our clients or for our own outreach (section 5).
              </Item>
            </ul>
            <p style={paragraph}>
              When we handle information for a client (for example, inside that
              client&apos;s portal or on its phone line), we act on that
              client&apos;s behalf under our written agreement with it. That
              client&apos;s own privacy policy also applies.
            </p>
          </Section>

          <Section title="2. Website and free scan">
            <h3 style={{ ...subHeading, marginTop: 0 }}>What you give us</h3>
            <ul style={list}>
              <Item label="Businesses and URLs you scan.">
                When you use the free scan, you enter a business name or website
                address. No account is needed.
              </Item>
              <Item label="Email address.">
                If you unlock a full report, we ask for your email so we can send
                it.
              </Item>
              <Item label="Form submissions.">
                Our forms collect your name, email, company, website, phone
                number if you give one, and your message.
              </Item>
              <Item label="Text message consent.">
                If a form offers an optional box to get texts about your request
                and you check it, we record that you agreed, the wording you
                agreed to, and when. The box is never checked for you.
              </Item>
            </ul>

            <h3 style={subHeading}>What is collected automatically</h3>
            <ul style={list}>
              <Item label="Scan results.">
                When a scan finishes, the results are stored in our database so
                we can show scan history.
              </Item>
              <Item label="Browser storage.">
                Your browser&apos;s local storage keeps recent scan results so
                you can return to them without scanning again. That data stays
                on your device.
              </Item>
              <Item label="Analytics.">
                Vercel Analytics and Vercel Speed Insights count page views and
                measure page speed without cookies. We may also use Google
                Analytics, which sets first-party cookies to count visits and
                form submissions. We never send it your name, email or phone
                number.
              </Item>
              <Item label="Server logs.">
                Our hosting providers record basic request details, such as IP
                address, browser type and time, to keep the site running and
                secure.
              </Item>
            </ul>

            <h3 style={subHeading}>What our scans read</h3>
            <p style={paragraph}>
              Scans read only public information: a website&apos;s public pages,
              its headers and metadata, and public business listings. We never
              access password-protected areas, admin panels or databases of the
              sites we scan. We do not use advertising cookies or third-party ad
              trackers.
            </p>
          </Section>

          <Section title="3. Client portals">
            <p style={paragraph}>
              Our clients&apos; teams sign in to private portals we build and
              run for them. In a portal we collect:
            </p>
            <ul style={list}>
              <Item label="Account details.">
                Your name, work email, username and role, set up by us or by your
                company.
              </Item>
              <Item label="Sign-in data.">
                Passwords are stored only as one-way hashes, never in readable
                form. When you sign in, we may email a one-time code to your work
                address as a second step. We record when you last signed in.
              </Item>
              <Item label="What you do in the portal.">
                Notes, call and email logs, tickets and other entries you make,
                so the portal works and your team shares one history.
              </Item>
              <Item label="Cookies.">
                Portals use only the cookies needed to keep you signed in. They
                do not use advertising or tracking cookies.
              </Item>
            </ul>
            <p style={paragraph}>
              The business data inside a client&apos;s portal belongs to that
              client. We use it only to provide that client&apos;s service, and
              we never use one client&apos;s data for another client.
            </p>
          </Section>

          <Section title="4. Support phone line">
            <p style={paragraph}>
              We answer some support phone lines on behalf of our clients. These
              calls are answered by an automated assistant, and the call tells
              you at the start that it is recorded. When you call, we collect:
            </p>
            <ul style={list}>
              <Item label="The call itself.">
                An audio recording of the call and a written transcript.
              </Item>
              <Item label="Call details.">
                The number you call from, the time of the call, and how long it
                lasted.
              </Item>
              <Item label="What you tell us.">
                Your name, where you are (for example a building and room, or a
                site number), and the problem you are reporting.
              </Item>
            </ul>
            <p style={paragraph}>
              We use this to open a support ticket, send it to the technicians of
              the client whose line you called, reach on-call staff when a
              problem is urgent, and check the quality of our answering. The
              client receives the ticket, and it may also go into that
              client&apos;s own help desk. A short summary goes to our internal
              team chat so we can follow up; health details are kept out of that
              summary.
            </p>
            <p style={paragraph}>
              If you do not want to be recorded, say so on the call. The
              assistant will take only what is needed to send help, such as your
              location and a callback number. We do not use calls to market to
              you.
            </p>
          </Section>

          <Section title="5. Business contact data for B2B outreach">
            <p style={paragraph}>
              We research businesses and buildings to help our clients find
              companies that may need their services, and to find clients for
              Simpl. Our sources are public records (such as inspection, permit,
              licensing and government filings), company websites, news, and
              business data services.
            </p>
            <p style={paragraph}>
              From these sources we keep business contact details: name, job
              title, company, business address, work email and work phone. We
              do not keep personal email addresses, and we do not collect
              sensitive details, such as health information, about people for
              outreach.
            </p>
            <p style={paragraph}>
              We or our clients may contact you by email or phone about services
              that fit your business. Every marketing email from us includes a
              way to opt out. To stop contact from Simpl, reply to any email or
              write to <Mail />. We will not contact you again, and we pass your
              request to the client the outreach was for.
            </p>
          </Section>

          <Section title="6. How we use information">
            <ul style={list}>
              <Item>Run scans and send the reports you ask for.</Item>
              <Item>Answer your requests and follow up on a call you booked.</Item>
              <Item>Provide, secure and fix the client portals and the phone line.</Item>
              <Item>Research businesses for our clients and for our own outreach.</Item>
              <Item>Text you about your request, only if you checked an optional text box.</Item>
              <Item>Improve the accuracy and speed of our tools.</Item>
              <Item>Meet legal duties and protect our services and users.</Item>
            </ul>
          </Section>

          <Section id="sms" title="7. Text messages (SMS)">
            <p style={paragraph}>
              Some of our forms may offer an optional, unchecked box to get text
              messages about your request (for example, confirming a call time).
              Checking it is never required to work with us or to get anything on
              this site.
            </p>
            <ul style={list}>
              <Item>Messages are about your request only. Message frequency varies.</Item>
              <Item>Msg &amp; data rates may apply.</Item>
              <Item>
                Reply STOP to opt out at any time. Reply HELP for help, or email{" "}
                <Mail />.
              </Item>
              <Item>Carriers are not liable for delayed or undelivered messages.</Item>
              <Item>
                No mobile information will be shared with third parties or
                affiliates for marketing or promotional purposes.
              </Item>
            </ul>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>
                Text messaging opt-in data and consent are never shared with any
                third party.
              </strong>{" "}
              The only companies that handle your number are the service
              providers that deliver our messages for us.
            </p>
          </Section>

          <Section title="8. Who helps us handle information">
            <p style={paragraph}>
              We use these service providers. Each handles information only to do
              its job for us:
            </p>
            <ul style={list}>
              <Item label="Google Cloud and Google Workspace.">
                Hosting for our scan engine and client portals, file storage, and
                our business email.
              </Item>
              <Item label="Neon.">Database hosting.</Item>
              <Item label="Vercel.">Website hosting, analytics and speed monitoring.</Item>
              <Item label="Cloudflare.">Domain name (DNS) service for simpl.pro and the portals.</Item>
              <Item label="GoHighLevel.">
                Our CRM and calendar. It stores the contact details and requests
                you send us and your call bookings, and delivers our text
                messages.
              </Item>
              <Item label="Resend.">Email delivery for reports, form replies and portal emails.</Item>
              <Item label="Retell AI.">
                Runs the support phone line, including call recordings and
                transcripts.
              </Item>
              <Item label="ElevenLabs.">Provides the phone assistant&apos;s voice, through Retell.</Item>
              <Item label="Anthropic and Google (Gemini).">
                Process text inside our research, portal and content tools, such
                as summarizing public records.
              </Item>
              <Item label="DataForSEO.">
                Search ranking data for scans. It receives business names and
                search terms, not your contact details.
              </Item>
              <Item label="ScrapingBee.">
                Fetches public web pages during scans. It receives the address
                being scanned, not your email.
              </Item>
              <Item label="Google Maps Platform and Mapbox.">
                Business listing data for scans, and maps inside the portals.
              </Item>
              <Item label="Discord.">
                Our internal team chat, where we receive ticket and request
                alerts. Health details are kept out of it.
              </Item>
            </ul>
            <p style={paragraph}>
              We also share information when the law requires it, to protect
              people&apos;s safety or our rights, or as part of a sale or merger
              of our business, in which case this policy continues to apply.
            </p>
          </Section>

          <Section title="9. How long we keep information">
            <ul style={list}>
              <Item label="Scan results.">Kept to show scan history, unless you ask us to delete them.</Item>
              <Item label="Form submissions and leads.">
                Kept as long as needed to answer you and for our business
                records, unless you ask us to delete them.
              </Item>
              <Item label="Portal accounts and client data.">
                Kept while the client agreement is active. When it ends, the
                client gets an export of its data within 30 days, and then we
                delete it.
              </Item>
              <Item label="Call recordings and transcripts.">
                Kept as long as needed to resolve the ticket, review quality and
                serve the client, then deleted. The client may keep its own copy
                under its own policy.
              </Item>
              <Item label="Business contact data.">
                Kept while it is useful for the outreach it was collected for. If
                you opt out, we keep only what is needed to make sure you are not
                contacted again.
              </Item>
            </ul>
            <p style={paragraph}>
              Backups may hold copies for a limited time after deletion.
            </p>
          </Section>

          <Section title="10. How we protect information">
            <p style={paragraph}>
              Connections to our website, portals and databases are encrypted.
              Portal passwords are stored as one-way hashes. Access to client
              data is limited to the people doing the work, and passwords and
              keys are kept out of our code. If a breach affects a client&apos;s
              data, we tell that client within 72 hours, and we notify affected
              people as the law requires.
            </p>
            <p style={paragraph}>
              No system is perfectly secure. We work to protect your information
              but cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="11. Your rights and choices">
            <p style={paragraph}>Wherever you live, you can ask us to:</p>
            <ul style={list}>
              <Item label="Know and access.">
                Tell you what personal information we have about you and give
                you a copy.
              </Item>
              <Item label="Correct.">Fix information that is wrong.</Item>
              <Item label="Delete.">Delete your personal information, unless the law requires us to keep it.</Item>
              <Item label="Opt out.">
                Stop marketing emails, calls or texts. We do not sell or share
                personal information for advertising, so there is no sale to opt
                out of.
              </Item>
            </ul>
            <p style={paragraph}>
              <strong style={{ color: "var(--fg)" }}>California residents (CCPA):</strong>{" "}
              You have the right to know, delete and correct your personal
              information, and to opt out of its sale or sharing. We do not sell
              or share personal information. We will not treat you differently
              for using any of these rights.
            </p>
            <p style={paragraph}>
              To make a request, email <Mail /> with the subject &quot;Privacy
              request.&quot; Someone you authorize can also make a request for
              you. We confirm the request comes from you, usually by replying to
              the email address we have on file, and we answer within 30 days. If
              the information is held for one of our clients, we send your
              request to that client and help it respond.
            </p>
          </Section>

          <Section title="12. Children">
            <p style={paragraph}>
              Simpl is a business service and is not meant for children under 13.
              We do not knowingly collect information from children under 13. If
              you believe a child has given us information, email <Mail /> and we
              will delete it.
            </p>
          </Section>

          <Section title="13. Changes to this policy">
            <p style={paragraph}>
              When we update this policy, we change the effective date at the top
              of this page. For important changes, we also tell client portal
              users by email or in the portal.
            </p>
          </Section>

          <div style={{ marginBottom: 0 }}>
            <h2 style={sectionHeading}>14. Contact</h2>
            <p style={paragraph}>
              Questions about this policy, or a privacy request:
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
                Email: <Mail />
              </div>
              <div style={{ color: "var(--muted)" }}>
                Phone:{" "}
                <a href="tel:+19194289452" style={linkStyle}>
                  (919) 428-9452
                </a>
              </div>
              <div style={{ color: "var(--muted)" }}>Location: Wilmington, North Carolina</div>
            </div>
          </div>
        </section>
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
