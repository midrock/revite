import { Task } from '../Task'

export class ProvidersRegisterTask extends Task {
  async run(context: Revite.Controller) {
    context.log({
      level: 'debug',
      context: 'Register Providers',
      message: 'Executing...',
    })

    //
    // await Promise.all([
    //   ...manifests
    //     .filter(manifest => {
    //       return !manifest.provider.isRegistered
    //     })
    //     .map(manifest => {
    //       return revite.providers.register(manifest)
    //     }),
    // ])
  }
}
