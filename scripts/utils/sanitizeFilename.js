/**
 * Sanitiza un nombre de archivo:
 * - Reemplaza guiones bajos múltiples por guiones medios
 * - Elimina guiones o guiones bajos al final
 * - Reemplaza espacios por guiones medios
 * - Pasa todo a minúsculas
 *
 * @param {string} name Nombre original
 * @returns {string} Nombre sanitizado
 */
export function sanitizeFilename(name) {
  return name
    .replace(/_+/g, '-')
    .replace(/[-_]+$/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
