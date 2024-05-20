import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelop = mode === 'development'
  return {
    plugins: [react()],
    server: isDevelop
      ? {
          proxy: {
            '/api': {
              target: 'https://api.cli-meet.com',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
              secure: true,
            },
          },
        }
      : undefined,
  }
})
