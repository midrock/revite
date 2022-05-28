export abstract class Listener {
  static isBuiltIn = true

  abstract handle(...args: any[]): void | Promise<void>

  handleError?(error?: any): void | Promise<void>
}
