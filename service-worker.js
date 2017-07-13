self.addEventListener('install', function (event) {
  event.waitUntil(self.caches.open('pizza').then(function (cache) {
    return cache.addAll([
      '/',
      '/index.html',
      '/index.js',
      '/styles.css',
      '/manifest.json',
      '/images/ariel.jpg',
      '/images/callisto.jpg',
      '/images/charon.png',
      '/images/deimos.jpg',
      '/images/dione.jpg',
      '/images/earth.jpg',
      '/images/enceladus.jpg',
      '/images/europa.jpg',
      '/images/ganymede.jpg',
      '/images/iapetus.jpg',
      '/images/io.jpg',
      '/images/jupiter.jpg',
      '/images/luna.jpg',
      '/images/mars.jpg',
      '/images/mercury.jpg',
      '/images/miranda.jpg',
      '/images/neptune.jpg',
      '/images/oberon.jpg',
      '/images/pluto.jpg',
      '/images/rhea.jpg',
      '/images/saturn.jpg',
      '/images/tethys.jpg',
      '/images/titan.jpg',
      '/images/titania.jpg',
      '/images/triton.jpg',
      '/images/umbriel.jpg',
      '/images/uranus.jpg',
      '/images/venus.jpg'
    ])
  }))
})

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    return response || self.fetch(event.request)
  }))
})
