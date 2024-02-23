export const config = { 
  'tests/mock/main.ts': {
    default: {
      logger: {
        level: 'debug',
      },
      reactivity: {
        service: () => import('./services/reactivity/VueReactivityService'),
      },
      providers: [
        import('./services/testService/TestServiceProvider'),
      ],
      config: {
        test: {
          service: () => import('./services/testService/versions/TestService'),
        } as Core.Test.Config,
      },
    },
  },
  __name: 'vue',
}