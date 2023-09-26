import { AbstractConstructor, Constructor } from '../types'
import { ServiceProvider } from '..'
import { ProviderRegisterTask } from '../tasks/ProviderRegisterTask'
import { ProviderBootTask } from '../tasks/ProviderBootTask'
import { ProviderBeforeBootTask } from '../tasks/ProviderBeforeBootTask'

export class ProvidersRegistry {
  private registry = new Map<string, ServiceProvider | true>()
  private contracts = new Map<string, string>()

  create(Provider: Constructor<ServiceProvider>) {
    const provider = new Provider()

    this.registry.set(Provider.name, provider)
    return provider
  }

  getRegistry() {
    return this.registry
  }

  linkContractToProvider(contract: AbstractConstructor, provider: ServiceProvider) {
    this.contracts.set(contract.name, provider.constructor.name)
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

  async beforeBoot(provider: ServiceProvider) {
    if (provider.mayBeforeBoot) {
      return new ProviderBeforeBootTask().execute(provider)
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
    const providerName = this.contracts.get(contract.name) || ''
    const provider = this.registry.get(providerName)

    if (!provider || provider === true) return

    const bootTask = provider.getBootTask()

    if (bootTask) {
      await bootTask.promise
    } else if (!provider.isFailed) {
      await this.boot(provider)
    }
  }

  completeProvider(provider: ServiceProvider) {
    if (!provider.isFailed) {
      this.registry.set(provider.constructor.name, true)
    }

    provider.dispose()
  }
}
