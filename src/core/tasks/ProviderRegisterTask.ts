import { Task } from '../Task'

export class ProviderRegisterTask extends Task {
  async run(manifest: Revite.Provider.Manifest) {
    const { provider } = manifest

    provider.tasks.register = this

    this.beginReport({
      label: `Register ${provider.label}`,
    })

    if (provider.register instanceof Function) {
      return provider.register({
        config: await this.getConfig(manifest),
        singleton: (config) => {
          return revite.container.singleton(config)
        },
        bind: (config) => {
          return revite.container.bind(config)
        },
        resolve<T>(contract: Revite.AbstractConstructor<T>) {
          return revite.container.resolveRegistered<T>(contract)
        },
        resolveIfExist<T>(contract: Revite.AbstractConstructor<T>) {
          return revite.container.resolveRegisteredIfExist<T>(contract)
        },
        resolveLoaded<T>(contract: Revite.AbstractConstructor<T>) {
          return revite.container.resolveLoaded<T>(contract)
        },
        resolveLoadedIfExist<T>(contract: Revite.AbstractConstructor<T>) {
          return revite.container.resolveLoadedIfExist<T>(contract)
        },
      })
    }
  }
}
