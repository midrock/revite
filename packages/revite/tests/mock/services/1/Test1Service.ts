import { Test1ServiceContract } from '.'

export class Test1Service extends Test1ServiceContract {
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
