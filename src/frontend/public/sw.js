const CACHE_NAME = 'saan-rewards-v1';
const OFFLINE_URL = '/offline.html';

// Cache offline page and app icons
const ASSETS_TO_CACHE = [
  '/offline.html',
  '/assets/generated/saan-rewards-app-icon.dim_512x512.png',
  '/assets/generated/saan-rewards-app-icon-maskable.dim_512x512.png'
];

// Install event - cache offline page and icons
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.error('Failed to cache offline assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first, offline page for navigation failures
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Show offline page when navigation fails
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // For icon requests, try cache first
  if (event.request.url.includes('/assets/generated/saan-rewards-app-icon')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  // For all other requests, use network
  event.respondWith(fetch(event.request));
});
