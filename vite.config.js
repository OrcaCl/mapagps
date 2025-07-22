// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // usamos el directorio raíz como base
  base: './', // para rutas relativas correctas
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
