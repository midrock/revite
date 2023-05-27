import { Task } from '../core/Task'
import { config, providers as providersRegistry } from '../state'
import { Package, resolveImport, ServiceProvider } from '..'
import { Config, Constructor, Import, LogLevel } from '../types'
import { flatten } from '../utils/transform'

export class BootstrapSessionTask extends Task {
  label = 'Revite'
  color = 'success'
  timeout = -1
  level: LogLevel = 'info'

  async run() {
    this.log({
      message: 'Session started',
      context: 'Revite',
      level: 'info',
      color: 'success',
    })

    const mainConfig: Config = config.get('main')
    const providersSources = mainConfig.providers || []
    const packagesSources = mainConfig.packages || []
    const preloadSources = mainConfig.preload || []
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

    providers.forEach(provider => {
      providersRegistry.completeProvider(provider)
    })
  }
}
