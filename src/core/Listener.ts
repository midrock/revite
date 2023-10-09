import type { Event } from './Event'

export abstract class Listener {
  static isBuiltInListener = true

  abstract handle(event: Event): (void | Promise<void>)

  handleError?(event: Event, error?: unknown): (void | Promise<void>)
}
