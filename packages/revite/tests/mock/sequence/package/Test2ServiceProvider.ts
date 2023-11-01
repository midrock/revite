import { BeforeBootContext, ServiceProvider } from 'revite'
import { Test7ServiceContract } from '../../services/7/Test7ServiceContract'

export class Test2ServiceProvider extends ServiceProvider {
  async beforeBoot(ctx: BeforeBootContext) {
    const service = await ctx.resolve(Test7ServiceContract)

    service.addItem('package 2')
  }
}
