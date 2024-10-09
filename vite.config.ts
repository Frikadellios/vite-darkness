import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import postCssOklabPolyfill from '@csstools/postcss-oklab-function'
import tailwindcss from '@tailwindcss/vite'
import cssDiscardComments from 'postcss-discard-comments'
import lightningcss from 'vite-plugin-lightningcss'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    cssMinify: 'lightningcss',
    chunkSizeWarningLimit: 2000
  },
  server: {
    fs: {
      allow: ['../..']
    }
  },
  ssr: {
    external: ['node:buffer', 'reading-time']
  },
  css: {
    postcss: {
      plugins: [postCssOklabPolyfill({ preserve: true }), cssDiscardComments({ removeAll: true })]
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    lightningcss({
      browserslist: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead'] // Correctly set browser queries
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
