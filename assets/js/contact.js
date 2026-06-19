// Interactive Google Map for contact page
// Requires: <div id="map"></div> exists in contact.html

(function () {
  function ensureScriptLoaded(src) {
    return new Promise((resolve, reject) => {
      // If already loaded, resolve
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing && window.google && window.google.maps) {
        resolve(window.google.maps);
        return;
      }

      const id = 'google-maps-js';
      const existingById = document.getElementById(id);
      if (existingById) {
        existingById.addEventListener('load', () => resolve(window.google.maps));
        existingById.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
        return;
      }

      window.__initContactMap = () => resolve(window.google.maps);

      const script = document.createElement('script');
      script.id = id;
      script.async = true;
      script.defer = true;
      script.onerror = () => reject(new Error('Failed to load Google Maps script'));
      script.src = src;
      document.head.appendChild(script);
    });
  }

  async function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    // Ensure the map has height
    if (!mapEl.style.height) mapEl.style.height = '420px';

    // Default location: Polokwane, South Africa (approx)
    const center = window.CONTACT_MAP_CENTER || { lat: -23.9042, lng: 29.4583 };
    const zoom = typeof window.CONTACT_MAP_ZOOM === 'number' ? window.CONTACT_MAP_ZOOM : 12;

    // Provide your own API key if you have one.
    // You can set window.GOOGLE_MAPS_API_KEY before this script runs.
    const apiKey = window.GOOGLE_MAPS_API_KEY || '';

    // Load Google Maps JS API with callback
    const src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=__initContactMap&libraries=places`;
    const maps = await ensureScriptLoaded(src);

    const map = new maps.Map(mapEl, {
      center,
      zoom,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: false,
      gestureHandling: 'greedy'
    });

    const marker = new maps.Marker({ position: center, map, title: 'Petshop - Polokwane' });

    const infoWindow = new maps.InfoWindow({
      content:
        '<div style="font-family:Arial,sans-serif">' +
        '<strong>Petshop</strong><br/>' +
        'Polokwane, South Africa<br/>' +
        '<span style="color:#666">Click marker for location</span>' +
        '</div>'
    });

    marker.addListener('click', () => {
      infoWindow.open({ anchor: marker, map, shouldFocus: false });
    });

    // Start centered
    map.panTo(center);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();

