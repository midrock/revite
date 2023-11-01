import { RegisterContext, ServiceProvider } from 'revite'
import { TestEvent } from '../events/TestEvent'
import { TestListenersContract } from '../listeners/TestListenersContract'

export class EventServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    console.log('EventServiceProvider == ',ctx)
    ctx.on(TestEvent, [
      TestListenersContract,
      (value: TestEvent) => {
        console.log('sss ====', value)
      },
      () => import('../listeners/TestListenersContract'),
    ])
  }
}
