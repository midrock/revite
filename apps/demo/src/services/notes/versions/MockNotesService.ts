import { NotesServiceContract } from '../'
import { NoteCreatedEvent } from '/~/events/NoteCreatedEvent'

export class MockNotesService extends NotesServiceContract {
  get isEmpty() {
    return this.notes.length === 0
  }

  async createNote(note: Service.Notes.Note) {
    this.notes.push({
      ...note,
      createDate: new Date().toJSON()
        .replace('T', ' ')
        .slice(0, 16),
    })

    new NoteCreatedEvent(note).dispatch()
  }

  async deleteNote(noteId: string) {
    const idx = this.notes.findIndex(note => note.id === noteId)

    if (idx >= 0) {
      this.notes.splice(idx, 1)
    }
  }
}
