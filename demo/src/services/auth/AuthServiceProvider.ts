import { RegisterContext, ServiceProvider } from 'revite'
import { AuthServiceContract } from '/~/services/auth/AuthServiceContract'
import { ApiServiceContract } from '/~/services/api/ApiServiceContract'

export class AuthServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config: Service.Auth.Config = ctx.config('auth')

    ctx.bind(AuthServiceContract).to({
      service: () => import('./versions/MockLoggedAuthService'),
      reactive: true,
      singleton: true,
      async factory({ Service }) {
        const apiService = await ctx.resolve(ApiServiceContract)

        return () => new Service({
          apiService,
        })
      },
    })
  }
}
