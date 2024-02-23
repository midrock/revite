import { RegisterContext, ServiceProvider } from 'revite'
import { Test2ServiceContract } from '.'

export class Test2ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config = ctx.config('test2') as any

    ctx.bind(Test2ServiceContract).to({
      service: config.service,
      reactive: true,
    })
  }
}
