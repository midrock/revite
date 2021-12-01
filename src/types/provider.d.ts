declare namespace Revite {
  type ServiceProvider = import('../core/ServiceProvider').ServiceProvider

  interface RegContext<C = any> {
    config: C

    singleton(options: Revite.Container.BindOptions): void

    bind<T, O>(options: Revite.Container.BindOptions<T, O>): void

    resolve<T>(contract: Revite.AbstractConstructor<T>): Promise<T>

    resolveIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined>

    resolveLoaded<T>(contract: Revite.AbstractConstructor<T>): Promise<T>

    resolveLoadedIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined>
  }

  namespace Provider {
    type Constructor = Revite.Constructor<ServiceProvider>

    interface Manifest {
      group?: string
      config?: Revite.Import
      provider: Revite.ServiceProvider
    }

    interface BootContext {
      resolve<T>(contract: Revite.AbstractConstructor<T>): Promise<T>

      resolveIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined>
    }
  }
}
