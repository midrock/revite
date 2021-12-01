import { Task } from '../Task'

export class ProviderBootTask extends Task<Revite.Provider.Manifest> {
  log = {
    color: 'success',
    label: 'Boot Provider',
  }

  async run(manifest: Revite.Provider.Manifest) {
    const { provider } = manifest

    provider.tasks.boot = this
    this.log.label = `Boot ${provider.label}`

    this.beginReport()

    if (!provider.isRegistered) {
      this.error = provider.tasks.register?.error || new Error('Not registered')
      return
    }

    if (provider.boot instanceof Function) {
      return provider.boot({
        resolve: async (contract) => {
          const targetProvider = revite.providers.getProviderByContract(contract)

          if (provider.constructor.name !== targetProvider.constructor.name) {
            await revite.providers.ensureLoaded(contract)
          }

          return revite.container.resolveInstance(contract)
        },
        resolveIfExist: async (contract) => {
          const targetProvider = revite.providers.getProviderByContract(contract)

          if (provider.constructor.name !== targetProvider.constructor.name) {
            await revite.providers.ensureLoaded(contract)
          }

          return revite.container.resolveInstanceIfExist(contract)
        },
      })
    }
  }
}
