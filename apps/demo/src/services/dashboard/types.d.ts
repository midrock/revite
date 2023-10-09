declare namespace Service {
  namespace Dashboard {
    type Contract = import('./DashboardService').DashboardService

    interface Config extends Revite.ServiceConfig<Contract> {
      enable?: boolean
    }

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
