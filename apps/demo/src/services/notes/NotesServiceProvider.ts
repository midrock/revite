import { RegisterContext, ServiceProvider } from 'revite'
import { NotesServiceContract } from './NotesServiceContract'

export class NotesServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    ctx.bind(NotesServiceContract).to<Service.Notes.Config>({
      config: 'notes',
      reactive: true,
      singleton: true,
      factory({ Service }) {
        return () => new Service()
      },
    })
  }
}
