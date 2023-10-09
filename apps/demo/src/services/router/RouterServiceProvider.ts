import { BootContext, RegisterContext, ServiceProvider } from 'revite'
import { RouterServiceContract } from '/~/services/router/index'

export class RouterServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config = ctx.config('router') as Service.Router.Config

    ctx.bind(RouterServiceContract).to({
      service: config.service,
      singleton: true,
    })
  }

  async boot(ctx: BootContext) {
    const routerService = await ctx.resolve(RouterServiceContract)

    return routerService.createRouter()
  }
}
