export abstract class Test1ServiceContract {
  abstract addItem(item: string): void

  abstract getItems(): string[]

  abstract clear(): void
}
