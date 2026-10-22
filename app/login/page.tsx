import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortalLogin from "../components/engine/PortalLogin";
import { Crumbs, Eyebrow } from "../components/engine/ui";
import { SITE } from "../lib/site";
import { pageMeta, webPage, ldJson } from "../lib/schema";

const PATH = "/login";
const TITLE = "Client Login: Go to Your Account Engine Portal | Simpl";
const DESCRIPTION = "Simpl clients: sign in to your company's Account Engine portal at yourcompany.simpl.pro. Enter your company name and we'll take you there.";

// Utility page: kept out of the index (noindex, follow) and out of the sitemap.
export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION, noindex: true });

/**
 * Client login. Each client's portal lives at its own subdomain
 * ([client].simpl.pro), so this page just routes them there. Client names are
 * deliberately NOT listed: that would publish the client list.
 */
export default function LoginPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION }))} />
        <section className="eg-hero tone-ink" style={{ minHeight: "76vh" }}>
          <div className="eg-wrap" style={{ maxWidth: 760 }}>
            <Crumbs items={[{ name: "Client login", path: PATH }]} />
            <Eyebrow>Client login</Eyebrow>
            <h1 className="eg-h1" style={{ fontSize: "clamp(34px, 4.6vw, 54px)" }}>Client login: go to your portal.</h1>
            <p className="eg-lead">Your Account Engine lives at your own address. Enter your company name and we&apos;ll take you there.</p>
            <div className="eg-form-card" style={{ marginTop: 34 }}>
              <PortalLogin />
            </div>
            <p className="eg-body" style={{ marginTop: 26, fontSize: 15 }}>
              Can&apos;t find your address? Email <a className="eg-link" href={`mailto:${SITE.email}?subject=Portal%20access`}>{SITE.email}</a> or call{" "}
              <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a>. Not a client yet?{" "}
              <Link className="eg-link" href={SITE.primaryCta.href}>See your top prospects</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
