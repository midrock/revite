import { Container, Scope, ContainerConfiguration } from 'typescript-ioc'

export class IocContainer {
  binders = new Map<Revite.AbstractConstructor, any>()

  constructor(private context: Revite.Controller) {
  }

  get<T>(target: Revite.AbstractConstructor<T>): T {
    const instance = Container.get(target)

    if (/contract/i.test(instance.constructor.name)) {
      throw new Error(`${target.name} does not have a linked service`)
    }

    return instance
  }

  getIfExist<T>(target: Revite.AbstractConstructor<T>): T | undefined {
    try {
      return this.get(target)
    } catch (error) {
      return undefined
    }
  }

  bind<T, O>(options: Revite.Ioc.BindSyncOptions<T, O>) {
    const bind = Container.bind(options.bind)

    if (options.to) {
      bind.to(options.to)
    }

    if (options.factory) {
      bind.factory(options.factory)
    } else if (options.withParams) {
      bind.factory(() => {
        const Constructor: Revite.Constructor<T, O> = options.to
        let params: O | null = null

        if (options.withParams instanceof Function) {
          params = options.withParams()
        } else if (options.withParams) {
          params = options.withParams
        }

        return params ? new Constructor(params) : new Constructor()
      })
    }

    if (options.singleton) {
      bind.scope(Scope.Singleton)
    }
  }

  async resolveInstance<T>(target: Revite.AbstractConstructor<T>): Promise<T> {
    const binder = this.binders.get(target)

    if (binder instanceof Promise) {
      await binder
    } else if (binder) {
      const promise = binder()

      this.binders.set(target, promise)
      await promise
    } else {
      throw new Error(`No binder for ${target.name}`)
    }

    return this.get<T>(target)
  }

  async resolveInstanceIfExist<T>(contract: Revite.AbstractConstructor<T>): Promise<T | undefined> {
    try {
      const instance = await this.resolveInstance(contract)

      return instance
    } catch (error) {
      return undefined
    }
  }

  bindAsync(config: Revite.Container.BindOptions): void {
    if (!config.bind) {
      throw new Error('Contract required')
    }

    this.binders.set(config.bind, async () => {
      const Service = await revite.utils.resolveImport(config.to)
      let factory: any

      if (config.factory instanceof Function) {
        factory = config.factory(Service)
      }

      if (factory instanceof Promise) {
        factory = await factory

        if (factory instanceof Function) {
          //
        } else {
          throw new Error('Async factory should return function')
        }
      }

      return Container.configure({
        bind: config.bind,
        scope: config.scope,
        factory() {
          let instance

          if (factory instanceof Function) {
            instance = factory(Service)
          } else if (factory) {
            instance = factory
            factory = undefined
          } else if (config.factory instanceof Function) {
            instance = config.factory(Service)
          } else {
            instance = new Service()
          }

          revite.log({
            label: 'New instance',
            level: 'debug',
            collapsed: true,
            context: config.bind.name,
            entry: () => {
              revite.logger.dir(instance)
            },
          })

          return instance
        },
      })
    })
  }

  // private bind() {
  //
  // }

  private bindAsync() {
    //
  }
}
