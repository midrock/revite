import { LogGroupOptions, LogLevel, LogOptions } from '../types'

export abstract class LoggerServiceContract {
  constructor(public options: {
    level: LogLevel
  }) {
  }

  protected get level() {
    return this.options.level
  }

  abstract log(options: LogOptions): void

  abstract dir(object: Record<string, any>): void

  abstract group(options: LogGroupOptions): void

  abstract error(error: Error | string): void
}
