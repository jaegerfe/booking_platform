import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import { fileURLToPath } from 'url'
import path, { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    eslintPlugin({
      eslintOptions: {
        fix: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'moment-range': path.resolve('./node_modules/moment-range/dist/moment-range')
    },
    
  },
  server: {
    host: true,
    port: 5173
  }
})
