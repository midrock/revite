import { resolveImport } from './core/utils'
import { ProvidersRegistry } from './core/ProvidersRegistry'
import { ConfigRegistry } from './core/ConfigRegistry'
import { IocContainer } from './core/IocContainer'
import { EventsRegistry } from './core/EventsRegistry'
import { BootstrapSessionTask } from './core/tasks/BootstrapSessionTask'
import { LoggerServiceContract } from './'

export class ReviteController {
  ioc: IocContainer
  events: EventsRegistry
  providers: ProvidersRegistry
  config: ConfigRegistry

  /**
   * Global interface to LoggerServiceContract
   */
  log = (() => {
    let logger: LoggerServiceContract | undefined

    return (options: Revite.Logger.LogOptions) => {
      if (!logger && this.providers.hasProviderForContract(LoggerServiceContract)) {
        logger = this.ioc.getIfExist(LoggerServiceContract)
      }

      return logger?.log(options)
    }
  })()

  constructor() {
    this.ioc = new IocContainer(this)
    this.events = new EventsRegistry(this)
    this.providers = new ProvidersRegistry(this)
    this.config = new ConfigRegistry(this)
  }

  async resolve<T>(contract: Revite.AbstractConstructor<T>): Promise<T> {
    return this.ioc.resolveLoaded(contract)
  }

  async resolveIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined> {
    return this.ioc.resolveLoadedIfExist(contract)
  }

  bind(config: Revite.Ioc.BindOptions) {
    return this.ioc.bind(config)
  }

  /**
   * Resolve import
   */
  import<T = any>(source: Revite.Import<T>) {
    return resolveImport(source)
  }

  /**
   * Bootstrap application
   */
  async bootstrap(config: Revite.Config.Sources) {
    this.config.apply(config)

    return new BootstrapSessionTask().execute(this)
  }
}
