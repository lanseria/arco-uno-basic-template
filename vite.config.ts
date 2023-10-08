import path from 'node:path'
import { cwd } from 'node:process'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = cwd()
  const env = loadEnv(mode, root)
  return {
    server: {
      host: env.VITE_HOST,
      port: +env.VITE_PORT,
      // proxy: {
      //   '^\/api\/': {
      //     target: env.VITE_PROXY_URL,
      //     changeOrigin: true,
      //     xfwd: true,
      //     rewrite: (path) => {
      //       const replacePath = path.replace(/^\/api/, '')
      //       return replacePath
      //     },
      //   },
      // },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [
      VueRouter({
        /* options */
      }),
      vue(),

      vueJsx(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        resolvers: [ArcoResolver()],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        resolvers: [
          ArcoResolver({
            resolveIcons: true,
            sideEffect: false,
          }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],

    optimizeDeps: {
      include: [
        '@arco-design/web-vue/es/locale/lang/zh-cn',
        '@vueuse/core',
      ],
    },

  }
}
