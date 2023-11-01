import { Listener, revite } from 'revite'
import { TestEvent } from '../events/TestEvent'
import { Test6ServiceContract } from '../services/6/Test6ServiceContract'

export class TestListenersContract extends Listener {
  async handle(event: TestEvent) {
    console.log('TestListenersContract', event)
    const service = await revite.resolve(Test6ServiceContract)

    console.log('TestListenersContract', event)
    service.addItem(event.value)
  }
}
