import { Event } from './Event'
import { Listener } from './Listener'
import { debounce } from '../utils/timer'
import { Constructor } from '../types'
import { logger } from '../utils/built-in'

type EventConstructor = Constructor<Event>
type ListenerConstructor = Constructor<Listener>

export class EventsRegistry {
  registry = new Map()

  emit(event: Event) {
    const handlers = this.registry.get(event.constructor.name) || []

    handlers.forEach(handler => {
      handler(event)
    })
  }

  on(
    event: EventConstructor,
    listen: ListenerConstructor | ListenerConstructor[],
    options?: {
      wait?: number
    },
  ) {
    const createListener = (Listener: ListenerConstructor) => {
      if (!Listener.name) {
        throw new Error(`Listener for ${event.name} should be a constructor.`)
      }

      const listener = new Listener()

      logger().log({
        level: 'debug',
        context: Listener.name,
        message: `Registered for ${event.name}`,
      })

      return listener.execute
    }

    const handlers: Listener['execute'][] = []

    if (listen instanceof Array) {
      listen.forEach(ListenerConstructor => {
        handlers.push(createListener(ListenerConstructor))
      })
    } else {
      handlers.push(createListener(listen))
    }

    const handlersInRegistry = this.registry.get(event.name)

    const eventHandler = debounce((event: Event) => {
      handlers.forEach(handler => {
        handler(event)
      })
    }, options?.wait || 0)

    if (handlersInRegistry) {
      handlersInRegistry.push(eventHandler)
    } else {
      this.registry.set(event.name, [eventHandler])
    }
  }

  off(
    event: EventConstructor,
    listen?: ListenerConstructor | ListenerConstructor[],
  ) {
    const handlers = this.registry.get(event.name)
    const removeListener = (Listener: ListenerConstructor) => {
      if (handlers) {
        handlers.splice(handlers.indexOf(new Listener().execute) >>> 0, 1)
      }
    }

    if (listen instanceof Array) {
      listen.forEach(removeListener)
    } else if (listen) {
      removeListener(listen)
    } else {
      this.registry.delete(event.name)
      logger().log({
        level: 'debug',
        color: 'brown',
        context: event.name,
        message: 'All listeners removed',
      })
    }
  }
}
