import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelop = mode === 'development'

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./global.scss";`,
        },
      },
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
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
      checker({
        typescript: true,
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
    preview: {
      port: 5173,
    },
    define: {
      // By default, Vite doesn't include shims for NodeJS/
      // necessary for segment analytics lib to work
      global: {},
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser', // 모듈의 실제 위치를 브라우저 번들러에게 알려줌
      },
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/], // 번들에 포함시킬 모듈의 경로
        extensions: ['.js', '.cjs'], // CommonJS 모듈로 간주할 파일의 확장자
        strictRequires: true, // require 구문에 해당 모듈이 없을 경우 에러 발생
        transformMixedEsModules: true, // import와 require문을 함께 사용하는 경우 이를 번들에 포함시키기 위함
      },
    },
  }
})
