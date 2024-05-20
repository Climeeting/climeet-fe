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
            '/v1': {
              target: 'https://api.cli-meet.com',
              changeOrigin: true,
              secure: true,
            },
          },
        }
      : undefined,
  }
})
