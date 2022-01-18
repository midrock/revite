import { Task } from '../core/Task'
import { config, events, ioc, providers } from '../state'
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
          providers.linkContractToProvider(contract, provider)
          return ioc.bind(contract)
        },
        resolve: ioc.resolve.bind(ioc),
        resolveIfExist: ioc.resolveIfExist.bind(ioc),
        on: events.on.bind(events),
      })
    }
  }
}
