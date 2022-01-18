// import { resolveImport } from './utils/utils'
import { BuiltInServicesTask } from '../tasks/BuiltInServicesTask'
import { BootstrapSessionTask } from '../tasks/BootstrapSessionTask'
import { config, ioc } from '../state'
import { AbstractConstructor, Sources } from '../types'

export class ReviteController {
  private initialized = false

  async resolve<T extends AbstractConstructor>(contract: T, options?): Promise<InstanceType<T>> {
    return ioc.resolve(contract, options)
  }

  async resolveIfExist<T extends AbstractConstructor>(contract: T, options?): Promise<InstanceType<T> | undefined> {
    return ioc.resolveIfExist(contract, options)
  }

  // /**
  //  * Resolve import
  //  */
  // import<T = any>(source: Revite.Import<T>) {
  //   return resolveImport(source)
  // }

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
