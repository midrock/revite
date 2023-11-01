import { defineConfig } from 'revite'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    service: () => import('../../services/reactivity/VueReactivityService'),
  },
  preload: [
    import('../../providers/EventServiceProvider'),
  ],
  providers: [
    import('../../services/6/Test6ServiceProvider'),
  ],
  config: {
    test6: {
      service: () => import('../../services/6/Test6Service'),
    } as any,
  },
})
