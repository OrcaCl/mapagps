### Primeros pasos con los mapas de Leaflet.js ###
## Proyecto de mapa interactivo con OpenStreetMaps + Leaflet.js + GPX->GeoJSON #

### Avances del Proyecto ###

## 30/07/2025 ##

- Implementadas **flechas de dirección** en rutas usando `leaflet-polylinedecorator`.  
- Añadidos **iconos de inicio y fin** en cada ruta.  
- Corregido error del `id` del mapa en el `index.html` (ya se muestra correctamente).  
- Reorganizados los datos fuente en `data-source/` (GPX y CSV de POI).  
- Pendiente: probar variables `.env` para estilos y armar script de **CSV → GeoJSON**.

## 21/07/2025
- Empezar migración de carpetas, scripts y todo al entorno de Vite
- Habilitar gitignore que lo tenía mal configurado :S
- Integrando Vite en la carpeta anterior para no tener tanta redundancia
- Migramos el proyecto base a Vite para aprovechar un entorno moderno, rápido y eficiente.
- Reorganizamos carpetas para separar los datos fuente (GPX, CSV) en `./data-source/` y dejar solo archivos consumibles (GeoJSON) en `./data/`.
- Ajustamos la estructura y configuración para que Vite sirva correctamente el mapa Leaflet y los assets, incluyendo CSS, scripts y datos.
- Corregimos errores de paths y IDs en el código (ej: div `id="map"` en HTML vs JS).
- Implementamos la carga dinámica de rutas GeoJSON al mapa y la visualización de puntos de interés.
- Validamos la configuración para desarrollo local con Vite (`npm run dev`) y manejo de versiones de Node con `nvm`.


## 20/07/2025

### ✅ Completado

- Creación de script en bash para hacer respaldos manuales antes de cambios muy grandes (dado que hace rato que no uso git y puedo cagarla nuevamente como pasó con la versión 0.1 que borré sin querer xD)
- Backup inicial en carpeta de backups/
- Eliminar jest porque no lo voy a usar todavía.
- Limpiar node_modules
- Preparar el master para el nuevo salto que será migrar a Vite antes de que se me complejice más el proyecto.


## 19/07/2025

### ✅ Completado
- Spike inicial para `gpx-to-geojson`
- Conversión básica de GPX a GeoJSON con `@tmcw/togeojson`
- Uso de `JSDOM` (¡mantener!) para parseo del GPX
- Script `npm run convert` funcional para importar varios `.gpx`
+ Salida directa de los archivos `.geojson` en `data/rutas/geojson`
- Creación automática de carpetas de salida
- Uso de `debug` para logging selectivo (`debug:convert`)
- Estructura base para mostrar los GeoJSON en el mapa


## Inicio: 17/7/2025

- Estructura base y organización de la mente sobre cómo iba a estructurar este proyecto.


## 🧪 Tecnologías

- [Leaflet](https://leafletjs.com/)
- [Vite](https://vitejs.dev/)
- [leaflet-polylinedecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator)

---

> 🔖 Nota: Revisar el archivo [TODO.md](./TODO.md) para el backlog completo y tareas futuras.