import type { Metadata } from "next";
import { OG_IMAGE } from "../lib/og";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Top25Form from "../components/engine/Top25Form";
import PortalMock from "../components/engine/PortalMock";
import { Eyebrow, Crumbs } from "../components/engine/ui";
import { breadcrumb, ldJson } from "../lib/schema";
import { SITE } from "../lib/site";

const TITLE = "See Your Top 25 Accounts, Free | Simpl";
const DESCRIPTION =
  "Tell us what you sell and where. We'll build a free 25-account sample of your market, each account with the reason to call, the public record behind it and who decides.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { images: OG_IMAGE, title: TITLE, description: DESCRIPTION, url: "https://www.simpl.pro/top-25" },
  alternates: { canonical: "https://www.simpl.pro/top-25" },
};

export default async function Top25Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  const planLabel = plan === "pro" ? "Account Engine Pro" : plan === "base" ? "Account Engine" : undefined;
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(breadcrumb([{ name: "See your top 25", path: "/top-25" }]))} />
        <section className="eg-hero">
          <div className="eg-wrap">
            <Crumbs items={[{ name: "See your top 25", path: "/top-25" }]} />
            <div className="eg-split">
              <div>
                <Eyebrow>Free, before you pay anything</Eyebrow>
                <h1 className="eg-h1" style={{ fontSize: "clamp(34px, 4.6vw, 56px)" }}>
                  See your top 25 accounts. <span className="dim">Your market, not a sample.</span>
                </h1>
                <p className="eg-lead">
                  Tell us what you sell and where. We&apos;ll build 25 real accounts from your territory, each with the reason it&apos;s worth a call now, the
                  public record behind it and who decides. Then we walk through it together, thirty minutes, no pitch deck.
                </p>
                <ul className="eg-list" style={{ marginTop: 30 }}>
                  <li><span><b>Real accounts</b> from your own territory</span></li>
                  <li><span><b>The reason and the record</b> on every one</span></li>
                  <li><span><b>Who decides,</b> by seat</span></li>
                  <li><span><b>Yours to keep,</b> whether or not you buy</span></li>
                </ul>
                <div style={{ marginTop: 40 }} className="hide-mobile">
                  <PortalMock />
                </div>
              </div>
              <div className="eg-card" style={{ padding: "34px 30px" }}>
                <h2 className="eg-h3" style={{ fontSize: 22, marginBottom: 6 }}>Build my top 25</h2>
                <p className="eg-body" style={{ fontSize: 15, marginBottom: 26 }}>
                  {planLabel ? <>Interested in <b style={{ color: "var(--fg)" }}>{planLabel}</b>. </> : null}
                  Prefer to talk? Call <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a> or email{" "}
                  <a className="eg-link" href={`mailto:${SITE.email}?subject=Top%2025%20accounts`}>{SITE.email}</a>.
                </p>
                <Top25Form plan={planLabel} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer showLeadForm={false} />
    </div>
  );
}
