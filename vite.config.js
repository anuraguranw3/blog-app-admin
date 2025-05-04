import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://blog-app-backend-ri4x.onrender.com",
    }
  },
  plugins: [react()],
})
