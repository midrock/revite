export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export abstract class LoggerServiceContract {
  constructor(public options: {
    level: LogLevel
  }) {
  }

  protected get level() {
    return this.options.level
  }

  abstract log(options: {
    level?: LogLevel
    message?: string
    context?: string
    color?: string
    args?: any[]
  }): void

  abstract dir(object: Record<string, any>): void

  abstract group(options: {
    message: string
    entry: () => void
    level?: LogLevel
    context?: string
    collapsed?: boolean
  })

  abstract error(error: Error | string): void
}
