import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./engine.css";
import { organization, website, ldJson } from "./lib/schema";
import ScrollToTop from "./components/ScrollToTop";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import GoogleTags from "./components/GoogleTags";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// The audit-report typeface trio (ScanReport.tsx only) — matches the
// reference Noovis audit exactly rather than reusing the site's Inter/
// JetBrains pairing, since the report is a distinct deliverable document,
// not another marketing page.
// Report-only trio (ScanReport). preload:false so they don't block first paint
// on every route, only fetched when the report actually renders. Core Web Vitals.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-report-display",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-report-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-report-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Simpl | Custom Growth Engines for High-Ticket B2B Companies",
    template: "%s · Simpl",
  },
  description:
    "Simpl builds your own growth portal: every account in your market scored nightly from the public record, with the reason to call, the proof and who signs. Plus CRM, follow-up and a 24/7 AI receptionist.",
  /* WWW, AND IT MUST MATCH THE REDIRECT.
   *
   * This was the apex, https://www.simpl.pro, while Vercel 308-redirects the apex
   * to www. Every page's canonical resolves against metadataBase, so all
   * sixteen pages were telling Google that the authoritative version of
   * themselves is a URL that immediately bounces somewhere else. That is a
   * site-wide conflicting signal about which host is real, and it splits
   * whatever authority exists across two hostnames. On a domain with rank 0
   * there is none to spare.
   *
   * www is the side that actually serves, and it is what the business card
   * already says. If the apex is ever made primary instead, this line and the
   * Vercel domain setting have to change together, or the same bug comes back
   * pointing the other way. */
  metadataBase: new URL("https://www.simpl.pro"),
  openGraph: {
    type: "website",
    siteName: "Simpl",
    url: "https://www.simpl.pro",
    images: [{ url: "/brand/simpl-cover-1200x675.png", width: 1200, height: 675, alt: "Simpl, custom growth engines for B2B companies" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/simpl-cover-1200x675.png"],
  },
  // Installable-app identity. app/manifest.ts auto-injects the manifest link;
  // these give iOS/Safari its home-screen icon and standalone behavior.
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Simpl" },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        {/* Site-wide entity: one Organization + WebSite, referenced by @id from
            every page's Service / Breadcrumb / Article schema. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(organization(), website())} />
        <GoogleTags />
        <ServiceWorkerRegister />
        <ScrollToTop />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
