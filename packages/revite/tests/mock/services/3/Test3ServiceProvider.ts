import { RegisterContext, ServiceProvider } from 'revite'
import { Test3ServiceContract } from '.'

export class Test3ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config = ctx.config('test3') as any

    ctx.bind(Test3ServiceContract).to({
      singleton: true,
      service: config.service,
    })
  }
}
