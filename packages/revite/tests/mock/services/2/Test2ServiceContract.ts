export abstract class Test2ServiceContract {
  abstract addItem(item: string): void

  abstract getItems(): string[]

  abstract clear(): void
}
