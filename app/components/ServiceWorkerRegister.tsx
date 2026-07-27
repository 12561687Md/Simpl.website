"use client";

import { useEffect } from "react";

/**
 * PWA is disabled for now. The earlier service worker cached pages and hid
 * edits, so this component no longer registers one; instead it unregisters any
 * existing worker and clears caches, on every environment, so nobody keeps
 * getting served stale content. public/sw.js is a self-destructing stub that
 * finishes the job browser-side. Re-enable registration when the app phase is
 * ready.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});
    if (typeof caches !== "undefined") {
      caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {});
    }
  }, []);
  return null;
}
