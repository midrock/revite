import { RegisterContext, ServiceProvider } from 'revite'
import { NotesServiceContract } from './NotesServiceContract'

export class NotesServiceProvider extends ServiceProvider {
  register(ctx: RegisterContext) {
    const config = ctx.config('notes') as Service.Notes.Config

    ctx.bind(NotesServiceContract).to({
      service: config.service,
      reactive: true,
      singleton: true,
    })
  }
}
