import { AbstractConstructor, Constructor } from '../types'
import { ServiceProvider } from '../core/ServiceProvider'
import { ProviderRegisterTask } from '../tasks/ProviderRegisterTask'
import { ProviderBootTask } from '../tasks/ProviderBootTask'

export class ProvidersRegistry {
  registry = new Map<string, ServiceProvider>()
  contracts = new WeakMap<AbstractConstructor, ServiceProvider>()

  create(Provider: Constructor<ServiceProvider>) {
    this.registry.set(Provider.name, new Provider())
  }

  registerContract(contract: AbstractConstructor, provider: ServiceProvider) {
    this.contracts.set(contract, provider)
  }

  getAll() {
    const providers: (ServiceProvider)[] = []

    for (const provider of this.registry.values()) {
      providers.push(provider)
    }

    return providers
  }

  getProviderByContract(contract: AbstractConstructor) {
    return this.contracts.get(contract)
  }

  async register(provider: ServiceProvider) {
    if (provider.isRegistered) return

    const task = provider.getRegisterTask()

    if (task) {
      return task.promise
    }

    if (provider.mayRegister) {
      return new ProviderRegisterTask().execute(provider)
    }
  }

  async boot(provider: ServiceProvider) {
    if (provider.isLoaded) return

    const task = provider.getBootTask()

    if (task) {
      return task.promise
    }

    if (provider.mayBoot) {
      return new ProviderBootTask().execute(provider)
    }
  }

  async ensureLoaded(contract: AbstractConstructor): Promise<void> {
    const provider = this.getProviderByContract(contract)

    if (provider) {
      await this.boot(provider)

      if (provider.isFailed) {
        throw new Error(`${provider.label} is failed`)
      }
    }
  }
}
