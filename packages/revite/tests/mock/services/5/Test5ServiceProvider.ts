import { RegisterContext, ServiceProvider } from 'revite'
import { Test5ServiceContract } from '.'

export class Test5ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(Test5ServiceContract).to({
      config: 'test5',
    })
  }
}
