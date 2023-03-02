if ('Notification' in window) {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      // show notification
    }
  });
}

self.addEventListener('fetch', event => {
  console.log('Fetch event triggered:', event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Cache hit:', event.request.url);
          return response;
        }

        console.log('Cache miss:', event.request.url);
        return fetch(event.request);
      })
      .catch(error => {
        console.log('Fetch error:', error);
      })
  );
});

self.addEventListener('push', event => {
  console.log('Push event triggered:', event.data.text());

  const title = 'Push Notification';
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('sync', event => {
  console.log('Sync event triggered:', event.tag);

  if (event.tag === 'sync-example') {
    event.waitUntil(
      // Perform sync operation here
    );
  }
});
