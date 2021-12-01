export class Event {
  dispatch() {
    revite.logger.log({
      args: [this],
      level: 'info',
      color: 'purple',
      context: this.constructor.name,
    })

    revite.emitter.emit(this.constructor.name, this)
  }
}
