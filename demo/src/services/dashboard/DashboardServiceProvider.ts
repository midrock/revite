import { RegisterContext, ServiceProvider } from 'revite'
import { DashboardService } from '/~/services/dashboard'

export class DashboardServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(DashboardService).to({
      reactive: true,
      singleton: true,
    })
  }
}
