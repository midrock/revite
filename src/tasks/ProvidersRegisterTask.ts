import { Task } from '../core/Task'
import { providers } from '../state'

export class ProvidersRegisterTask extends Task {
  label = 'Register Providers'

  async run() {
    const providersToRegister = providers.getAll()

    return Promise.all([
      ...providersToRegister
        .filter(provider => !provider.isRegistered)
        .map(provider => {
          return providers.register(provider)
        }),
    ])
  }
}
