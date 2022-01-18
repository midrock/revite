import { Task } from '../core/Task'
import { config, ioc } from '../state'
import { ServiceProvider } from '../core/ServiceProvider'

export class ProviderBeforeBootTask extends Task {
  async run(provider: ServiceProvider) {
    this.label = `Pre ${provider.constructor.name}`

    if (provider.beforeBoot instanceof Function) {
      return provider.beforeBoot({
        config(name: string) {
          return config.get(name)
        },
        resolve: ioc.resolve.bind(ioc),
        resolveIfExist: ioc.resolveIfExist.bind(ioc),
      })
    }
  }
}
