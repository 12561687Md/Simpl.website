import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

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
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-report-display",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-report-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
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
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <ScrollToTop />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
