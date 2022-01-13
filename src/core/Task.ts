import { LogGroupOptions, LogLevel, LogOptions } from '../types'
import { logger } from '../utils/log'

export abstract class Task {
  color = ''
  level: LogLevel = 'debug'
  timeout = 3000
  /**
   * Label for the current task. For example, to use with logger.
   */
  label = ''

  /**
   *
   */
  error?: Error

  /**
   *
   */
  isCompleted = false
  promise?: Promise<any>
  private executeTime = 0

  get isFailed() {
    return !!this.error
  }

  /**
   * Method to define the runner in an extended class
   */
  abstract run(...args: any[]): Promise<any>

  /**
   * WWrapper to run the task with additional info
   */
  async execute(...args: any[]) {
    const startTime = performance.now()

    let timer

    if (this.timeout > 0) {
      timer = setInterval(() => {
        this.log({
          level: 'warn',
          context: this.label,
          message: 'Waiting',
        })
      }, this.timeout)
    }

    try {
      this.promise = this.run(...args)

      await this.promise
    } catch (error) {
      this.error = error as Error
    } finally {
      this.executeTime = performance.now() - startTime
      this.isCompleted = true
      this.endReport()

      clearTimeout(timer)
    }

    return this.promise
  }

  endReport() {
    const { error } = this

    if (error) {
      this.group({
        message: `Failed in ${this.formatTime(this.executeTime)}`,
        level: 'error',
        context: this.label || this.constructor.name,
        entry: () => {
          logger().error(error)
        },
      })
    } else if (this.label) {
      this.log({
        level: this.level,
        color: this.color,
        context: this.label,
        message: `Completed in ${this.formatTime(this.executeTime)}`,
      })
    }
  }

  protected log(options: LogOptions) {
    logger().log(options)
  }

  protected group(options: LogGroupOptions) {
    logger().group(options)
  }

  private formatTime(time: number) {
    if (time >= 1000) {
      return `${(time / 1000).toFixed(2)}s`
    }

    return `${time.toFixed(2)}ms`
  }
}
