import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName(format) {
        return `revite.${format}.js`
      },
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
})
