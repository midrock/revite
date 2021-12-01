import mitt from 'mitt'

export class EventsRegistry {
  private emitter = mitt()

  constructor(private context: Revite.Controller) {
  }

  on(
    event: Revite.Events.EventConstructor,
    listen: Revite.Events.ListenerConstructor | Revite.Events.ListenerConstructor[],
  ) {
    const createListener = (Listener: Revite.Events.ListenerConstructor) => {
      if (!Listener.name) {
        throw new Error(`Listener for ${event.name} should be a constructor.`)
      }

      const listener = new Listener()

      this.emitter.on(event.name, listener.execute)
      revite.logger.log({
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
    event: Revite.Events.EventConstructor,
    listen?: Revite.Events.ListenerConstructor | Revite.Events.ListenerConstructor[],
  ) {
    const removeListener = (Listener: Revite.Events.ListenerConstructor) => {
      console.warn('implement this', Listener)
    }

    if (listen instanceof Array) {
      listen.forEach(removeListener)
    } else if (listen) {
      removeListener(listen)
    } else {
      this.emitter.off(event.name)
      revite.logger.log({
        level: 'debug',
        color: 'brown',
        context: event.name,
        message: 'All listeners removed',
      })
    }
  }
}
