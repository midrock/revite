import { BootContext, RegisterContext, ServiceProvider } from 'revite'
import { AuthServiceContract } from '/~/services/auth/AuthServiceContract'

export class AuthServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config: Service.Auth.Config = ctx.config('auth')

    ctx.bind(AuthServiceContract).to({
      service: config.service,
      singleton: true,
    })
  }

  async boot(ctx: BootContext) {
    const authService = await ctx.resolve(AuthServiceContract)

    return authService.fetchUser()
  }
}
