export abstract class Test3ServiceContract {
  abstract addItem(item: string): void

  abstract getItems(): string[]

  abstract clear(): void
}
