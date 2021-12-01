export abstract class Listener {
  abstract handle(...args: any[]): void | Promise<void>

  execute = (...args: any[]) => {
    this.handle(...args)
    revite.logger.log({
      args: [...args],
      level: 'info',
      color: 'info',
      context: this.constructor.name,
      message: 'Executed by'
    })
  }
}
