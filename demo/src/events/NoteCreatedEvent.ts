import { Event } from 'revite'

export class NoteCreatedEvent extends Event {
  constructor(public note: Service.Notes.Note) {
    super()
  }
}
