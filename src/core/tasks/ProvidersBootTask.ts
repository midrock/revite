import { Task } from '../Task'

export class ProvidersBootTask extends Task<Revite.Provider.Manifest[]> {
  log = {
    color: 'brown',
    label: 'Boot Providers',
  }

  async run(manifests: Revite.Provider.Manifest[]) {
    await Promise.all([
      ...manifests.map(manifest => {
        return revite.providers.boot(manifest)
      }),
    ])
  }
}
