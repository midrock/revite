import mitt from 'mitt'
import { Event } from './Event'
import { Listener } from './Listener'
import { Constructor } from '../types'
import { logger } from '../utils/log'

type EventConstructor = Constructor<Event>
type ListenerConstructor = Constructor<Listener>

export class EventsRegistry {
  private emitter = mitt()

  emit(event, payload) {
    this.emitter.emit(event, payload)
  }

  on(
    event: EventConstructor,
    listen: ListenerConstructor | ListenerConstructor[],
  ) {
    const createListener = (Listener: ListenerConstructor) => {
      if (!Listener.name) {
        throw new Error(`Listener for ${event.name} should be a constructor.`)
      }

      const listener = new Listener()

      this.emitter.on(event.name, listener.execute)
      logger().log({
        level: 'debug',
        color: 'teal',
        context: Listener.name,
        message: `Registered for ${event.name}`,
      })
    }

    if (listen instanceof Array) {
      listen.forEach(createListener)
    } else {
      createListener(listen)
    }
  }

  off(
    event: EventConstructor,
    listen?: ListenerConstructor | ListenerConstructor[],
  ) {
    const removeListener = (Listener: ListenerConstructor) => {
      this.emitter.off(event.name, new Listener().execute)
    }

    if (listen instanceof Array) {
      listen.forEach(removeListener)
    } else if (listen) {
      removeListener(listen)
    } else {
      this.emitter.off(event.name)
      logger().log({
        level: 'debug',
        color: 'brown',
        context: event.name,
        message: 'All listeners removed',
      })
    }
  }
}
