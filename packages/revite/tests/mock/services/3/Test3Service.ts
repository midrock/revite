import { Test3ServiceContract } from '.'

export class Test3Service extends Test3ServiceContract {
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
