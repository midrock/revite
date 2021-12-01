import { getImportsByFileNames } from './utils'

export class ConfigRegistry {
  private registry = new Map()

  constructor(private context: Revite.Controller) {
  }

  set(key: string, config: Revite.Config.SourceRaw) {
    this.registry.set(key, config)
  }

  get(key: string) {
    return this.registry.get(key)
  }

  apply(raw: Revite.Config.Sources) {
    const config = getImportsByFileNames(raw)

    for (const key in config) {
      this.set(key, config[key])
    }
  }
}
