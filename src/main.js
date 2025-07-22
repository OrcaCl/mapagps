import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './css/styles.css';

// Inicializar mapa
const map = L.map('map').setView([-33.970193918341806, -71.86508083380814], 14);

// Capa base de mapa
 const mapaClasico = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; OpenStreetMap contributors'
 }).addTo(map);

//Capa Satelital - Por si me consigo una API de google maps, acá debería agregarla
const mapaSatelital =  
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
    attribution: 'Tiles © Esri',
    maxZoom: 19
  }).addTo(map);


 const baseMaps = {
   "Mapa Clásico": mapaClasico,
   "Satélite": mapaSatelital,
 };

// Estilo para rutas
const estiloRutas = {
  color: '#007bff',
  weight: 4,
  opacity: 0.8
};

// Icono para POI
const iconoPOI = L.icon({
  iconUrl: '/assets/icons/bike.svg',
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


const colores = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6'];




//Loop para leer los registros de rutas GeoJSon y agregarlas al layer de rutas del mapa
/*
async function cargarRutasGeoJSON() {
  const indexPath = './data/rutas/geojson/index.json';
  const rutasGroup = L.featureGroup();

  try {
    const res = await fetch(indexPath);
    const archivos = await res.json();

    let i = 0;
    for (const archivo of archivos) {
      const ruta = `./data/rutas/geojson/${archivo}`;
      try {
        const res = await fetch(ruta);
        const geojson = await res.json();

        L.geoJSON(geojson, {
          style: {
            color: colores[i % colores.length],
            weight: 4,
            opacity: 0.9,
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties?.name) {
              layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
            }
          }
        }).addTo(rutasGroup);

        i++;
      } catch (err) {
        console.error(`Error cargando ${ruta}`, err);
      }
    }

    rutasGroup.addTo(map);

    if (rutasGroup.getLayers().length > 0) {
      map.fitBounds(rutasGroup.getBounds());
    }
  } catch (err) {
    console.error('No se pudo cargar el index.json', err);
  }
}
*/

//Refactor con Carl Sagan
async function cargarRutasGeoJSON() {
  const indexPath = './data/rutas/geojson/index.json';
  const rutasGroup = L.featureGroup();

  const fetchJSON = (path) =>
    fetch(path).then(res => {
      if (!res.ok) throw new Error(`Error al cargar ${path}`);
      return res.json();
    });

  const getRutaStyle = (i) => ({
    color: colores[i % colores.length],
    weight: 4,
    opacity: 0.9,
  });

  try {
    const archivos = await fetchJSON(indexPath);
    if (!Array.isArray(archivos)) {
      console.error('index.json no contiene un array válido');
      return;
    }

    for (let i = 0; i < archivos.length; i++) {
      const ruta = `./data/rutas/geojson/${archivos[i]}`;
      try {
        const geojson = await fetchJSON(ruta);

        L.geoJSON(geojson, {
          style: getRutaStyle(i),
          onEachFeature: (feature, layer) => {
            if (feature.properties?.name) {
              layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
            }
          }
        }).addTo(rutasGroup);
      } catch (err) {
        console.error(`Error cargando ${ruta}`, err);
      }
    }

    rutasGroup.addTo(map);

    if (rutasGroup.getLayers().length > 0) {
      map.fitBounds(rutasGroup.getBounds());
    }
  } catch (err) {
    console.error('No se pudo cargar el index.json', err);
  }
}

//Llamado al map.
cargarRutasGeoJSON();


/** PUNTOS DE INTERÉS ---  V2 --- */

fetch('./data/lugares/geojson/pois.geojson')
  .then(res => res.json())
  .then(data => poisLayer.addData(data));


// Control de capas - UI del mapa (TODO)
const overlays = {
  "Rutas": rutasLayer,
  "Puntos de Interés": poisLayer
};
L.control.layers(null, overlays).addTo(map);

L.control.layers(baseMaps).addTo(map);


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


