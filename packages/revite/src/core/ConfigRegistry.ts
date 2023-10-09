import { logger } from '../utils/built-in'

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

  apply(config?: Record<string, any>) {
    if (!config) return

    for (const key in config) {
      if (this.values.get(key)) {
        logger().log({
          level: 'warn',
          context: `CFG ${key}`,
          message: 'Override',
        })
      }
      this.set(key, config[key])
    }
  }
}
