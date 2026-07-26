import type { MetadataRoute } from "next";

/**
 * Web App Manifest. Next serves this at /manifest.webmanifest and auto-injects
 * the <link rel="manifest">. Together with the service worker (public/sw.js,
 * registered in the layout) it makes simpl.pro installable to a desktop, phone
 * home screen, or taskbar, opening standalone like the Simpl app.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Simpl — Your Digital Presence, Handled",
    short_name: "Simpl",
    description:
      "Fix your business's online presence. Your Simpl Score, findings, and one-tap fixes, in one app.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0C0D",
    theme_color: "#0B0C0D",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
