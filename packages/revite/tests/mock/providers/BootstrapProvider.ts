import { revite, ServiceProvider } from 'revite'

export class BootstrapProvider extends ServiceProvider {
  async beforeBoot() {
    revite.next('authorized')
  }

  async boot() {
    return revite.next('unauthorized')
  }
}
