import { Task } from '../core/Task'
import { ServiceProvider } from '../core/ServiceProvider'
import { ioc } from '../state'

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
        resolve: ioc.resolve.bind(ioc),
        resolveIfExist: ioc.resolveIfExist.bind(ioc),
      })
    }
  }
}
