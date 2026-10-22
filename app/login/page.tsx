import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortalLogin from "../components/engine/PortalLogin";
import { Eyebrow, Crumbs } from "../components/engine/ui";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: { absolute: "Client Login | Simpl" },
  description: "Simpl clients: sign in to your company's growth portal at yourcompany.simpl.pro.",
  alternates: { canonical: "https://www.simpl.pro/login" },
};

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
        <section className="eg-hero" style={{ minHeight: "72vh" }}>
          <div className="eg-wrap" style={{ maxWidth: 720 }}>
            <Crumbs items={[{ name: "Client login", path: "/login" }]} />
            <Eyebrow>Client login</Eyebrow>
            <h1 className="eg-h1" style={{ fontSize: "clamp(34px, 4.6vw, 54px)" }}>Go to your portal.</h1>
            <p className="eg-lead">Your growth portal lives at your own address. Enter your company name and we&apos;ll take you there.</p>
            <div className="eg-card" style={{ marginTop: 34, padding: "30px 28px" }}>
              <PortalLogin />
            </div>
            <p className="eg-body" style={{ marginTop: 26, fontSize: 15 }}>
              Can&apos;t find your address? Email <a className="eg-link" href={`mailto:${SITE.email}?subject=Portal%20access`}>{SITE.email}</a> or call{" "}
              <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a>. Not a client yet?{" "}
              <Link className="eg-link" href="/top-25">See your top 25 accounts</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
