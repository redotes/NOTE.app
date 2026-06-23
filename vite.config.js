import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/NOTE.app/' : '/',
  server: {
    port: parseInt(process.env.PORT) || 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
