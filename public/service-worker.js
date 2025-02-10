const CACHE_NAME = 'ride-share-driver-cache-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('CACHE_NAME').then(function(cache) {
        // return cache.addAll([
        //   '/',
        //   // '/index.html',
        //   'index.html',
        //   // '/styles.css',
        //   // '/script.js',
        //   // '/path/to/icon-192x192.png',
        //   // '/path/to/icon-512x512.png'
        //   '../media - partial/delete.png',
        //   '../media - partial/favicon.png'
        // ]);
        return cache.addAll([
          '/',
          'index.html',
          // './media-partial/icon-512x512.png',
          // './media-partial/icon-192x192.png'
          'icon-512x512.png',
          'icon-192x192.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });