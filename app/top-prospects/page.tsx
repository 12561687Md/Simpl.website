import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProspectsForm from "../components/engine/ProspectsForm";
import { BrowserFrame, PortalCallList, MOCK_CAPTION } from "../components/portal/Portal";
import { Crumbs, Pills, Section } from "../components/engine/ui";
import { webPage, ldJson, pageMeta } from "../lib/schema";
import { SITE } from "../lib/site";

/* Primary keyword: "B2B prospect list" (transactional). */
const PATH = "/top-prospects";
const TITLE = "See Your Top Prospects: A Free B2B Prospect List | Simpl";
const DESCRIPTION =
  "Tell us what you sell and where. We build a free B2B prospect list from your own market: the reason to call, the public record and who decides.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function TopProspectsPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "ContactPage" }))} />
        <section className="eg-hero tone-ink" style={{ paddingBottom: 72 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "See your top prospects", path: PATH }]} />
            <div className="eg-split">
              <div>
                <Pills items={["Free", "Your own market", "Yours to keep"]} />
                <h1 className="eg-h1" style={{ fontSize: "clamp(36px, 4.4vw, 58px)" }}>
                  See your top prospects: a free <em>B2B prospect list</em> from your own market.
                </h1>
                <p className="eg-lead">
                  Tell us what you sell and where. We build a sample of real accounts from your territory, each with the reason it&apos;s worth a call now, the
                  public record behind it and who decides. Then we walk through it together: thirty minutes, no pitch deck.
                </p>
                <ul className="eg-list" style={{ marginTop: 30 }}>
                  <li><span><b>Real accounts</b> from your own territory, not a demo</span></li>
                  <li><span><b>The reason and the record</b> on every one</span></li>
                  <li><span><b>Who decides,</b> by seat</span></li>
                  <li><span><b>Yours to keep,</b> whether or not you buy</span></li>
                </ul>
              </div>
              <div className="eg-form-card">
                <h2 className="eg-h3" style={{ fontSize: 22, marginBottom: 6 }}>Build my prospect list</h2>
                <p className="eg-body" style={{ fontSize: 15, marginBottom: 26 }}>
                  Prefer to talk? Call <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a> or <a className="eg-link" href={SITE.book.href}>book a call</a>.
                </p>
                <ProspectsForm />
              </div>
            </div>
          </div>
        </section>
        <Section tone="paper" label="What you will receive">
          <div className="eg-split center">
            <div>
              <h2 className="eg-h2">What your sample looks like.</h2>
              <p className="eg-answer">The same ranked list your team would see every morning in its own portal: a score, the reason, a link to the record and the person who decides. Ours uses fictional accounts; yours uses your market.</p>
            </div>
            <BrowserFrame label="Sample call list with fictional accounts, showing what a prospect list sample looks like" caption={MOCK_CAPTION}>
              <PortalCallList />
            </BrowserFrame>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
