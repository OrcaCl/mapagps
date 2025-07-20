# 📋 TODO - mapaGPS

## 🧪 Spikes
- [x] Conversión GPX/KML a GeoJSON (posible uso de `togeojson` o `gpx2geojson`)
- [ ] Clasificación automática de rutas por nombre o carpeta
- [ ] Integración de rutas con capas de Leaflet
- [ ] UI para cambiar estilo/color/visible desde frontend
- [ ] Agrupar rutas por disciplina y empresa

## 🧹 Batch Tools
- [x] Configuración base
- [ ] Limpieza de propiedades
- [ ] Agregar propiedades por defecto
- [ ] Simplificación de geometrías

## 🔜 Por hacer
- Mostrar dinámicamente los archivos en el mapa con Leaflet
- Agregar puntos de interés (POIs) fijos
- UI para activar/desactivar rutas por empresa/tipo
- Documentar formato de los nombres de archivo GPX


### Avances del Proyecto ###

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

