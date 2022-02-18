import { AbstractConstructor, ResolveOptions } from '../types'
import { providers } from '../state'
import { BindContext } from './BindContext'

export class ServicesRegistry {
  binders = new Map<AbstractConstructor, BindContext<any>>()

  get<T>(target: AbstractConstructor): T {
    const binder = this.binders.get(target)

    if (binder) {
      return binder.get()
    }

    throw new Error(`${target.name} does not registered`)
  }

  bind<T extends AbstractConstructor>(contract: T): BindContext<T> {
    if (!contract) {
      throw new TypeError('Bind contract required')
    }

    const context = new BindContext<T>(contract)

    this.binders.set(contract, context)
    return context
  }

  async resolve<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T>> {
    if (options?.loaded) {
      await providers.ensureLoaded(contract)
    }

    const binder = this.binders.get(contract)

    if (binder) {
      await binder.resolve()
      return binder.get()
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
}
