import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const config = loadEnv(mode,'./')
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    },  
    server: {
      port: 5172,
      host: '0.0.0.0',
      hmr: {
        overlay: false
      },
      proxy: {
        '/api': {
          target: config.VITE_TARGET_URL,
          changeOrigin: true,
        },
        '/images': {
          target: config.VITE_TARGET_URL,
          changeOrigin: true,
        }
      }
    }
  }
})
