import { config, events, services } from '../state'
import { BootstrapSessionTask } from '../tasks/BootstrapSessionTask'
import { resolveImport } from '../utils/import'
import type {
  AbstractConstructor,
  Config,
  DispatchedEvent,
  EventConstructor,
  EventHandler,
  EventHandlerOptions,
  BootstrapConfig,
} from '../types'

export class ReviteController {
  import = resolveImport

  on<T extends DispatchedEvent>(
    event: EventConstructor,
    listeners: EventHandler<T> | EventHandler<T>[],
    options?: EventHandlerOptions,
  ) {
    return events.on(event, listeners, options)
  }

  async resolve<T extends AbstractConstructor>(contract: T, options?): Promise<InstanceType<T>> {
    return services.resolve(contract, options)
  }

  async resolveIfExist<T extends AbstractConstructor>(contract: T, options?): Promise<InstanceType<T> | undefined> {
    return services.resolveIfExist(contract, options)
  }

  resolveSync<T extends AbstractConstructor>(contract: T): InstanceType<T> {
    const singleton = services.getSingleton(contract)

    if (!singleton) {
      throw new Error(`No service for ${contract.name}`)
    }

    return singleton
  }

  resolveSyncIfExist<T extends AbstractConstructor>(contract: T): InstanceType<T> | undefined {
    return services.getSingleton(contract)
  }

  /**
   * Bootstrap application
   */
  async bootstrap(appConfig: BootstrapConfig) {
    const mainConfig = appConfig.main
    const configName = appConfig.__name

    if (!mainConfig) {
      throw new Error(`Configuration ${configName} does not contain the "main" file`)
    }

    config.apply(appConfig)
    config.apply(mainConfig.config)

    return new BootstrapSessionTask({
      label: 'RVT',
    }).execute(mainConfig)
  }

  async next(name: string) {
    const mainConfig: Config = config.get('main')
    const next = mainConfig.next?.[name]

    if (next) {
      const nextConfig = next()

      config.apply(nextConfig.config)

      return new BootstrapSessionTask({
        label: `NXT ${name}`,
      }).execute(nextConfig)
    } else {
      throw new Error(`Session ${name} was not found`)
    }
  }
}
