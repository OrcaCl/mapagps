### Primeros pasos con los mapas de Leaflet.js ###
# Proyecto de mapa interactivo con OpenStreetMaps + Leaflet.js + GPX->GeoJSON #

### Avances del Proyecto ###

# 20/07/2025

## ✅ Completado

- Creación de script en bash para hacer respaldos manuales antes de cambios muy grandes (dado que hace rato que no uso git y puedo cagarla nuevamente como pasó con la versión 0.1 que borré sin querer xD)
- Backup inicial en carpeta de backups/
- Eliminar jest porque no lo voy a usar todavía.
- Limpiar node_modules
- Preparar el master para el nuevo salto que será migrar a Vite antes de que se me complejice más el proyecto.


# 19/07/2025

## ✅ Completado
- Spike inicial para `gpx-to-geojson`
- Conversión básica de GPX a GeoJSON con `@tmcw/togeojson`
- Uso de `JSDOM` (¡mantener!) para parseo del GPX
- Script `npm run convert` funcional para importar varios `.gpx`
+ Salida directa de los archivos `.geojson` en `data/rutas/geojson`
- Creación automática de carpetas de salida
- Uso de `debug` para logging selectivo (`debug:convert`)
- Estructura base para mostrar los GeoJSON en el mapa


# Inicio: 17/7/2025

- Estructura base y organización de la mente sobre cómo iba a estructurar este proyecto.