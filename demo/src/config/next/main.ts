import { defineConfig } from 'revite'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    service: () => import('/~/services/reactivity/VueReactivityService'),
  },
  preload: [
    import('/~/services/auth/AuthServiceProvider'),
    import('/~/providers/BootstrapProvider'),
  ],
  providers: [
    import('/~/services/ui/UiServiceProvider'),
    import('/~/services/notify/NotifyServiceProvider'),
  ],
  next: {
    authorized: () => ({
      preload: [
        import('/~/services/router/RouterServiceProvider'),
        import('/~/services/render/RenderServiceProvider'),
      ],
      packages: [
        import('/~/packages/ViewsPackage'),
      ],
      providers: [
        import('/~/services/dashboard/DashboardServiceProvider'),
        import('/~/providers/EventServiceProvider'),
        import('/~/services/notes/NotesServiceProvider'),
      ],
    }),
    unauthorized: () => ({
      preload: [
        import('/~/services/router/RouterServiceProvider'),
        import('/~/services/render/RenderServiceProvider'),
      ],
      providers: [
        import('/~/services/dashboard/DashboardServiceProvider'),
        import('/~/views/home/VueHomeViewProvider'),
        import('/~/views/report/VueReportViewProvider'),
      ],
    }),
  },
  config: {
    router: {
      service: () => import('/~/services/router/versions/VueRouterService'),
    } as Service.Router.Config,
    render: {
      service: () => import('/~/services/render/versions/vue/VueRenderService'),
    } as Service.Render.Config,
    notes: {
      service: () => import('/~/services/notes/versions/MockNotesService'),
    } as Service.Notes.Config,
    auth: {
      service: () => import('/~/services/auth/versions/MockLoggedAuthService'),
    } as Service.Auth.Config,
  },
})
