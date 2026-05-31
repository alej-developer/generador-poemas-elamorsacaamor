import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Esta ruta base es crucial para que GitHub Pages cargue correctamente los recursos
  base: '/generador-poemas-elamorsacaamor/',
})
