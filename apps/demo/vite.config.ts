import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { Mode, plugin as markdown } from 'vite-plugin-markdown'
import revite from '../../packages/vite-plugin/src/plugin'

export default defineConfig({
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    markdown({
      mode: [Mode.HTML],
    }),
    revite({
      root: '/src/config',
      use: process.env.APP_CONFIG as string,
    }),
  ],
  optimizeDeps: {
    exclude: [
      'revite',
    ],
  },
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: /ServiceContract|ServiceProvider/,
      keep_fnames: /ServiceContract|ServiceProvider/,
    },
  },
})
