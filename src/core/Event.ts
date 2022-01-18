import { logger } from '../utils/built-in'
import { events } from '../state'

export abstract class Event {
  dispatch() {
    events.emit(this.constructor.name, this)

    logger().group({
      message: 'Created',
      level: 'debug',
      collapsed: true,
      context: this.constructor.name,
      entry: () => {
        logger().dir(this)
      },
    })
  }
}
