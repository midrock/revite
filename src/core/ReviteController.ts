import { BootstrapSessionTask } from '../tasks/BootstrapSessionTask'
import { config, services } from '../state'
import { AbstractConstructor, Config, Sources } from '../types'
import { getImportsByFileNames } from '../utils/import'

export class ReviteController {
  async resolve<T extends AbstractConstructor>(contract: T, options?): Promise<InstanceType<T>> {
    return services.resolve(contract, options)
  }

  async resolveIfExist<T extends AbstractConstructor>(contract: T, options?): Promise<InstanceType<T> | undefined> {
    return services.resolveIfExist(contract, options)
  }

  /**
   * Bootstrap application
   */
  async bootstrap(appConfig: Sources) {
    const configInFiles = getImportsByFileNames(appConfig)
    const mainConfig = configInFiles.main
    const configName = appConfig.__name

    if (!mainConfig) {
      throw new Error(`Configuration ${configName} does not contain the "main" file`)
    }

    await config.apply(configInFiles)
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
