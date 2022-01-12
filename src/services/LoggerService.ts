import { LoggerServiceContract, LogLevel } from '../contracts/LoggerServiceContract'

export class LoggerService extends LoggerServiceContract {
  private colors = {
    debug: '#666666',
    info: '#5c6bc0',
    warn: '#ff8f00',
    error: '#d32f2f',
    success: '#43a047',
    brown: '#8d6e63',
    teal: '#00897b',
    gray: '#616161',
    purple: '#8e24aa',
    black: '#000',
    cyan: '#00acc1',
  }

  error(error: Error | string) {
    console.error(error)
  }

  log(options) {
    if (!this.checkLevel(options.level)) return

    const args: any[] = []

    if (options.message) {
      args.push(options.message)
    }

    const logArguments = this.makeStyles({
      args,
      level: options.level || 'info',
      color: options.color,
      context: options.context,
    })

    console.log(...logArguments, ...(options.args || []))
  }

  dir(object: Record<string, any>) {
    console.dirxml(object)
  }

  group(options) {
    if (options.level && !this.checkLevel(options.level)) return

    const logArguments = this.makeStyles({
      level: options.level || 'info',
      args: [options.label],
      context: options.context,
    })

    if (options.collapsed) {
      console.groupCollapsed(...logArguments)
    } else {
      console.group(...logArguments)
    }

    options.entry()
    console.groupEnd()
  }

  private checkLevel(level: string) {
    const levels = ['debug', 'info', 'warn', 'error']
    const requestedIdx = levels.indexOf(level)
    const currentIdx = levels.indexOf(this.level)

    return requestedIdx >= currentIdx
  }

  private makeStyles(options: {
    args: any[]
    level: LogLevel
    color?: string
    context?: string
  }): string[] {
    let logArguments: string[] = []
    const context = options.context
    const message = options.args[0] || ''

    let styles = 'font-weight:normal;'
    const color = this.colors[options.color || options.level]

    if (context) {
      styles += `padding:1px 4px;color:white;border-radius:3px;font-size:10px;background-color:${color}`
    } else {
      styles += `color:${color}`
    }

    if (context) {
      logArguments = [
        `%c${context}`,
        styles,
        message,
      ]
    } else {
      logArguments = [
        `%c${message}`,
        styles,
      ]
    }

    return logArguments
  }
}
