// scripts/convert-gpx-to-geojson.js
//Imports requeridos
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import createDebug from 'debug';
import path from 'path';
import { config } from 'dotenv';
import { JSDOM } from 'jsdom';
import { gpx } from '@tmcw/togeojson';
import { sanitizeFilename, logToFile } from './utils/index.js';

//Banderita chilena, banderita tricolor
const force = process.argv.includes('--force');

//Cargando variables de entorno
config();

//Debug para hacer más amigable la cosa
const debug = createDebug('convert-gpx');

//Paths de trabajo
const inputDir = path.resolve(process.env.INPUT_DIR || 'data/rutas/gpx');
const outputDir = path.resolve(process.env.OUTPUT_DIR || 'data/rutas/geojson');

//Verificar si existe la ruta antes de patear
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
  debug('Directorio de salida creado: %s', outputDir);
}

const gpxFiles = readdirSync(inputDir).filter(f => f.endsWith('.gpx'));

//Avisame por log que vamos ok hasta acá cuántos encontramos antes de convertir
console.log(`📦 Encontrados ${gpxFiles.length} archivos GPX`);
debug('Proceso de conversión funcionanding: %s', gpxFiles);

//Empezamos el loop de conversión:
gpxFiles.forEach(file => {
  const inputPath = path.join(inputDir, file);

  //Fix de nombres zorreados originales
  const baseName = file.replace(/\.gpx$/,'');
  const cleanName = sanitizeFilename(baseName);
  const outputFilename = `${cleanName}.geojson`;
  const outputPath = path.join(outputDir, outputFilename);

  if (existsSync(outputPath) && !force) {
    const msg = `⚠️ Archivo ya existe, saltando: ${outputFilename}`;
    debug(msg);
    logToFile(msg);
    return;
  }

  //Leyendo la info de GPX y pasar a GeoJson en una variable temporal
  const gpxData = readFileSync(inputPath, 'utf8');
  const dom = new JSDOM(gpxData, { contentType: 'text/xml' });
  const geojson = gpx(dom.window.document);

  //const outputFilename = file.replace(/\.gpx$/, '.geojson');
  //const outputPath = path.join(outputDir, outputFilename);

  writeFileSync(outputPath, JSON.stringify(geojson, null, 2), 'utf8');

  const msg = `✅ Convertido: ${file} → ${outputFilename}`;
  debug(msg);
  logToFile(msg);
});

debug(`🎉 Conversión completada (${gpxFiles.length} archivos).`);