import { Task } from '../core/Task'
import { config, providers as providersRegistry } from '../state'
import { resolveImport, ServiceProvider } from '..'
import { Package } from '../core/Package'
import { Config, Constructor, Import, LogLevel } from '../types'

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
    const creationTasks: Promise<any>[] = []
    const providers: ServiceProvider[] = []

    function createProvider(source: Import<Constructor<ServiceProvider>>) {
      return resolveImport(source)
        .then((resolved: Constructor<ServiceProvider>) => {
          const provider = providersRegistry.create(resolved)

          providers.push(provider)
        })
    }

    packagesSources.forEach(source => {
      const task = resolveImport(source)
        .then((PackageConstructor: Constructor<Package>) => {
          const pkg = new PackageConstructor()
          const pkgProviders = pkg.providers || []
          const pkgTasks = pkgProviders.map(providerSource => {
            return createProvider(providerSource)
          })

          return Promise.all(pkgTasks)
        })

      creationTasks.push(task)
    })

    providersSources.forEach(source => {
      creationTasks.push(createProvider(source))
    })

    await Promise.all(creationTasks)

    await Promise.all([
      ...providers
        .filter(provider => provider.mayRegister)
        .map(provider => {
          return providersRegistry.register(provider)
        }),
    ])

    await Promise.all([
      ...providers
        .filter(provider => provider.mayBeforeBoot)
        .map(provider => {
          return providersRegistry.beforeBoot(provider)
        }),
    ])

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
