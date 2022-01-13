export abstract class AuthServiceContract {
  apiService!: Service.Api.Contract

  abstract isLoggedIn: boolean

  constructor(options: {
    apiService: Service.Api.Contract
  }) {
    this.apiService = options.apiService
  }

  abstract signIn(request: Service.Auth.SignInRequest): Promise<void>

  abstract signUp(request: Service.Auth.SignUpRequest, token?: string): Promise<void>

  abstract fetchUser(): Promise<void>
}
