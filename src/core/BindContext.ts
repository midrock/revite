import {
  AbstractConstructor,
  BindFactory,
  ExtendedConstructor,
  ExtensionConstructor,
  FactoryConfig,
  Import,
  ServiceConfig,
} from '../types'
import { resolveImport } from '..'
import { logger, reactivity } from '../utils/built-in'
import { config, services } from '../state'

export class BindContext<T extends AbstractConstructor> {
  key: string
  private resolvePromise?: Promise<any>
  private getterPromise?: Promise<any>
  private singleton = false
  private reactive: boolean | 'deep' = false
  private resolver?: () => Promise<any>
  private factory?: {
    service: any
    extend: ExtensionConstructor[]
  }

  constructor(private contract?: AbstractConstructor) {
    this.key = contract?.name || 'unknown'
  }

  async resolve() {
    if (!this.resolvePromise && this.resolver) {
      this.resolvePromise = this.resolver()
    }

    await this.resolvePromise
  }

  get() {
    if (this.singleton && this.getterPromise) {
      return this.getterPromise
    }

    const task = async () => {
      let instance: any

      if (!this.factory) {
        console.warn('No factory')
        return
      }

      const reactivityService = await reactivity()
      const rawInstance = this.factory.service()
      const extend = this.factory?.extend || []

      if (this.reactive === 'deep') {
        instance = reactivityService.makeDeepReactive(rawInstance)
      } else if (this.reactive) {
        instance = reactivityService.makeReactive(rawInstance)
      } else {
        instance = rawInstance
      }

      const loggerService = logger()

      const handledExtensions = await Promise.all(extend.map(async (ExtensionConstructor) => {
        const extension = new ExtensionConstructor()

        if (extension.extend) {
          await extension.extend(instance)
        } else {
          throw new Error(`Invalid extension ${ExtensionConstructor.name}`)
        }

        return ExtensionConstructor.name
      }))

      loggerService.group({
        message: '=> ' + instance.constructor.name,
        level: 'debug',
        collapsed: handledExtensions.length === 0,
        context: `IOC ${this.key}`,
        entry: () => {
          handledExtensions.forEach(extName => {
            loggerService.log({
              level: 'debug',
              context: `EXT ${extName}`,
            })
          })

          loggerService.dir(instance)
        },
      })

      return instance
    }

    this.getterPromise = task().then(instance => {
      if (this.singleton) {
        services.convertBinderToSingleton(this.key, instance)
        this.dispose()
      }
      return instance
    })

    return this.getterPromise
  }

  to<C extends ServiceConfig<any>>(options: {
    reactive?: boolean | 'deep'
    singleton?: boolean
    config?: string
    service?: Import<T>
    factory?: (options: {
      config: FactoryConfig<C>,
      Service: ExtendedConstructor<T>
    }) => (BindFactory<T> | Promise<BindFactory<T>>)
  }) {
    this.singleton = !!options.singleton
    this.reactive = options.reactive ?? false

    this.resolver = async () => {
      let Service
      let bindConfig = {} as C

      if (options.config) {
        bindConfig = config.get(options.config)
      }

      if (options.service) {
        Service = await resolveImport(options.service)
      } else if (options.config && bindConfig.service) {
        Service = await resolveImport(bindConfig.service)
      } else {
        Service = this.contract
      }

      let serviceFactory

      if (options.factory instanceof Function) {
        serviceFactory = await options.factory({
          Service,
          config: bindConfig,
        })
      } else {
        serviceFactory = () => new Service()
      }

      this.factory = {
        service: serviceFactory,
        extend: await Promise.all((bindConfig.extend || []).map(extension => {
          return resolveImport(extension)
        })),
      }
    }
  }

  dispose() {
    this.resolvePromise = undefined
    this.getterPromise = undefined
    this.resolver = undefined
    this.factory = undefined
    this.contract = undefined
  }
}
