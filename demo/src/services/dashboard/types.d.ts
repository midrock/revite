declare namespace Service {
  namespace Dashboard {
    type Contract = import('./DashboardService').DashboardService

    interface Link {
      route: Service.Router.Location
      title: string
      icon: {
        class?: string
        name: string
      }
      description: string
      order: number
    }

    interface Widget {
      component: any
      order: number
    }
  }
}
