// import { resolveImport } from './utils/utils'
import { BuiltInServicesTask } from '../tasks/BuiltInServicesTask'
import { BootstrapSessionTask } from '../tasks/BootstrapSessionTask'
import { config } from '../state'

export class ReviteController {
  private initialized = false
  // async resolve<T>(contract: Revite.AbstractConstructor<T>): Promise<T> {
  //   return this.ioc.resolveLoaded(contract)
  // }
  //
  // async resolveIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined> {
  //   return this.ioc.resolveLoadedIfExist(contract)
  // }

  // /**
  //  * Resolve import
  //  */
  // import<T = any>(source: Revite.Import<T>) {
  //   return resolveImport(source)
  // }

  /**
   * Bootstrap application
   */
  async bootstrap(appConfig: Revite.Config.Sources) {
    await config.apply(appConfig)

    if (!this.initialized) {
      await new BuiltInServicesTask().execute()
    }

    return new BootstrapSessionTask().execute()
  }
}
