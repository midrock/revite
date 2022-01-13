declare namespace Service {
  namespace Auth {
    type Contract = import('./AuthServiceContract').AuthServiceContract
    type Constructor = Revite.Constructor<Contract>
    type User = import('./core/User').User

    interface Config {
      service: Revite.Import<Constructor>
    }

    interface SignInRequest {
      email?: string
      password: string
    }

    interface SignUpRequest {
      first_name: string
      last_name: string
      email: string
      password: string
    }

    interface UserRaw {
      first_name: string
      last_name: string
      email: string
    }
  }
}
