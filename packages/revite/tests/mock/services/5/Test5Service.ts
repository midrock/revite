import { Test5ServiceContract } from '.'

export class Test5Service extends Test5ServiceContract {
  private value: string
  registerText(name, value): void {
    if(name == 'test') {
      this.value = value
    }
  }

  getText(): string {
    return this.value
  }
}
