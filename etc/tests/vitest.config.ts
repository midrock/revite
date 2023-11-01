import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'test'),
      '/~mock': path.resolve(__dirname, '../../packages/tests/mock'),
    },
  },
  optimizeDeps: {
    exclude: [
      'revite',
    ],
  },
  test: {
    globals: true,
    reporters: ['html'],
    environment: 'happy-dom',
    dir: '../../packages',
    root: '../../packages',
    typecheck: {
      tsconfig: '../../packages/revite/tsconfig.json',
    },
    // // ui: true,
    passWithNoTests: true,
    coverage: {
      all: true,
      enabled: true,
      provider: 'v8',
      // include : [
      //   '**/*.{test,spec}.{js,mjs, ts}',
      // ],
    },
    
  },
})
