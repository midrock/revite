export class NotesView {
  route = {
    root: 'notes',
    list: 'notes-list',
    create: 'notes-create',
  }

  constructor(private options: {
    routerService: Service.Router.Contract
  }) {
  }

  toList() {
    return this.options.routerService.push(this.getRootRoute())
  }

  goCreate() {
    return this.options.routerService.push(this.getCreateRoute())
  }

  getRootRoute(): Service.Router.Location {
    return {
      name: this.route.root,
    }
  }

  getCreateRoute() {
    return {
      name: this.route.create,
    }
  }
}
