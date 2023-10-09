import { RegisterContext, ServiceProvider } from 'revite'
import { UiService } from './UiService'
import { RouterServiceContract } from '/~/services/router'

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
