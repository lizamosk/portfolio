import { fileURLToPath, URL } from 'node:url'
import path, { resolve, dirname } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      svgLoader(),
      vueDevTools(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
        fullInstall: false,
        compositionOnly: true,
        strictMessage: false,
    })
  ],
  resolve: {
      alias: {
          '@': path.resolve(__dirname, './src')
      }
  },
})
