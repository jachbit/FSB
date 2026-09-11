// v3 — only cache same-origin, pass external requests through untouched
const CACHE = 'fsb-v3';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  // Only intercept same-origin requests — let external API calls (Yahoo Finance, proxies) go through natively
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }));
});
