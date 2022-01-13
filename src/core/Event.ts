import { logger } from '../utils/log'
import { events } from '../state'

export abstract class Event {
  dispatch() {
    logger().log({
      args: [this],
      level: 'debug',
      color: 'purple',
      context: this.constructor.name,
    })

    events.emit(this.constructor.name, this)
  }
}
