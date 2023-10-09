import { createRouter, createWebHistory, RouteLocationNormalizedLoaded, Router, RouteRecordRaw } from 'vue-router'
import { RouterServiceContract } from '..'

export class VueRouterService extends RouterServiceContract {
  routes: any[] = []
  private router!: Router

  async createRouter() {
    this.router = createRouter({
      history: createWebHistory(),
      routes: this.routes,
    })

    return this.router
  }

  getRouter() {
    return this.router
  }

  checkRouteActive(routeName: string) {
    const currentRoute = this.router.currentRoute
    const route: RouteLocationNormalizedLoaded = currentRoute?.value || currentRoute

    return route.name === routeName || !!route.matched.find(match => match.name === routeName)
  }

  async push(location) {
    await this.router.push(location)
  }

  async replace(location) {
    await this.router.replace(location)
  }

  addRoute(config: Service.Router.RouteConfig) {
    if (this.router) {
      this.router?.addRoute(config as RouteRecordRaw)
    } else {
      this.routes.push(config)
    }
  }
}
