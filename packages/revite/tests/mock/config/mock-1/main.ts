import { defineConfig } from 'revite'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    service: () => import('../../services/reactivity/VueReactivityService'),
  },
  providers: [
    import('../../services/1/Test1ServiceProvider'),
    import('../../services/2/Test2ServiceProvider'),
    import('../../services/3/Test3ServiceProvider'),
    import('../../services/4/Test4ServiceProvider'),
  ],
  config: {
    test1: {
      service: () => import('../../services/1/Test1Service'),
    } as any,
    test2: {
      service: () => import('../../services/2/Test2Service'),
    } as any,
    test3: {
      service: () => import('../../services/3/Test3Service'),
    } as any,
  },
})
