interface ReportOptions {
  label: string
  color?: string
}

export abstract class Task {
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
   *
   */
  abstract run(context: Revite.Controller, ...args: any[]): Promise<any>

  async execute(context: Revite.Controller, ...args: any[]) {
    const startTime = performance.now()

    try {
      this.promise = this.run(context, ...args)

      await this.promise
    } catch (error) {
      if (error instanceof Error) {
        this.error = error
      } else {
        console.error('implement', error)
      }
    } finally {
      this.executeTime = performance.now() - startTime
      this.isCompleted = true
      this.endReport(context)
    }

    return this.promise
  }

  endReport(context: Revite.Controller, options?: ReportOptions) {
    const { error } = this

    // if (error) {
    //   revite.log({
    //     label: `Failed in ${this.formatTime(this.executeTime)}`,
    //     level: 'error',
    //     context: this.log.label,
    //     entry: () => {
    //       revite.error(error)
    //     },
    //   })
    // } else {
    //   revite.log({
    //     level: 'info',
    //     color: this.log.color,
    //     context: this.log.label,
    //     message: `Completed in ${this.formatTime(this.executeTime)}`,
    //   })
    // }
  }

  private formatTime(time: number) {
    if (time >= 1000) {
      return `${(time / 1000).toFixed(2)}s`
    }

    return `${time.toFixed(2)}ms`
  }
}
