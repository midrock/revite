import { AbstractConstructor, ResolveOptions } from '../types'
import { providers } from '../state'
import { BindContext } from './BindContext'

export class ServicesRegistry {
  singletonRegistry = new Map<string, any>()
  binders = new Map<string, BindContext<any>>()

  bind<T extends AbstractConstructor>(contract: T): BindContext<T> {
    if (!contract) {
      throw new TypeError('Bind contract required')
    }

    const context = new BindContext<T>(contract)

    this.binders.set(contract.name, context)
    return context
  }

  async resolve<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T>> {
    const singleton = this.singletonRegistry.get(contract.name)

    if (singleton) {
      return singleton
    }

    if (options?.loaded) {
      await providers.ensureLoaded(contract)
    }

    const binder = this.binders.get(contract.name)

    if (binder) {
      await binder.resolve()
      return await binder.get()
    }

    throw new Error(`No service was bind for ${contract.name}`)
  }

  async resolveIfExist<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T> | undefined> {
    try {
      return await this.resolve(contract, options)
    } catch (error) {
      return undefined
    }
  }

  convertBinderToSingleton(key: string, instance: any) {
    this.singletonRegistry.set(key, instance)
    this.binders.delete(key)
  }
}
