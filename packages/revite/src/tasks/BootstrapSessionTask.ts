import { Package, resolveImport, ServiceProvider } from '..'
import { Task } from '../core/Task'
import { providers as providersRegistry } from '../state'
import { BaseConfig, Constructor, Import, LogLevel } from '../types'
import { flatten } from '../utils/transform'

export class BootstrapSessionTask extends Task {
  color = 'success'
  timeout = -1
  level: LogLevel = 'info'

  constructor(options: {
    label: string
  }) {
    super()
    this.label = options.label
  }

  async run(config: BaseConfig) {
    this.log({
      message: 'Started',
      context: this.label,
      level: 'info',
      color: 'success',
    })

    const providersSources = config.providers || []
    const packagesSources = config.packages || []
    const preloadSources = config.preload || []
    const creationTasks: Promise<any>[] = []
    const preloadProviders: (ServiceProvider | ServiceProvider[])[] = []
    const providers: ServiceProvider[] = []

    function createProvider(source: Import<Constructor<ServiceProvider>>) {
      return resolveImport(source)
        .then((resolved: Constructor<ServiceProvider>) => {
          return providersRegistry.create(resolved)
        })
    }

    packagesSources.forEach(source => {
      const task = resolveImport(source)
        .then((PackageConstructor: Constructor<Package>) => {
          const pkg = new PackageConstructor()
          const pkgProviders = pkg.providers || []
          const pkgTasks = pkgProviders.map(providerSource => {
            return createProvider(providerSource).then(provider => {
              providers.push(provider)
            })
          })

          return Promise.all(pkgTasks)
        })

      creationTasks.push(task)
    })

    providersSources.forEach(source => {
      const task = createProvider(source)
        .then(provider => {
          providers.push(provider)
        })

      creationTasks.push(task)
    })

    preloadSources.forEach((source, index) => {
      let task: Promise<any>

      if (source instanceof Array) {
        task = Promise.all(source.map(deepSource => {
          return createProvider(deepSource)
        })).then(providers => {
          preloadProviders[index] = providers
        })
      } else {
        task = createProvider(source)
          .then(provider => {
            preloadProviders[index] = provider
          })
      }

      creationTasks.push(task)
    })

    await Promise.all(creationTasks)

    const allProviders = [
      ...flatten(preloadProviders),
      ...providers,
    ]

    await Promise.all([
      ...allProviders
        .filter(provider => provider.mayRegister)
        .map(provider => {
          return providersRegistry.register(provider)
        }),
    ])

    await Promise.all([
      ...allProviders
        .filter(provider => provider.mayBeforeBoot)
        .map(provider => {
          return providersRegistry.beforeBoot(provider)
        }),
    ])

    for (const providerOrGroup of preloadProviders) {
      if (providerOrGroup instanceof Array) {
        await Promise.all(providerOrGroup.map(provider => {
          return providersRegistry.boot(provider)
        }))
      } else if (providerOrGroup.mayBoot) {
        await providersRegistry.boot(providerOrGroup)
      }
    }

    await Promise.all([
      ...providers
        .filter(provider => provider.mayBoot)
        .map(provider => {
          return providersRegistry.boot(provider)
        }),
    ])

    allProviders.forEach(provider => {
      providersRegistry.completeProvider(provider)
    })
  }
}
