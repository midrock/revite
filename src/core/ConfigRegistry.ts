import { getImportsByFileNames } from '../utils/import'
import { ioc } from '../state'
import { Config, Sources } from '../types'

export class ConfigRegistry {
  set(key: string, config) {
    ioc.bindValue(`config.${key}`).to(config)
  }

  get<T>(key: string): T {
    return ioc.getValue(`config.${key}`)
  }

  async apply(raw: Sources) {
    const config = getImportsByFileNames(raw)
    const mainConfig: Config = config.main

    for (const key in config) {
      this.set(key, config[key])
    }

    if (mainConfig.config) {
      for (const key in mainConfig.config) {
        if (!config[key]) {
          this.set(key, mainConfig.config[key])
        }
      }
    }
  }
}
