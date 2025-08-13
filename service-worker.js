// Increment this version when you want to force cache update
const CACHE_VERSION = 2;
const CACHE_NAME = `compliment-cards-v${CACHE_VERSION}`;
const CORE = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/js/app.js',
  '/js/ai-engine.js',
  '/js/canvas-engine.js',
  '/js/templates.js',
  '/js/effects.js',
  '/js/gif-generator.js',
  '/gif.worker.js',
  '/assets/icon.svg',
  '/assets/favicon.svg',
  '/manifest.json'
];

// Google Fonts to cache for offline support
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&family=Caveat:wght@400;700&family=Bebas+Neue&family=Dancing+Script:wght@400;700&display=swap'
];

// Cache core assets on install
self.addEventListener('install', (event) => {
  console.log(`Service Worker v${CACHE_VERSION} installing...`);
  
  // Force this service worker to become the active one
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache core assets
      try {
        await cache.addAll(CORE);
        console.log('Core assets cached successfully');
      } catch (err) {
        console.log('Core asset caching failed for some resources:', err);
      }
      
      // Try to cache fonts but don't fail installation if it doesn't work
      try {
        const fontResponses = await Promise.all(
          FONT_URLS.map(url => fetch(url, { mode: 'cors' }))
        );
        await Promise.all(
          fontResponses.map((response, i) => {
            if (response.ok) {
              return cache.put(FONT_URLS[i], response);
            }
          })
        );
        console.log('Fonts cached successfully');
      } catch (err) {
        console.log('Font caching failed, continuing:', err);
      }
    })
  );
});

// Clean old caches on activate
self.addEventListener('activate', (event) => {
  console.log(`Service Worker v${CACHE_VERSION} activating...`);
  
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key.startsWith('compliment-cards-')) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => {
      // Claim all clients immediately
      console.log('Service Worker activated and claiming clients');
      return self.clients.claim();
    })
  );
});

// Improved fetch strategy with offline fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // Skip non-GET requests
  if (req.method !== 'GET') return;
  
  // Skip chrome extension requests
  if (req.url.includes('chrome-extension://')) return;
  
  // Skip data URLs
  if (req.url.startsWith('data:')) return;
  
  // Handle Google Fonts with cache-first strategy
  if (req.url.includes('fonts.googleapis.com') || req.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        
        return fetch(req).then(response => {
          // Cache successful font responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(req, responseClone);
            }).catch(() => {});
          }
          return response;
        }).catch(() => {
          // Return a fallback response for fonts
          return new Response('', { status: 200 });
        });
      })
    );
    return;
  }
  
  // Handle CDN resources (Tailwind, Alpine, etc.)
  if (req.url.includes('cdn.') || req.url.includes('unpkg.com') || req.url.includes('cdnjs.cloudflare.com')) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        
        return fetch(req).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(req, responseClone);
            }).catch(() => {});
          }
          return response;
        }).catch(() => {
          // Return cached version if available
          if (cached) return cached;
          return new Response('', { status: 200 });
        });
      })
    );
    return;
  }
  
  // Use network-first strategy for app resources to ensure updates
  event.respondWith(
    fetch(req).then(response => {
      // Update cache in background if response is ok
      if (response.ok) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(req, responseClone);
        }).catch(() => {});
      }
      return response;
    }).catch(() => {
      // If network fails, try cache
      return caches.match(req).then(cached => {
        if (cached) return cached;
        
        // For navigation requests, return the offline page
        if (req.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        
        // For other requests, return an offline response
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Listen for skip waiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Send cache version to client
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
}); 