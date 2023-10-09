import { RegisterContext, ServiceProvider } from 'revite'
import { NoteCreatedEvent } from '/~/events/NoteCreatedEvent'

export class EventServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.on(NoteCreatedEvent, [
      () => import('/~/listeners/NoteCreatedNotify'),
    ])
  }
}
