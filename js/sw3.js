var cacheName = 'index-page';
var filesToCache = [
    '/',
    '/index.html',
    '/views/main.html',
    '/views/pwa.html',
    '/views/td.html',
    '/views/tw.html',
    '/views/cat.html',
    '/css/main.css',
    '/img/td.png',
    '/js/jquery.js',
    'manifest.json'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Cachin app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(response => {
            return response || fetch(event.request);
        })
    );
});