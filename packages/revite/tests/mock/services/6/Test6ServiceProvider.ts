import { RegisterContext, ServiceProvider } from 'revite'
import { Test6ServiceContract } from '.'

export class Test6ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config = ctx.config('test6') as any

    ctx.bind(Test6ServiceContract).to({
      service: config.service,
      reactive: true,
    })
  }
}
