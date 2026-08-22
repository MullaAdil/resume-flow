import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_GROQ_API_KEY': JSON.stringify(env.VITE_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || '')
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 4000
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5001',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
