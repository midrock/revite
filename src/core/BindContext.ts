import { Container, Scope } from 'typescript-ioc'
import { AbstractConstructor, BindFactory, ExtendedConstructor, Import } from '../types'
import { resolveImport } from '../utils/import'
import { logger, reactivity } from '../utils/built-in'

export class BindContext<T extends AbstractConstructor> {
  private resolver?: () => Promise<void>
  private resolvePromise?: Promise<void>

  constructor(private contract: AbstractConstructor) {
  }

  async resolve() {
    if (this.resolvePromise) {
      await this.resolvePromise
    } else if (this.resolver) {
      const promise = this.resolver()

      this.resolvePromise = promise
      await promise
    }
  }

  to(options: {
    reactive?: boolean
    singleton?: boolean
    service?: Import<T>
    factory?: (options: {
      Service: ExtendedConstructor<T>
    }) => (BindFactory<T> | Promise<BindFactory<T>>)
  }) {
    this.resolver = async () => {
      let Service

      if (options.service) {
        Service = await resolveImport(options.service)
      } else {
        Service = this.contract
      }

      const bind = Container.bind(this.contract)

      if (options.singleton) {
        bind.scope(Scope.Singleton)
      }

      const factory = options.factory && await options.factory({ Service })
      const loggerService = logger()

      bind.factory(() => {
        const instance = factory ? factory() : new Service()

        loggerService.group({
          message: '=> ' + Service.name,
          level: 'debug',
          collapsed: true,
          context: `IOC ${this.contract.name}`,
          entry: () => {
            logger().dir(instance)
          },
        })

        if (options.reactive) {
          return reactivity().makeReactive(instance)
        }

        return instance
      })

      loggerService.log({
        message: 'bind ' + Service.name,
        level: 'debug',
        context: `IOC ${this.contract.name}`,
      })
    }
  }
}
