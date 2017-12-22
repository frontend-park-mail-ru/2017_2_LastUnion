const CACHE_NAME = 'app_serviceworker_v1';
const cacheUrls = [
    '/',
    '/css/style.css',
    '/img/favicon-16x16.png',
    '/img/favicon-96x96.png',
    '/img/fck.png',
    '/img/logo.png',
    '/img/m1.png',
    '/img/nekro.png',
    '/img/player00.png',
    '/img/player02.png',
    '/img/r1.png  r3.png',
    '/img/spike.png',
    '/img/favicon-32x32.png',
    '/img/favicon.ico',
    '/img/gem.png',
    '/img/m0.png',
    '/img/m2.png',
    '/img/octocat.png',
    '/img/player01.png',
    '/img/player03.png',
    '/img/r2.png',
    '/img/rocks.png',
    '/bundle.js'
];

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(cacheUrls);
            })
    );
});

this.addEventListener('fetch', event => {
    console.log(event);
    event.respondWith(caches.match(event.request)
        .then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});