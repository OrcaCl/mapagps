import fs from 'fs';
import path from 'path';

const dir = path.resolve('data/rutas/geojson');

const archivos = fs.readdirSync(dir)
  .filter(f => f.endsWith('.geojson'));

fs.writeFileSync('data/rutas/geojson/index.json', JSON.stringify(archivos, null, 2));

console.log('index.json generado con:', archivos);
