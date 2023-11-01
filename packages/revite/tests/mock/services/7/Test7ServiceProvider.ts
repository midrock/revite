import { BeforeBootContext, RegisterContext, ServiceProvider } from 'revite'
import { Test7ServiceContract } from '.'

export class Test7ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(Test7ServiceContract).to({
      config: 'test7',
      singleton: true,
    })
  }

  async beforeBoot(ctx: BeforeBootContext) {
    const service = await ctx.resolve(Test7ServiceContract)

    service.addItem('preload 1')
  }
}
