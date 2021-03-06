const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    '/',
    'styles.css',
    'app.js'
];

// Call install event
self.addEventListener('install', e => {
    console.log('[Service Worker Installed]');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('[Service worker is Caching...]');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('[Service Worker Activated!]');
    // Lets clean up the old cache(s)
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) { 
                        console.log('[Service worker: Clearing old cache]');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )

});

self.addEventListener('fetch', e => {
    console.log('[Service worker: isFetching Cache');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request))
    )
})