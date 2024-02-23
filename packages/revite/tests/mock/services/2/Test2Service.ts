import { Test2ServiceContract } from '.'

export class Test2Service extends Test2ServiceContract {
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
