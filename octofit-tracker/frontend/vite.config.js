import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'CODESPACE_NAME'],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})
