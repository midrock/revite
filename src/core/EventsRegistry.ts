import type { EventConstructor, EventHandler, EventHandlerOptions, ListenerWrapper } from '../types'
import { debounce } from '../utils/timer'
import { logger } from '../utils/built-in'
import { resolveImportUnsafe } from '../utils/import'
import { Event, Listener } from '..'

export class EventsRegistry {
  registry = new Map<EventConstructor, Set<ListenerWrapper>>()
  listeners = new Map<EventConstructor, Listener>()

  async emit(event: Event) {
    const constructor = event.constructor as EventConstructor
    const handlers = this.registry.get(constructor)

    if (handlers) {
      const promises: Promise<any>[] = []

      handlers.forEach(handler => {
        promises.push(handler(event))
      })

      await Promise.all(promises)
    }

    event.dispose()
  }

  on(
    constructor: EventConstructor,
    listen: EventHandler | EventHandler[],
    options?: EventHandlerOptions,
  ) {
    let handler: ListenerWrapper | undefined

    if (!listen || (listen instanceof Array && listen.length === 0)) {
      logger().log({
        message: 'No listeners was provided',
        level: 'warn',
        context: `REV ${constructor.name}`,
      })
    } else {
      handler = this.makeGroupHandler(
        constructor,
        (() => {
          if (listen instanceof Array) {
            return listen
          }

          return [listen]
        })(),
        options,
      )

      if (!this.registry.has(constructor)) {
        this.registry.set(constructor, new Set())
      }

      this.registry.get(constructor)?.add(handler)
    }

    const dispose = () => {
      if (handler) {
        this.registry.get(constructor)?.delete(handler)

        logger().group({
          message: '',
          level: 'debug',
          collapsed: true,
          context: `DIS ${constructor.name}`,
          entry: () => {
            logger().dir(listen)
          },
        })

        handler = undefined
      }
    }

    return {
      dispose,
    }
  }

  private makeGroupHandler(
    constructor: EventConstructor,
    handlers: EventHandler[],
    options?: EventHandlerOptions,
  ): ListenerWrapper {
    logger().group({
      message: '',
      level: 'debug',
      collapsed: true,
      context: `REV ${constructor.name}`,
      entry: () => {
        handlers.forEach(handler => {
          logger().dir(handler)
        })
      },
    })

    return debounce((event: Event) => {
      if (options?.sequential) {
        return this.executeListenersConsistently(event, handlers, options)
      }

      return this.executeListenersParallel(event, handlers)
    }, options?.wait || 0)
  }

  private async executeListenersConsistently(
    event: Event,
    handlers: EventHandler[],
    options?: EventHandlerOptions,
  ) {
    for (const handler of handlers) {
      try {
        await this.executeListener(event, handler)
      } catch (error) {
        console.error(error)

        if (options?.onError instanceof Function) {
          return options.onError(event, error)
        }
      }
    }
  }

  private async executeListenersParallel(event: Event, handlers: EventHandler[]) {
    return Promise.all(handlers.map(listener => {
      return this.executeListener(event, listener)
        .catch(e => {
          console.error(e)
        })
    }))
  }

  private getListenerFromConstructor(Source?: any): Listener | undefined {
    if (!Source?.isBuiltInListener) return
    if (!this.listeners.has(Source)) {
      this.listeners.set(Source, new Source())
    }

    return this.listeners.get(Source)
  }

  private async executeListener(event: Event, handler: EventHandler) {
    const Source: any = handler

    let listener = this.getListenerFromConstructor(handler)

    if (!listener) {
      const module = await resolveImportUnsafe(Source)

      listener = this.getListenerFromConstructor(module)
    }

    if (listener) {
      try {
        await listener.handle(event)
      } catch (error) {
        if (listener.handleError instanceof Function) {
          listener.handleError(event, error)
        }

        throw error
      } finally {
        logger().log({
          args: [event],
          level: 'debug',
          context: `LSN ${listener?.constructor.name || 'Anonymous function'}`,
          message: '',
        })
      }
    }
  }
}
