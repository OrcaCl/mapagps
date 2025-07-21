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

# TODO - Próximos pasos para el mapa interactivo

## 1. Layer con opciones de visualización
- Implementar control de capas (checkboxes o toggles) para:
  - Mostrar/ocultar rutas por categoría.
  - Mostrar/ocultar puntos de interés (POIs).
- Definir roles:
  - Administrador: puede modificar visibilidad y combinaciones.
  - Visitante: solo puede visualizar capas disponibles.
- Evaluar interfaz para administrar estas opciones desde un panel o config.

## 2. Actualización de GitHub Pages
- Confirmar que push a `master` despliega automáticamente la web.
- Investigar o documentar buenas prácticas para evitar cacheo:
  - Limpieza de caché en navegador.
  - Configuración de headers o meta tags.
- Verificar estructura y ubicación correcta de archivos para despliegue.

## 3. Linkear Plus Codes desde Wix a rutas GeoJSON
- Investigar cómo pasar Plus Codes o IDs desde Wix a la URL del mapa.
- Capturar esos parámetros en el front del mapa para:
  - Hacer zoom y centrar en la ubicación.
  - Mostrar ruta o POI relacionada.
- Diseñar flujo para mantener sincronía entre Wix y el mapa interactivo.

---

Este plan permitirá mejorar la experiencia del mapa, facilitar la gestión y lograr integración con Wix.

---


# TODO - Integración de Plus Codes para POIs

- Centralizar los POIs en un archivo JSON con campos:
  - name
  - plusCode
  - description
  - category

- En el mapa, crear una capa exclusiva para POIs que:
  - Use la librería `open-location-code` para decodificar los Plus Codes a coordenadas.
  - Agregue marcadores Leaflet con popup mostrando nombre y descripción.

- Cargar el JSON de POIs desde `/data/pois.json` y poblar la capa.

- Pensar en filtros futuros:
  - Por categoría.
  - Por proximidad.

- Preparar spike alpha para integrar y probar la funcionalidad.

---

Esta tarea permitirá que las ubicaciones definidas con Plus Codes desde Wix se integren fácilmente al mapa interactivo.

---


# No olvidar "
- hacer git tag v0.x.x -m "Mensaje" cuando haga cambios radicales

