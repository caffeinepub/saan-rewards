const CACHE_NAME = 'video-editor-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache for offline use
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/assets/generated/video-editor-icon.dim_256x256.png',
  '/assets/generated/video-editor-icon-maskable.dim_256x256.png',
  '/assets/generated/video-editor-icon.dim_192x192.png'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.error('Failed to cache assets:', err);
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

// Fetch event - serve app shell from cache when offline
self.addEventListener('fetch', (event) => {
  // For navigation requests, try network first, then cache, then offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful navigation responses
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Try to serve from cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to offline page
            return caches.match(OFFLINE_URL);
          });
        })
    );
  } else {
    // For other requests, try network first, fallback to cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache successful responses
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});
