// Inicializa el mapa
const map = L.map('map').setView([-33.95, -71.85], 13);

// Capa base con OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Cargar rutas desde GeoJSON
fetch('data/rutas.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        color: feature.properties.color || 'green',
        weight: 4,
        opacity: 0.8
      }),
      onEachFeature: (feature, layer) => {
        if(feature.properties && feature.properties.name) {
          // Popup corregido: interpolación correcta
          layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
        }
      }
    }).addTo(map);
  })
  .catch(error => console.error('Error cargando rutas:', error));

// .then(data => {
//   const geojsonLayer = L.geoJSON(data, { /*...*/ }).addTo(map);
//   map.fitBounds(geojsonLayer.getBounds());
// })


// Crear un div para mostrar las coordenadas del mouse
const coordsDiv = L.control({position: 'bottomleft'});

coordsDiv.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'mouse-coords');
  this._div.style.background = 'rgba(255, 255, 255, 0.8)';
  this._div.style.padding = '5px';
  this._div.style.fontFamily = 'monospace';
  this._div.style.fontSize = '12px';
  this.update();
  return this._div;
};

coordsDiv.update = function (latlng) {
  this._div.innerHTML = latlng
    ? `🖱️ Lat: ${latlng.lat.toFixed(5)}, Lng: ${latlng.lng.toFixed(5)}`
    : '🖱️ Mueve el mouse...';
};

coordsDiv.addTo(map);

// Escuchar el movimiento del mouse sobre el mapa
map.on('mousemove', e => {
  coordsDiv.update(e.latlng);
});

//helper para hacer caminos
map.on('click', e => {
  console.log('Click en:', e.latlng);
});


