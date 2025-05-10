const CACHE_NAME = 'deck-of-cards-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/img/logo.jpg',
  '/js/about.js',
  '/js/api.js',
  '/js/challenges.js',
  '/js/contacts.js',
  '/js/favoritos.js',
  '/js/search.js',
  '/js/tabs.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
