import { revite, ServiceProvider } from 'revite'
import { AuthServiceContract } from '/~/services/auth'

export class BootstrapProvider extends ServiceProvider {
  async boot(ctx) {
    const authService = await ctx.resolve(AuthServiceContract)

    if (authService.isLoggedIn) {
      return revite.next('authorized')
    }

    return revite.next('unauthorized')
  }
}
