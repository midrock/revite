import { TestEvent } from '../../events/TestEvent'
import { Test6ServiceContract } from '.'

export class Test6Service extends Test6ServiceContract {
  private data: string[] = []

  addItem(item: string): void {
    console.log('TestService addItem item = ', item)
    this.data.push(item)
  }

  clickEvent(value): void {
    console.log('clickEvent ', value)
    new TestEvent(value).dispatch()
  }

  getItems(): string[] {
    return this.data
  }

  clear(): void {
    this.data = []
  }
}
