import { getImportsByFileNames } from '../utils/import'
import { ioc } from '../state'

export class ConfigRegistry {
  set(key: string, config: Revite.Config.SourceRaw) {
    ioc.bindValue(`config.${key}`).to(config)
  }

  get<T>(key: string): T {
    return ioc.getValue(`config.${key}`)
  }

  async apply(raw: Revite.Config.Sources) {
    const config = getImportsByFileNames(raw)

    for (const key in config) {
      this.set(key, config[key])
    }
  }
}
