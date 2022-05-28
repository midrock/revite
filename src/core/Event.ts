import { logger } from '../utils/built-in'
import { events } from '../state'

export abstract class Event {
  dispatch() {
    this.log()
    events.emit(this)
  }

  async dispatchAndWait() {
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
      message: 'Dispatched',
      level: 'debug',
      collapsed: true,
      context: this.constructor.name,
      entry: () => {
        logger().dir(this)
      },
    })
  }
}
