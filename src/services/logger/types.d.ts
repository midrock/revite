declare namespace Revite {

  namespace Logger {
    type Contract = import('./LoggerServiceContract').LoggerServiceContract
    type Constructor = Revite.Constructor<Contract, ConstructorOptions>

    type Level = 'debug' | 'info' | 'warn' | 'error'

    interface Config {
      service?: Constructor
      level?: Level
    }

    interface ConstructorOptions {
      level: Level
    }

    interface GroupOptions {
      label: string
      entry: () => void
      level?: Level
      context?: string
      collapsed?: boolean
    }

    interface LogOptions {
      level?: Level
      message?: string
      context?: string
      color?: string
      args?: any[]
    }
  }
}
