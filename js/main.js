// Inicializar mapa
const map = L.map('map').setView([-33.970193918341806, -71.86508083380814], 14);




// Capa base
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Estilo para rutas
const estiloRutas = {
  color: '#007bff',
  weight: 4,
  opacity: 0.8
};

// Icono para POI
const iconoPOI = L.icon({
  iconUrl: './assets/icons/bike.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Capa rutas
const rutasLayer = L.geoJSON(null, {
  style: estiloRutas,
  onEachFeature: (feature, layer) => {
    const { name, description } = feature.properties;
    layer.bindPopup(`<strong>${name}</strong><br>Dificultad: ${description}`);
  }
}).addTo(map);

// Capa POIs
const poisLayer = L.geoJSON(null, {
  pointToLayer: (feature, latlng) => {
    return L.marker(latlng, { icon: iconoPOI });
  },
  onEachFeature: (feature, layer) => {
    const { name, description } = feature.properties;
    layer.bindPopup(`<strong>${name}</strong><br>${description}`);
  }
}).addTo(map);

// Cargar datos GeoJSON
fetch('../data/rutas.geojson')
  .then(res => res.json())
  .then(data => rutasLayer.addData(data));

fetch('../data/pois.geojson')
  .then(res => res.json())
  .then(data => poisLayer.addData(data));

// Control de capas
const overlays = {
  "Rutas": rutasLayer,
  "Puntos de Interés": poisLayer
};
L.control.layers(null, overlays).addTo(map);

//Centrar en dibujos.
map.fitBounds(geojsonLayer.getBounds());


/**
 * HERRAMIENTAS DE MAPAS - VISORES DE COORDENADAS ****** NO BORRAR AÜN
 */

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


