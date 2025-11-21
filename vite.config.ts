import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/VidaPlus_Uninter_SHSS/', // Base path para GitHub Pages
  server: {
    port: 5173,
    host: '0.0.0.0', // Permite acesso de qualquer IP na rede
    strictPort: false,
    open: false,
    // Configurações adicionais para melhor compatibilidade
    hmr: {
      host: 'localhost'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})

