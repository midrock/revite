import { RegisterContext, ServiceProvider } from 'revite'
import { NoteCreatedEvent } from '/~/events/NoteCreatedEvent'
import { NoteCreatedNotify } from '/~/listeners/NoteCreatedNotify'

export class EventServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.on(NoteCreatedEvent, [
      NoteCreatedNotify,
    ])
  }
}
