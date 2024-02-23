import { RegisterContext, ServiceProvider } from 'revite'
import { Test1ServiceContract } from '../1'
import { Test4State } from './Test4State'

export class Test4ServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(Test4State).to({
      reactive: true,
      async factory({ Service }) {
        const test1Service = await ctx.resolve(Test1ServiceContract)

        return () => new Service({
          test1Service,
        })
      },
    })
  }
}
