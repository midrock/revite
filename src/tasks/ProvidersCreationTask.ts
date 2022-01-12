import { Task } from '../core/Task'
import { config, providers } from '../state'
import { resolveImport } from '../utils/import'

export class ProvidersCreationTask extends Task {
  async run() {
    const mainConfig: Revite.Config.Main = config.get('main')
    const providersSources = mainConfig.providers || []

    if (providersSources.length === 0) {
      throw new Error('No providers to bootstrap')
    }

    const tasks = providersSources.map(source => {
      return resolveImport(source)
        .then((resolved: Revite.Provider.Constructor) => {
          return providers.create(resolved)
        })
    })

    return Promise.all(tasks)
  }
}
