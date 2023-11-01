import { Test7ServiceContract } from '.'

export class Test7Service extends Test7ServiceContract {
  private data: string[] = []

  addItem(item: string): void {
    console.log('TestService addItem item = ', item)
    this.data.push(item)
  }

  getItems(): string[] {
    return this.data
  }

  clear(): void {
    this.data = []
  }
}
