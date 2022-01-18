import { BeforeBootContext, RegisterContext, ServiceProvider } from 'revite'
import { RouterServiceContract } from '/~/services/router'
import { DashboardService } from '/~/services/dashboard'
import { UiService } from '/~/services/ui'
import { HomeState } from './HomeState'

export class VueHomeViewProvider extends ServiceProvider {
  async register(ctx: RegisterContext) {
    ctx.bind(HomeState).to({
      reactive: true,
      async factory({ Service }) {
        const dashboardService = await ctx.resolve(DashboardService)

        return () => new Service({
          dashboardService,
        })
      },
    })
  }

  async beforeBoot(ctx: BeforeBootContext) {
    const uiService = await ctx.resolve(UiService)
    const routerService = await ctx.resolve(RouterServiceContract)

    uiService.addMenuItem('main', {
      title: 'Home',
      icon: 'home',
      order: 10,
      route: {
        name: 'home',
      },
    })

    routerService.addRoute({
      path: '/',
      name: 'home',
      component: () => import('./versions/vue/home.vue'),
    })
  }
}
