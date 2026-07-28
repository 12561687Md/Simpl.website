import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
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
    default: "Simpl | Your Digital Presence, Handled",
    template: "%s · Simpl",
  },
  description:
    "Simpl monitors your website, Google Business Profile, SEO, and online presence 24/7. Type your URL and get your free Simpl Score in seconds.",
  metadataBase: new URL("https://simpl.pro"),
  openGraph: {
    type: "website",
    siteName: "Simpl",
    url: "https://simpl.pro",
    images: [{ url: "/brand/simpl-cover-1200x675.png", width: 1200, height: 675, alt: "Simpl, your digital presence handled" }],
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
