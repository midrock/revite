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
  ],
})
