import { Task } from '../core/Task'
import { config, ioc } from '../state'
import { BindOptions, ResolveOptions } from '../types'

export class ProviderRegisterTask extends Task {
  async run(provider: Revite.ServiceProvider) {
    provider.setRegisterTask(this)

    if (provider.register instanceof Function) {
      return provider.register({
        config(name: string) {
          return config.get(name)
        },
        bind(config: BindOptions) {
          return ioc.bind(config)
        },
        resolve<T>(contract: Revite.AbstractConstructor<T>, options?: ResolveOptions) {
          return ioc.resolve<T>(contract, options)
        },
        resolveIfExist<T>(contract: Revite.AbstractConstructor<T>, options?: ResolveOptions) {
          return ioc.resolveIfExist<T>(contract, options)
        },
      })
    }
  }
}
