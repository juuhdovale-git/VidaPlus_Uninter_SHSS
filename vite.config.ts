import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0', // Permite acesso de qualquer IP na rede
    strictPort: false,
    open: false,
    // Configurações adicionais para melhor compatibilidade
    hmr: {
      host: 'localhost'
    }
  }
})

