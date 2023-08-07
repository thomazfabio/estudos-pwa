// sw.js
// Nome do cache
const cacheName = 'my-app-cache-v1';

// Lista de arquivos que serão armazenados em cache
const filesToCache = [
  '/',
  'index.html',
  'app.js',
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

// Intercepta as solicitações e retorna o arquivo em cache, se disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
