import path from 'path'
import revite from '../plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '/~': path.resolve(__dirname),
      revite: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    revite({
      root: '/demo/config',
      use: {
        glob: true,
      },
    }),
  ],
})
