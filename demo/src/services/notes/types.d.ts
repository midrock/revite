declare namespace Service {
  namespace Notes {
    type Contract = import('./NotesServiceContract').NotesServiceContract

    type Config = Revite.ServiceConfig<Contract>
    type Constructor = Revite.ImportConstructor<Contract>

    interface Note {
      id: string
      text: string
      createDate?: string
    }
  }
}
