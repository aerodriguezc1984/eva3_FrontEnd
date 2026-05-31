import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracion de Vite.
// El "proxy" hace que cualquier llamada que empiece con /api
// se reenvie al servidor mock (Express) que corre en el puerto 4000.
// Asi el frontend consume endpoints como si fueran del mismo origen.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    // Separamos las dependencias grandes (react) en su propio archivo
    // para que el navegador las pueda cachear -> mejor rendimiento.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
