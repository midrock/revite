export class UiService {
  private menu: Record<string, Service.Ui.MenuItem[]> = {
    main: [],
  }

  private readonly routerService: Service.Router.Contract

  constructor(options: {
    routerService: Service.Router.Contract
  }) {
    this.routerService = options.routerService
  }

  get mainMenu() {
    return this.menu.main
      .sort((a, b) => {
        return a.order - b.order
      })
      .map(item => {
        return {
          ...item,
          current: this.routerService.checkRouteActive(item.route.name),
        }
      })
  }

  addMenuItem(menuName: string, item: Service.Ui.MenuItem) {
    const targetMenu = this.menu[menuName]

    if (targetMenu) {
      targetMenu.push(item)
    }
  }
}
