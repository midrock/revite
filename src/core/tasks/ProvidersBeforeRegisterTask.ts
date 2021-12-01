import { Task } from '../Task'
import { ProviderBeforeRegisterTask } from './ProviderBeforeRegisterTask'

export class ProvidersBeforeRegisterTask extends Task {
  async run(context: Revite.Controller) {
    context.log({
      level: 'debug',
      context: 'Before Register Providers',
      message: 'Executing...',
    })

    const promises: Promise<void>[] = []

    for (const [, provider] of context.providers.registry) {
      if (provider.beforeRegister) {
        const promise = new ProviderBeforeRegisterTask().execute(context, provider)

        promises.push(promise)
      }
    }

    return Promise.all(promises)
  }
}
