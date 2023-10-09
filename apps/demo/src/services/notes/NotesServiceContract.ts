export abstract class NotesServiceContract {
  notes: Service.Notes.Note[] = []

  abstract get isEmpty(): boolean

  abstract createNote(note: Service.Notes.Note): Promise<void>

  abstract deleteNote(noteId: string): Promise<void>
}
