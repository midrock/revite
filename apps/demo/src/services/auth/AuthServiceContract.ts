export abstract class AuthServiceContract {
  user?: Service.Auth.User

  abstract isLoggedIn: boolean

  abstract fetchUser(): Promise<void>
}
