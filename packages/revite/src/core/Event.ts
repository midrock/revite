import { events } from '../state'
import { logger } from '../utils/built-in'

export abstract class Event {
  #dispatched = false

  dispatch() {
    if (this.#dispatched) {
      throw new Error('Event already dispatched')
    }

    this.#dispatched = true
    this.log()
    events.emit(this).then()
  }

  async dispatchAndWait() {
    if (this.#dispatched) {
      throw new Error('Event already dispatched')
    }

    this.#dispatched = true
    this.log()
    return events.emit(this)
  }

  dispose() {
    Object.keys(this).forEach(key => {
      this[key] = undefined
    })
  }

  private log() {
    logger().group({
      message: '',
      level: 'debug',
      collapsed: true,
      context: `EVT ${this.constructor.name}`,
      entry: () => {
        logger().dir(this)
      },
    })
  }
}
