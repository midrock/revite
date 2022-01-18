import { Task } from '../core/Task'
import { config, providers as providersRegistry } from '../state'
import { ServiceProvider } from '../core/ServiceProvider'
import { resolveImport } from '../utils/import'
import { Config, Constructor, LogLevel } from '../types'

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

    const tasks = providersSources.map(source => {
      return resolveImport(source)
        .then((resolved: Constructor<ServiceProvider>) => {
          return providersRegistry.create(resolved)
        })
    })

    const providers = await Promise.all(tasks)

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
