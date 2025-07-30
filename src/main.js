import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './css/styles.css';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator.js';

// Inicializar mapa
const map = L.map('map').setView([-33.970193918341806, -71.86508083380814], 14);

// Capa base de mapa
 const mapaClasico = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; OpenStreetMap contributors'
 }).addTo(map);

//Capa Satelital - Por si me consigo una API de google maps, acá debería agregarla
// const mapaSatelital =  
//     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
//     attribution: 'Tiles © Esri',
//     maxZoom: 19
//   }).addTo(map);

// Tipo de mapa. Clásico (Calles y formas de colores), Satélital (Texturas realistas)
//  const baseMaps = {
//   "Satélite": mapaSatelital,
//   "Mapa Clásico": mapaClasico
//  };

// Estilo para rutas
//  const estiloRutas = {
//    color: '#ffc800ff',
//    weight: 4,
//    opacity: 0.8
//  };

// Icono para POI
const iconoPOI = L.icon({
  iconUrl: '/assets/icons/bike.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Capa rutas
//  const rutasLayer = L.geoJSON(null, {
//    style: estiloRutas,
//    onEachFeature: (feature, layer) => {
//      const { name, description } = feature.properties;
//      layer.bindPopup(`<strong>${name}</strong><br>Dificultad: ${description}`);
//    }
//  }).addTo(map);

const iconInicio = L.icon({
  iconUrl: '/assets/icons/pin-start.svg',  // o la ruta de tu ícono
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const iconFin = L.icon({
  iconUrl: '/assets/icons/finish-line.svg', // o la ruta de tu ícono
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});



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
//Refactor con Carl Sagan
async function cargarRutasGeoJSON() {
  const indexPath = './data/rutas/geojson/index.json';
  const rutasGroup = L.featureGroup();
 

  const fetchJSON = (path) =>
    fetch(path).then(res => {
      if (!res.ok) throw new Error(`Error al cargar ${path}`);
      return res.json();
    });


  // TODO: Asignar distintos colores a distintos tipos de SENDEROS / CIRCUITOS SUGERIDOS / OTROS
  const getRutaStyle = (i) => ({
    color: colores[i % colores.length],
    weight: 4,
    opacity: 0.9,
  });

  try {
    //Revisa el indice de archivos geojson
    const archivos = await fetchJSON(indexPath);
    if (!Array.isArray(archivos)) {
      console.error('index.json no contiene un array válido');
      return;
    }

    //Recorrelos cada uno, para pintarlo, agregarle flechas, inicio-fin
    // TODO y otras weas después (Categoría, Dificultad, Enlace-descarga, etc)
    for (let i = 0; i < archivos.length; i++) {
      //Pesca el archivo
      const ruta = `./data/rutas/geojson/${archivos[i]}`;
      try {
        const ruta_geojson = await fetchJSON(ruta);

        const dibujada = L.geoJSON(ruta_geojson, {
          style: getRutaStyle(i),
          onEachFeature: (feature, layer) => {

            // TODO Mejorar esta parte, si tiene más detalles o no.
            // TODO Quizás separar en un módulo de control de las propiedades disponibles - futuras
            if (feature.properties?.name && feature.properties?.bikeCat) {
              layer.bindPopup(`<strong>Nombre Sendero: ${feature.properties.name}</strong>
                              <br>
                              <span>Categoría: ${feature.properties.bikeCat}</span>`);
            } else {
              layer.bindPopup(`<strong>Nombre Sendero: ${feature.properties.name}</strong>`)
            }
          }
        }).addTo(rutasGroup);

        //Mod Polylines  
        // 👉 Recorrer las capas internas de geoJSON para aplicar flechas
        dibujada.eachLayer((poly) => {
          if (poly instanceof L.Polyline) {
            L.polylineDecorator(poly, {
              patterns: [
                {
                  offset: 10,
                  repeat: 100, // flechas más frecuentes
                  symbol: L.Symbol.arrowHead({
                    pixelSize: 8,
                    headAngle: 45,
                    pathOptions: {
                      fillOpacity: 1,
                      weight: 1,
                      color: '#ffb300ff'
                    }
                  })
                }
              ]
            }).addTo(rutasGroup);
          }
        });


        
       // Obtener coordenadas inicio/fin
        dibujada.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            const coords = layer.getLatLngs();
            if (coords.length > 0) {
              // Primer punto
              L.marker(coords[0], { icon: iconInicio })
                .bindPopup('Inicio')
                .addTo(rutasGroup);

              // Último punto (si es multilínea, tomar el último segmento)
              const last = coords[coords.length - 1];
              const finalPoint = Array.isArray(last) ? last[last.length - 1] : last;
              L.marker(finalPoint, { icon: iconFin })
                .bindPopup('Fin')
                .addTo(rutasGroup);
            }
          }
        });
        



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
  //"Rutas": rutas_geojson,
  "Puntos de Interés": poisLayer
};
L.control.layers(null, overlays).addTo(map);

//L.control.layers(baseMaps).addTo(map);


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


