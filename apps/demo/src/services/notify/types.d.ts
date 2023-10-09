declare namespace Service {
  namespace Notify {
    type Contract = import('./NotifyServiceContract').NotifyServiceContract
    type Type = 'success' | 'info' | 'warning' | 'error'

    interface Config {
      service: Revite.ImportConstructor<Contract>
    }

    interface Item {
      id: string
      title?: string
      text?: string
      type: Type
    }

    interface DisplayOptions {
      text?: string
      title?: string
      type?: Type
      duration?: number | boolean
    }
  }
}
