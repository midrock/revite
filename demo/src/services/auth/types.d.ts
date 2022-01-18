declare namespace Service {
  namespace Auth {
    type Contract = import('./AuthServiceContract').AuthServiceContract
    type User = import('./core/User').User

    interface Config {
      service: Revite.ImportConstructor<Contract>
    }

    interface UserRaw {
      first_name: string
      last_name: string
      email: string
    }
  }
}
