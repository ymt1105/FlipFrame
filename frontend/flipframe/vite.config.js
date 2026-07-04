import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const resolvedEnvPath = path.resolve(__dirname, '../../');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: resolvedEnvPath,
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
