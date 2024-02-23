import { defineConfig } from 'revite'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    service: () => import('../../services/reactivity/VueReactivityService'),
  },
  packages: [
    import('../../sequence/package/TestPackage'),
  ],
  preload: [
    import('../../providers/BootstrapProvider'),
    import('../../services/7/Test7ServiceProvider'),
    import('../../sequence/preload/Test2ServiceProvider'),
  ],
  providers: [
    import('../../sequence/providers/Test1ServiceProvider'),
    import('../../sequence/providers/Test2ServiceProvider'),
  ],
  next: {
    unauthorized: () => ({
      packages: [
        import('../../sequence/next/unauthorized/packages/TestPackage'),
      ],
      preload: [
        import('../../sequence/next/unauthorized/preload/Test1ServiceProvider'),
        import('../../sequence/next/unauthorized/preload/Test2ServiceProvider'),
      ],
      providers: [
        import('../../sequence/next/unauthorized/providers/Test1ServiceProvider'),
        import('../../sequence/next/unauthorized/providers/Test2ServiceProvider'),
      ],
    }),
    authorized: () => ({
      packages: [
        import('../../sequence/next/authorized/packages/TestPackage'),
      ],
      preload: [
        import('../../sequence/next/authorized/preload/Test1ServiceProvider'),
        import('../../sequence/next/authorized/preload/Test2ServiceProvider'),
      ],
      providers: [
        import('../../sequence/next/authorized/providers/Test1ServiceProvider'),
        import('../../sequence/next/authorized/providers/Test2ServiceProvider'),
      ],
    }),
  },
  config: {
    test7: {
      service: () => import('../../services/7/Test7Service'),
    } as any,
  },
})
