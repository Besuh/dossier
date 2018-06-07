importScripts('/js/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('mecache').then(function(cache) {
     return cache.addAll( [
        '/',
        '/index.html',
        '/views/main.html',
        '/views/pwa.html',
        '/views/td.html',
        '/views/tw.html',
        '/views/cat.html',
        '/css/main.css',
        '/js/jquery.js',
        '/js/main.js'
    ]);
   })
 );
});

self.addEventListener('fetch', function(event) {

  console.log(event.request.url);
  
  event.respondWith(
  
  caches.match(event.request).then(function(response) {
  
  return response || fetch(event.request);
  
  })
  
  );
  
  });  