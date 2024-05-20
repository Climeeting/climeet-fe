import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const isDevelop = mode === 'development'
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
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
  })
}
