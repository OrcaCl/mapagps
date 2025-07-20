import { appendFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const logsDir = path.resolve('logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'rutas_convertidas.log');

/**
 * Loguea mensajes con timestamp en archivo de texto dentro de logs/rutas_convertidas.log
 * @param {string} message Mensaje a guardar
 */
export function logToFile(message) {
  const timestamp = new Date().toISOString();
  appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}
