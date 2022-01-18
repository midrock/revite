declare namespace Service {
  namespace Notes {
    type Contract = import('./NotesServiceContract').NotesServiceContract

    interface Config {
      service: Revite.ImportConstructor<Contract>
    }

    interface Note {
      id: string
      text: string
      createDate?: string
    }
  }
}
