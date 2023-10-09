import { builtinModules } from 'node:module'
import path from 'path'
import { defineConfig } from 'vite'
import raw from 'vite-raw-plugin'

export default defineConfig({
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'src'),
    },
  },
  publicDir: './public',
  build: {
    minify: 'terser',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      external: builtinModules,
    },
  },
  plugins: [
    raw({
      fileRegex: /\.txt$/,
    }),
  ],
})
