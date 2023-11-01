export abstract class Test6ServiceContract {
  abstract addItem(item: string): void

  abstract clickEvent(event: string): void

  abstract getItems(): string[]

  abstract clear(): void
}
