import { Task } from '../Task'
import { ProvidersCreationTask } from './ProvidersCreationTask'
import { ProvidersBeforeRegisterTask } from './ProvidersBeforeRegisterTask'
import { ProvidersRegisterTask } from './ProvidersRegisterTask'

export class BootstrapSessionTask extends Task {
  async run(context: Revite.Controller) {
    context.log({
      level: 'debug',
      context: 'Revite Bootstrap',
      message: 'Executing...',
    })

    await new ProvidersCreationTask().execute(context)
    await new ProvidersBeforeRegisterTask().execute(context)
    await new ProvidersRegisterTask().execute(context)
    // await new ProvidersBootTask().execute(manifests)

    // const failedManifests = manifests
    //   .filter(manifest => {
    //     return manifest.provider.isFailed
    //   })
    //
    // if (failedManifests.length) {
    //   throw new Error(`${failedManifests.length} providers were failed`)
    // }
  }
}
