import { Listener, revite } from 'revite'
import { NoteCreatedEvent } from '/~/events/NoteCreatedEvent'
import { NotifyServiceContract } from '/~/services/notify'

export class NoteCreatedNotify extends Listener {
  async handle(event: NoteCreatedEvent) {
    const notifyService = await revite.resolve(NotifyServiceContract)

    console.log('notify')

    notifyService.show({
      title: 'Note created',
      type: 'success',
      text: 'ID ' + event.note.id,
    })
  }
}
