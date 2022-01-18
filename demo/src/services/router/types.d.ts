declare namespace Service {
  namespace Router {
    type Contract = import('./RouterServiceContract').RouterServiceContract

    type RouteConfig = {
      path: string
      name?: string
      meta?: Record<string, any>
      redirect?: Location
      component: any
      children?: RouteConfig[]
    }

    type Route = {
      path: string
      name?: string | symbol
    }

    type Location = {
      name: string
      params?: Record<string, any>
      query?: Record<string, any>
    }

    interface Config {
      service: Revite.ImportConstructor<Contract>
      enhanceRouter?: (router: Contract) => (void | Promise<void>)
    }
  }
}
