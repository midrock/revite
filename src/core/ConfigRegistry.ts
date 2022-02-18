import { getImportsByFileNames } from '../utils/import'
import { Config, Sources } from '../types'

export class ConfigRegistry {
  values = new Map<string, Record<string, any>>()

  set(key: string, config) {
    this.values.set(key, config)
  }

  get<T>(key: string): T {
    const config = this.values.get(key)

    if (!config) {
      throw new Error(`No config for ${key}`)
    }

    return config as T
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
