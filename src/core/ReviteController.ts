import { BuiltInServicesTask } from '../tasks/BuiltInServicesTask'
import { BootstrapSessionTask } from '../tasks/BootstrapSessionTask'
import { config, services } from '../state'
import { AbstractConstructor, Sources } from '../types'

export class ReviteController {
  private initialized = false

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
    await config.apply(appConfig)

    if (!this.initialized) {
      await new BuiltInServicesTask().execute()
    }

    return new BootstrapSessionTask().execute()
  }
}
