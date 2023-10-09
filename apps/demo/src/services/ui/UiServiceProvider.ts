import { RegisterContext, ServiceProvider } from 'revite'
import { RouterServiceContract } from '/~/services/router'
import { UiService } from './UiService'

export class UiServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(UiService).to({
      singleton: true,
      reactive: true,
      async factory({ Service }) {
        const routerService = await ctx.resolve(RouterServiceContract)

        return () => new Service({
          routerService,
        })
      },
    })
  }
}
