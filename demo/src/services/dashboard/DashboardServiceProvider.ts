import { RegisterContext, ServiceProvider } from 'revite'
import { DashboardService } from '/~/services/dashboard'

export class DashboardServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(DashboardService).to({
      config: 'dashboard',
      reactive: true,
      singleton: true,
    })
  }
}
