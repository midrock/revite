import { Event } from './Event'
import { Listener } from './Listener'
import { debounce } from '../utils/timer'
import { Constructor, EventHandlerOptions } from '../types'
import { logger } from '../utils/built-in'

type EventConstructor = Constructor<Event>
type ListenerConstructor = Constructor<Listener>

type Handler = (event?: any) => any
type EventHandler = ListenerConstructor | Handler

export class EventsRegistry {
  registry = new Map<EventConstructor, Handler[]>()

  emit(event: Event) {
    const constructor = event.constructor as EventConstructor
    const handlers = this.registry.get(constructor) || []

    return Promise
      .all(handlers.map(handler => {
        return handler(event).catch(e => {
          console.error(e)
        })
      }))
      .finally(() => {
        event.dispose()
      })
  }

  on(
    event: EventConstructor,
    listen: EventHandler | EventHandler[],
    options?: EventHandlerOptions,
  ) {
    if (!listen) {
      throw new Error(`No listeners was provided for ${event.name}`)
    }

    const createListener = (Source: any) => {
      let listener: Listener

      if (Source.isBuiltIn) {
        listener = new Source()
      } else if (Source instanceof Function) {
        class FunctionListener extends Listener {
          handle = Source
        }

        listener = new FunctionListener()
      } else {
        throw new Error(`Listener for ${event.name} should be a constructor or function.`)
      }

      logger().log({
        level: 'debug',
        context: Listener.name,
        message: `Registered for ${event.name}`,
      })

      return listener
    }

    const listeners: Listener[] = []

    if (listen instanceof Array) {
      listen.forEach(ListenerConstructor => {
        listeners.push(createListener(ListenerConstructor))
      })
    } else {
      listeners.push(createListener(listen))
    }

    const handlersInRegistry = this.registry.get(event)
    const registryHandler = this.makeEventHandler({
      event,
      listeners,
      params: options,
    })

    if (handlersInRegistry) {
      handlersInRegistry.push(registryHandler)
    } else {
      this.registry.set(event, [registryHandler])
    }
  }

  off(event: EventConstructor) {
    this.registry.delete(event)

    logger().log({
      level: 'debug',
      color: 'brown',
      context: event.name,
      message: 'All listeners removed',
    })
  }

  private makeEventHandler(options: {
    event: EventConstructor
    listeners: Listener[]
    params?: EventHandlerOptions
  }) {
    const { params, listeners } = options

    return debounce((event: Event) => {
      if (params?.sequential) {
        return this.executeListenersConsistently(event, listeners)
      }

      return this.executeListenersParallel(event, listeners)
    }, params?.wait || 0)
  }

  private async executeListenersConsistently(event: Event, listeners: Listener[]) {
    for (const listener of listeners) {
      try {
        await this.executeListener(event, listener)
      } catch (e) {
        if (listener.handleError) {
          listener.handleError(e)
        } else {
          console.error(e)
        }

        return
      }
    }
  }

  private async executeListenersParallel(event: Event, listeners: Listener[]) {
    return Promise.all(listeners.map(listener => {
      return this.executeListener(event, listener).catch(e => {
        if (listener.handleError) {
          listener.handleError(e)
        } else {
          console.error(e)
        }
      })
    }))
  }

  private async executeListener(event: Event, listener: Listener) {
    logger().log({
      args: [event],
      level: 'debug',
      context: listener.constructor.name,
      message: 'Executed by',
    })

    return listener.handle(event)
  }
}
