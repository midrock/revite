import { RegisterContext, ServiceProvider } from 'revite'
import { RouterServiceContract } from '/~/services/router/index'
import { UiService } from '/~/services/ui'
import { DashboardService } from '/~/services/dashboard'

export class TermsViewProvider extends ServiceProvider {
  async beforeBoot(ctx: RegisterContext) {
    const uiService = await ctx.resolve(UiService)
    const routerService = await ctx.resolve(RouterServiceContract)
    const dashboardService = await ctx.resolve(DashboardService)

    uiService.addMenuItem('main', {
      title: 'Terms',
      icon: 'document',
      order: 20,
      route: {
        name: 'terms',
      },
    })

    routerService.addRoute({
      path: '/terms',
      name: 'terms',
      component: () => import('./terms.vue'),
    })

    dashboardService.registerLink({
      route: {
        name: 'terms',
      },
      title: 'Terms',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
      icon: {
        name: 'home',
        class: 'text-red-500 bg-red-50',
      },
      order: 10,
    })
  }
}
