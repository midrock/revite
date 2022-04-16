import { defineConfig } from 'revite'
import { VueReactivityService } from '/~/../../src/services/VueReactivityService'

export default defineConfig({
  logger: {
    level: 'debug',
  },
  reactivity: {
    service: VueReactivityService,
  },
  packages: [
    import('/~/packages/ViewsPackage'),
  ],
  providers: [
    import('/~/providers/EventServiceProvider'),
    import('/~/services/render/RenderServiceProvider'),
    import('/~/services/router/RouterServiceProvider'),
    import('/~/services/auth/AuthServiceProvider'),
    import('/~/services/dashboard/DashboardServiceProvider'),
    import('/~/services/ui/UiServiceProvider'),
    import('/~/services/notes/NotesServiceProvider'),
    import('/~/services/notify/NotifyServiceProvider'),
  ],
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
