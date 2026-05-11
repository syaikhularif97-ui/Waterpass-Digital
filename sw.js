const CACHE_NAME = 'waterpass-uin-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Tambahkan path ikon jika sudah ada, contoh:
  // './icon-192.png',
  // './icon-512.png'
];

// Tahap Install: Menyimpan file ke dalam Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Tahap Aktifasi: Membersihkan cache lama jika ada pembaruan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Strategi Fetch: Ambil dari cache dulu, jika gagal baru ambil dari jaringan (Cache First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
