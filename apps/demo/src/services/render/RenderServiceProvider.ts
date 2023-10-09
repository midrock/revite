import { BootContext, RegisterContext, ServiceProvider } from 'revite'
import { RenderServiceContract } from '/~/services/render/index'
import { RouterServiceContract } from '/~/services/router'

export class RenderServiceProvider extends ServiceProvider {
  async register(ctx: RegisterContext) {
    const config = ctx.config('render') as Service.Render.Config

    ctx.bind(RenderServiceContract).to({
      service: config.service,
      singleton: true,
    })
  }

  async boot(ctx: BootContext) {
    const renderService = await ctx.resolve(RenderServiceContract)
    const routerService = await ctx.resolve(RouterServiceContract)

    return renderService.renderApplication({
      router: routerService?.getRouter(),
    })
  }
}
