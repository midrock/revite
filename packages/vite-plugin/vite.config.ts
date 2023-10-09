import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/plugin.ts'),
      formats: ['cjs'],
    },
  },
})
