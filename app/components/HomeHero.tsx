"use client";

import { useRouter } from "next/navigation";
import BusinessSearch, { type Prediction } from "./BusinessSearch";
import PlatformLogos from "./PlatformLogos";
import TextRotator from "./TextRotator";
import { ShaderBackground } from "@/components/ui/shader-background";

/**
 * The hero is now purely an entrance. Scanning used to happen in place, which
 * meant the results had nowhere to live and no URL to return to; it now hands
 * off to /audit, where the scan gets a full page and a shareable address.
 */
export default function HomeHero() {
  const router = useRouter();

  function startAudit(p: Prediction) {
    // Name and address ride along from the prediction, which we already have for
    // free. That lets the gate greet them by name without spending a Places
    // Details call on someone who might not fill it in. Display-only: the server
    // trusts nothing here but placeId.
    const q = new URLSearchParams({ place: p.placeId, name: p.name, address: p.address });
    router.push(`/audit?${q}`);
  }

  return (
    <div style={{ position: "relative" }}>
      <ShaderBackground fade={false} />
      {/* Legibility scrim, centre-weighted to sit behind the centred copy. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(95% 85% at 50% 42%, rgba(11,13,15,0.66) 0%, rgba(11,13,15,0.38) 55%, rgba(11,13,15,0.14) 100%)",
        }}
      />
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1120,
          margin: "0 auto",
          padding: "104px 32px 64px",
          textAlign: "center",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 30,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
          <span>Free website audit · Real results in 30 seconds</span>
        </div>

        <h1
          style={{
            margin: "0 auto",
            fontSize: "clamp(36px, 5.6vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            maxWidth: 940,
          }}
        >
          Your business is always online.
          <br />
          SIMPL makes sure it&apos;s always{" "}
          <TextRotator words={["winning", "ranking", "running", "learning"]} />.
        </h1>

        {/* The pitch paragraph lived here and was cut on purpose: it was the only
            thing competing with the scan input for attention. It is not retired —
            it's the root description of SIMPL (see .agents/product-marketing.md)
            and needs a permanent home further down the page. */}

        <div style={{ marginTop: 40 }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>See where you stand. Find your business</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("[data-section='simpl-score']")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 1,
                fontSize: 11,
              }}
            >
              How it works ↓
            </a>
          </div>

          <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "left" }}>
            {/* Name-first search. Asking a contractor for their domain assumes
                they know it; asking for their business name assumes nothing, and
                the listing hands us the domain anyway. */}
            <BusinessSearch onSelect={startAudit} autoFocus />

            {/* Reassurance sits directly under the input, where the hesitation is.
                Worded to stay true after the email gate: we do store an address
                now, so the promise is about credentials and selling, not storage
                in general. */}
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                marginTop: 12,
                letterSpacing: "0.06em",
                opacity: 0.75,
              }}
            >
              Your data stays private. We never store credentials and we never sell your details.
            </div>
          </div>

          <PlatformLogos />
        </div>
      </section>
    </div>
  );
}
