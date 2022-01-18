import { defineAsyncComponent, markRaw } from 'vue'
import { BeforeBootContext, RegisterContext, ServiceProvider } from 'revite'
import { RouterServiceContract } from '/~/services/router'
import { UiService } from '/~/services/ui'
import { DashboardService } from '/~/services/dashboard'
import { NotesView } from './NotesView'

export class VueNotesViewProvider extends ServiceProvider {
  async register(ctx: RegisterContext) {
    ctx.bind(NotesView).to({
      singleton: true,
      async factory({ Service }) {
        const routerService = await ctx.resolve(RouterServiceContract)

        return () => new Service({
          routerService,
        })
      },
    })
  }

  async beforeBoot(ctx: BeforeBootContext) {
    const notesView = await ctx.resolve(NotesView)
    const uiService = await ctx.resolve(UiService)
    const routerService = await ctx.resolve(RouterServiceContract)
    const dashboardService = await ctx.resolve(DashboardService)

    uiService.addMenuItem('main', {
      title: 'Notes',
      icon: 'pencil',
      order: 15,
      route: notesView.getRootRoute(),
    })

    routerService.addRoute({
      name: notesView.route.root,
      path: '/notes',
      component: () => import('./vue/notes.vue'),
      redirect: { name: notesView.route.list },
      children: [
        {
          path: '',
          name: notesView.route.list,
          component: () => import('./vue/notes-list.vue'),
        },
        {
          path: 'create',
          name: notesView.route.create,
          component: () => import('./vue/notes-create.vue'),
        },
      ],
    })

    dashboardService.registerLink({
      route: notesView.getRootRoute(),
      title: 'Notes',
      description: 'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
      icon: {
        name: 'pencil',
        class: 'text-green-500 bg-green-50',
      },
      order: 5,
    })

    dashboardService.registerWidget({
      order: 10,
      component: markRaw(defineAsyncComponent(() => import('./vue/components/create-note-widget.vue'))),
    })
  }
}
