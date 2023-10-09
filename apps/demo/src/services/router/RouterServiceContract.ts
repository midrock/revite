export abstract class RouterServiceContract {
  abstract createRouter(): Promise<any>

  abstract getRouter(): any

  abstract push(location: Service.Router.Location): Promise<void>

  abstract replace(location: Service.Router.Location): Promise<void>

  abstract addRoute(routeConfig: Service.Router.RouteConfig): void

  abstract checkRouteActive(routeName: string): boolean
}
