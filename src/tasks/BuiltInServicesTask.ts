import { Task } from '../core/Task'
import { config, ioc } from '../state'
import { LoggerServiceContract } from '../'
import { Config } from '../types'
import { LoggerService } from '../services/LoggerService'

export class BuiltInServicesTask extends Task {
  async run() {
    const mainConfig = config.get<Config>('main')

    ioc.container.configure({
      bind: LoggerServiceContract,
      factory() {
        const Service = mainConfig.logger?.service || LoggerService

        return new Service({
          level: mainConfig.logger?.level || 'warn',
        })
      },
    })
  }
}
