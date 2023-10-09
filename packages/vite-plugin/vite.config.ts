import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/plugin.ts'),
      formats: ['cjs'],
      fileName() {
        return 'plugin.js'
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
})
