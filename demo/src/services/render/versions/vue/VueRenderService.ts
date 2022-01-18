import { App, createApp, defineAsyncComponent } from 'vue'
import { RenderServiceContract } from '../../RenderServiceContract'
import AppComponent from './app.vue'

export class VueRenderService extends RenderServiceContract {
  private app!: App

  getApp() {
    return this.app
  }

  async renderApplication(options) {
    const app = createApp(AppComponent)

    app.component('base-icon', defineAsyncComponent(() => import('./components/base/base-icon.vue')))

    this.app = app

    if (options.router) {
      app.use(options.router)
    }

    app.mount('#app')
  }

  async dispose() {
    this.app.unmount()
  }
}
