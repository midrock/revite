import { AbstractConstructor, BindFactory, ExtendedConstructor, Import } from '../types'
import { resolveImport } from '../utils/import'
import { logger, reactivity } from '../utils/built-in'

export class BindContext<T extends AbstractConstructor> {
  private resolvePromise?: Promise<void>
  private singleton = false
  private reactive = false
  private instance?: any

  constructor(private contract: AbstractConstructor) {
  }

  async resolve() {
    if (this.resolvePromise) {
      await this.resolvePromise
    } else {
      this.resolvePromise = this.resolver()
      await this.resolvePromise
    }
  }

  get() {
    if (this.singleton && this.instance) {
      return this.instance
    }

    let instance: any

    if (this.reactive) {
      instance = reactivity().makeReactive(this.factory())
    } else {
      instance = this.factory()
    }

    if (this.singleton) {
      this.instance = instance
    }

    const loggerService = logger()

    loggerService.group({
      message: '=> ' + instance.constructor.name,
      level: 'debug',
      collapsed: true,
      context: `IOC ${this.contract.name}`,
      entry: () => {
        logger().dir(instance)
      },
    })

    return instance
  }

  to(options: {
    reactive?: boolean
    singleton?: boolean
    service?: Import<T>
    factory?: (options: {
      Service: ExtendedConstructor<T>
    }) => (BindFactory<T> | Promise<BindFactory<T>>)
  }) {
    this.singleton = !!options.singleton
    this.reactive = !!options.reactive

    this.resolver = async () => {
      let Service

      if (options.service) {
        Service = await resolveImport(options.service)
      } else {
        Service = this.contract
      }

      if (options.factory instanceof Function) {
        this.factory = await options.factory({ Service })
      } else {
        this.factory = () => new Service()
      }
    }
  }

  private resolver = () => Promise.resolve()

  private factory: () => any = () => undefined
}
