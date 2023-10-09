import { ServiceProvider } from '..'
import { Task } from '../core/Task'
import { config, services } from '../state'

export class ProviderBeforeBootTask extends Task {
  async run(provider: ServiceProvider) {
    this.label = `PRE ${provider.constructor.name}`

    if (provider.beforeBoot instanceof Function) {
      return provider.beforeBoot({
        config(name: string) {
          return config.get(name)
        },
        resolve: services.resolve.bind(services),
        resolveIfExist: services.resolveIfExist.bind(services),
      })
    }
  }
}
