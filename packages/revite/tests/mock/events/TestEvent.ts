import { Event } from 'revite'

export class TestEvent extends Event {
  constructor(public value: any) {
    super()
  }
}
