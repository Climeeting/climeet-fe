import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelop = mode === 'development'

  return {
    plugins: [
      react(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'service-worker.js',
        injectManifest: {
          injectionPoint: undefined,
        },
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        devOptions: {
          enabled: true,
        },
      }),
    ],
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
