
const CACHE = 'smart-stop-v4';

const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Network-first loading with offline fallback.
self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request, { cache: 'no-store' })
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache =>
            cache.put(request, copy)
          );
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);

        if (cached) return cached;

        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }

        return new Response('Offline', { status: 503 });
      })
  );
});

// Existing in-app notification support.
self.addEventListener('message', event => {
  if (event.data?.type === 'SMART_STOP_ALERT') {
    event.waitUntil(
      self.registration.showNotification('Smart Stop 🔔', {
        body: event.data.message,
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: 'smart-stop-alert',
        requireInteraction: true
      })
    );
  }
});

// NEW: Receive remote push notifications.
self.addEventListener('push', event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {
      body: event.data ? event.data.text() : ''
    };
  }

  const title = data.title || 'Smart Stop 🔔';

  const options = {
    body: data.body || 'Your destination is approaching.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'smart-stop-push-alert',
    requireInteraction: true,
    data: {
      url: './'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Open Smart Stop when a notification is tapped.
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const target = new URL('./', self.location.href).href;

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(windowClients => {
      for (const client of windowClients) {
        if ('focus' in client) {
          return client.focus();
        }
      }

      return clients.openWindow(target);
    })
  );
});
