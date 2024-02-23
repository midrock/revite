import { BootContext, BeforeBootContext, RegisterContext, ServiceProvider } from 'revite'
import { Test1ServiceContract } from '.'

export class Test1ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(Test1ServiceContract).to({
      config: 'test1',
      singleton: true,
      reactive: 'deep',
    })
  }

  async beforeBoot(ctx: BeforeBootContext) {
    const service = await ctx.resolve(Test1ServiceContract)

    service.addItem('beforeBoot')
  }

  async boot(ctx: BootContext) {
    const service = await ctx.resolve(Test1ServiceContract)

    return service.addItem('boot')
  }
}
