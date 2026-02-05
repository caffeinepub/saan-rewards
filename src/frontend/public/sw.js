const CACHE_NAME = 'traffic-jam-v2-online-only';
const OFFLINE_URL = '/offline.html';

// Only cache the offline fallback page and icons
const ASSETS_TO_CACHE = [
  '/offline.html',
  '/assets/generated/traffic-jam-app-icon.dim_512x512.png',
  '/assets/generated/traffic-jam-app-icon-maskable.dim_512x512.png'
];

// Install event - cache only offline page and icons
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

// Fetch event - network-only for game assets, offline page for navigation failures
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
  if (event.request.url.includes('/assets/generated/traffic-jam-app-icon')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  // For all other requests (game JS, assets, etc.), always use network
  // Do not cache game assets to prevent offline gameplay
  event.respondWith(fetch(event.request));
});
