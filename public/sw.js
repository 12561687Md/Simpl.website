/* Self-destructing service worker.
 *
 * A previous version cached pages/assets and kept serving stale content (edits
 * didn't show up). This version takes over, deletes every cache, unregisters
 * itself, and reloads open tabs. The browser re-fetches sw.js on navigation on
 * its own, so this runs even when page JS was cached, breaking the chicken-and-
 * egg. No fetch handler = no caching at all. Re-introduce a real SW only when
 * the PWA/app phase is ready.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        await self.registration.unregister();
        const clients = await self.clients.matchAll({ type: "window" });
        clients.forEach((c) => c.navigate(c.url));
      } catch {
        /* no-op */
      }
    })()
  );
});
