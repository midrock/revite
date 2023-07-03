import path from 'path'
import { defineConfig } from 'vite'
import raw from 'vite-raw-plugin'

export default defineConfig({
  root: 'cli',
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
      external: [
        'fs',
        'path',
        'util',
        'assert',
        'stream',
        'constants',
      ],
    },
  },
  plugins: [
    raw({
      fileRegex: /\.txt$/,
    }),
  ],
})
