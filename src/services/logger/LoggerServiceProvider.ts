import { ServiceProvider } from '/~/core/revite'
import { LoggerServiceContract } from './LoggerServiceContract'

export class LoggerServiceProvider extends ServiceProvider {
  config = 'logger'

  async beforeRegister(ctx) {
    ctx.bind({
      bind: LoggerServiceContract,
      to: ctx.config.service,
      singleton: true,
      withParams: () => ({
        level: ctx.config.level,
      }),

      factory() {
        return new ctx.config.service({ level: 'sdsd'})
      }
    })
  }
}
