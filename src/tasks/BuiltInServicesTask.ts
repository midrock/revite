import { LoggerServiceContract, ReactivityServiceContract } from '../'
import { Task } from '../core/Task'
import { config, services } from '../state'
import { Config } from '../types'

const DEFAULT_LOGGER = () => import('../services/LoggerService')

export class BuiltInServicesTask extends Task {
  async run() {
    const mainConfig = config.get<Config>('main')

    services.bind(LoggerServiceContract).to({
      service: mainConfig.logger?.service || DEFAULT_LOGGER,
      singleton: true,
      factory({ Service }) {
        return () => new Service({
          level: mainConfig.logger?.level || 'warn',
        })
      },
    })

    await services.resolve(LoggerServiceContract)

    if (mainConfig.reactivity?.service) {
      services.bind(ReactivityServiceContract).to({
        service: mainConfig.reactivity?.service,
        singleton: true,
      })

      await services.resolve(ReactivityServiceContract)
    }
  }
}
