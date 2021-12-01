export abstract class LoggerServiceContract {
  constructor(public options: Revite.Logger.ConstructorOptions) {
    console.log('create', this)
  }

  protected get level() {
    return this.options.level
  }

  abstract log(options: Revite.Logger.LogOptions): void
}
