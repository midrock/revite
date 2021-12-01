import { ProviderRegisterTask } from './tasks/ProviderRegisterTask'
import { ProviderBootTask } from './tasks/ProviderBootTask'

export class ProvidersRegistry {
  registry = new Map<string, Revite.ServiceProvider>()
  contracts = new WeakMap<Revite.AbstractConstructor, string>()

  constructor(private context: Revite.Controller) {
  }

  hasProviderForContract(contract: Revite.AbstractConstructor) {
    return this.contracts.has(contract)
  }

  getManifestByContract(contract: Revite.AbstractConstructor) {
    const manifest = this.registry[contract.name]

    if (!manifest) {
      throw new Error(`Provider for ${contract.name} did not register`)
    }

    return manifest
  }

  linkContractToProvider(contract: Revite.AbstractConstructor, provider: Revite.ServiceProvider) {
    if (this.contracts.has(contract)) {
      throw new Error(`Contract ${contract.name} already registered`)
    }

    this.contracts.set(contract, provider.constructor.name)
  }

  getProviderByContract(contract: Revite.AbstractConstructor) {
    const manifest = this.getManifestByContract(contract)

    return manifest.provider
  }

  create(Constructor: Revite.Provider.Constructor) {
    this.registry.set(Constructor.name, new Constructor())
  }

  async register(manifest: Revite.Provider.Manifest) {
    const { provider } = manifest

    if (provider.tasks.register) {
      return provider.tasks.register.promise
    }

    if (provider.mayRegister) {
      return new ProviderRegisterTask().execute(manifest)
    }
  }

  async boot(manifest: Revite.Provider.Manifest) {
    const { provider } = manifest

    if (provider.tasks.boot) {
      return provider.tasks.boot.promise
    }

    if (provider.mayBoot) {
      return new ProviderBootTask().execute(manifest)
    }
  }

  async ensureRegistered<T>(contract: Revite.AbstractConstructor<T>): Promise<void> {
    const manifest = this.getManifestByContract(contract)

    if (manifest.provider.isFailed) {
      throw new Error(`${manifest.provider.label} is failed`)
    }

    return this.register(manifest)
  }

  async ensureLoaded<T>(contract: Revite.AbstractConstructor<T>): Promise<void> {
    const manifest = this.getManifestByContract(contract)

    await this.ensureRegistered(contract)
    await this.boot(manifest)

    if (manifest.provider.isFailed) {
      throw new Error(`${manifest.provider.label} is failed`)
    }
  }

  async resolveRegistered<T>(contract: Revite.AbstractConstructor<T>): Promise<T> {
    if (revite.providers.hasProvider(contract)) {
      await revite.providers.ensureRegistered(contract)
    }

    return this.resolveInstance(contract)
  }

  async resolveRegisteredIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined> {
    if (revite.providers.hasProvider(contract)) {
      await revite.providers.ensureRegistered(contract)
    }

    return revite.ioc.resolveInstanceIfExist(contract)
  }

  async resolveLoaded<T>(contract: Revite.AbstractConstructor<T>): Promise<T> {
    if (revite.providers.hasProvider(contract)) {
      await revite.providers.ensureLoaded(contract)
    }

    return this.resolveInstance(contract)
  }

  async resolveLoadedIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined> {
    if (revite.providers.hasProvider(contract)) {
      await revite.providers.ensureLoaded(contract)
    }

    return this.resolveInstanceIfExist(contract)
  }
}
