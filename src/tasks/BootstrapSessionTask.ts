import { Task } from '../core/Task'
import { ProvidersCreationTask } from './ProvidersCreationTask'
import { ProvidersRegisterTask } from './ProvidersRegisterTask'
import { ProvidersBootTask } from './ProvidersBootTask'

export class BootstrapSessionTask extends Task {
  label = 'Revite Bootstrap'

  async run() {
    await new ProvidersCreationTask().execute()
    await new ProvidersRegisterTask().execute()
    await new ProvidersBootTask().execute()
  }
}
