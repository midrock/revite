import { defineConfig } from 'revite'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  providers: [
    import('../../services/1/Test1ServiceProvider'),
  ],
  config: {
    test1: {
      service: () => import('../../services/1/Test1Service'),
    } as any,
  },
})
