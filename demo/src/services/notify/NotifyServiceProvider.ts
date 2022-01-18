import { RegisterContext, ServiceProvider } from 'revite'
import { NotifyServiceContract } from './NotifyServiceContract'

export class NotifyServiceProvider extends ServiceProvider {
  async register(ctx: RegisterContext) {
    ctx.bind(NotifyServiceContract).to({
      service: () => import('./versions/NotifyService'),
      singleton: true,
      reactive: true,
    })
  }
}
