export abstract class Test7ServiceContract {
  abstract addItem(item: string): void

  abstract getItems(): string[]

  abstract clear(): void
}
