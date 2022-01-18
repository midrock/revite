import { RegisterContext, ServiceProvider } from 'revite'
import { RouterServiceContract } from '/~/services/router'
import { UiService } from '/~/services/ui'
import { DashboardService } from '/~/services/dashboard'

export class VueReportViewProvider extends ServiceProvider {
  async beforeBoot(ctx: RegisterContext) {
    const uiService = await ctx.resolve(UiService)
    const routerService = await ctx.resolve(RouterServiceContract)
    const dashboardService = await ctx.resolve(DashboardService)

    uiService.addMenuItem('main', {
      title: 'Report',
      icon: 'chart',
      order: 30,
      route: {
        name: 'report',
      },
    })

    routerService.addRoute({
      path: '/report',
      name: 'report',
      component: () => import('./vue/report.vue'),
    })

    dashboardService.registerLink({
      route: {
        name: 'report',
      },
      title: 'Report',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
      icon: {
        name: 'chart',
        class: 'text-yellow-500 bg-yellow-50',
      },
      order: 30,
    })
  }
}
