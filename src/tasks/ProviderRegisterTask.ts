import { Task } from '../core/Task'
import { config, ioc } from '../state'
import { ServiceProvider } from '../core/ServiceProvider'

export class ProviderRegisterTask extends Task {
  async run(provider: ServiceProvider) {
    this.label = `Reg ${provider.constructor.name}`
    provider.setRegisterTask(this)

    if (provider.register instanceof Function) {
      return provider.register({
        config(name: string) {
          return config.get(name)
        },
        bind(contract) {
          return ioc.bind(contract)
        },
        resolve(contract, options?) {
          return ioc.resolve(contract, options)
        },
        resolveIfExist(contract, options?) {
          return ioc.resolveIfExist(contract, options)
        },
      })
    }
  }
}
