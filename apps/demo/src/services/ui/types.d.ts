declare namespace Service {
  namespace Ui {
    interface MenuItem {
      title: string
      route: Service.Router.Location
      icon: string
      order: number
      current?: boolean
    }
  }
}
