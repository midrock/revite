import path from 'path'
import revite from '../src/plugin'
import vue from '@vitejs/plugin-vue'
import { Mode, plugin as markdown } from 'vite-plugin-markdown'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo',
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'src'),
      revite: path.resolve(__dirname, '../src'),
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
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: /ServiceContract|ServiceProvider/,
      keep_fnames: /ServiceContract|ServiceProvider/,
    },
  },
})
