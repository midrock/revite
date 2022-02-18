import { Task } from '../core/Task'
import { config, events, providers, services } from '../state'
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
          return services.bind(contract)
        },
        resolve: services.resolve.bind(services),
        resolveIfExist: services.resolveIfExist.bind(services),
        on: events.on.bind(events),
      })
    }
  }
}
