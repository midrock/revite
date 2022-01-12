import { ProviderRegisterTask } from '../tasks/ProviderRegisterTask'
import { ProviderBootTask } from '../tasks/ProviderBootTask'

export class ProvidersRegistry {
  registry = new Map<string, Revite.ServiceProvider>()
  contracts = new WeakMap<Revite.AbstractConstructor, Revite.ServiceProvider>()

  create(Constructor: Revite.Provider.Constructor) {
    this.registry.set(Constructor.name, new Constructor())
  }

  registerContract(contract: Revite.AbstractConstructor, provider: Revite.ServiceProvider) {
    this.contracts.set(contract, provider)
  }

  getAll() {
    const providers: Revite.ServiceProvider[] = []

    for (const provider of this.registry.values()) {
      providers.push(provider)
    }

    return providers
  }

  getProviderByContract(contract: Revite.AbstractConstructor) {
    return this.contracts.get(contract)
  }

  async register(provider: Revite.ServiceProvider) {
    if (provider.isRegistered) return

    const task = provider.getRegisterTask()

    if (task) {
      return task.promise
    }

    if (provider.mayRegister) {
      return new ProviderRegisterTask().execute(provider)
    }
  }

  async boot(provider: Revite.ServiceProvider) {
    if (provider.isLoaded) return

    const task = provider.getBootTask()

    if (task) {
      return task.promise
    }

    if (provider.mayBoot) {
      return new ProviderBootTask().execute(provider)
    }
  }

  async ensureLoaded<T>(contract: Revite.AbstractConstructor<T>): Promise<void> {
    const provider = this.getProviderByContract(contract)

    if (provider) {
      await this.boot(provider)

      if (provider.isFailed) {
        throw new Error(`${provider.label} is failed`)
      }
    }
  }
}
