import { logger } from '../utils/log'

export abstract class Task {
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
  protected logger = logger
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

    try {
      this.beginReport()
      this.promise = this.run(...args)

      await this.promise
    } catch (error) {
      this.error = error as Error
    } finally {
      this.executeTime = performance.now() - startTime
      this.isCompleted = true
      this.endReport()
    }

    return this.promise
  }

  beginReport() {
    if (!this.label) return

    this.logger().log({
      level: 'debug',
      context: this.label,
      message: 'Executing...',
    })
  }

  endReport() {
    const { error } = this

    if (error) {
      this.logger().group({
        message: `Failed in ${this.formatTime(this.executeTime)}`,
        level: 'error',
        context: this.label || this.constructor.name,
        entry: () => {
          this.logger().error(error)
        },
      })
    } else if (this.label) {
      this.logger().log({
        level: 'debug',
        context: this.label,
        message: `Completed in ${this.formatTime(this.executeTime)}`,
      })
    }
  }

  private formatTime(time: number) {
    if (time >= 1000) {
      return `${(time / 1000).toFixed(2)}s`
    }

    return `${time.toFixed(2)}ms`
  }
}
