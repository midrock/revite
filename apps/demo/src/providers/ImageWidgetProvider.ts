import { Extension, revite } from 'revite'
import { DashboardService } from '/~/services/dashboard'
import { NotesView } from '/~/views/notes/NotesView'

export class ImageWidgetProvider extends Extension {
  async extend(service: DashboardService) {
    const notesView = await revite.resolve(NotesView)

    service.registerLink({
      route: notesView.getRootRoute(),
      title: 'Extended image',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
      icon: {
        name: 'pencil',
        class: 'text-green-500 bg-green-50',
      },
      order: 100,
    })
  }
}
