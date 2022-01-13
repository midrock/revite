import { logger } from '../utils/log'

export abstract class Listener {
  abstract handle(...args: any[]): void | Promise<void>

  execute = (...args: any[]) => {
    this.handle(...args)
    logger().log({
      args: [...args],
      level: 'debug',
      context: this.constructor.name,
      message: 'Executed by',
    })
  }
}
