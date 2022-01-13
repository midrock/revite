import { Container } from 'typescript-ioc'
import { AbstractConstructor, ResolveOptions } from '../types'
import { providers } from '../state'
import { BindContext } from './BindContext'

export class IocRegistry {
  binders = new Map<AbstractConstructor, BindContext<any>>()
  container = Container

  getValue(target: string) {
    return Container.getValue(target)
  }

  get<T>(target: AbstractConstructor): T {
    const instance = Container.get(target)

    if (/contract/i.test(instance.constructor.name)) {
      throw new Error(`${target.name} does not have a linked service`)
    }

    return instance
  }

  bindValue(name: string) {
    return Container.bindName(name)
  }

  bind<T extends AbstractConstructor>(contract: T): BindContext<T> {
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
      this.binders.delete(contract)
    }

    return this.get(contract)
  }

  async resolveIfExist<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T> | undefined> {
    try {
      return this.resolve(contract, options)
    } catch (error) {
      return undefined
    }
  }
}
