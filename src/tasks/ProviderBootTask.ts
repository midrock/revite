import { Task } from '../core/Task'
import { ServiceProvider } from '../core/ServiceProvider'
import { services } from '../state'

export class ProviderBootTask extends Task {
  async run(provider: ServiceProvider) {
    this.label = `Boot ${provider.constructor.name}`
    provider.setBootTask(this)

    if (!provider.isRegistered) {
      this.error = new Error('Not registered')
      return
    }

    if (provider.boot instanceof Function) {
      return provider.boot({
        resolve: services.resolve.bind(services),
        resolveIfExist: services.resolveIfExist.bind(services),
      })
    }
  }
}
