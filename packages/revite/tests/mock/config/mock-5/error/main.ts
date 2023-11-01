import { defineConfig } from 'revite'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    service: () => import('../../../services/reactivity/VueReactivityService'),
  },
  providers: [
    import('../../../services/5/Test5ServiceProvider'),
  ],
  config: {
    test5: {
      service: () => import('../../../services/5/Test5Service'),
      extend: [
        () => import('../../../extensions/2/Test2Extension'),
      ],
    } as any,
  },
})
