import { Scope } from 'typescript-ioc'
import { Task } from '../core/Task'
import { config, ioc } from '../state'
import { LoggerServiceContract, ReactivityServiceContract } from '../'
import { Config } from '../types'
import { resolveImport } from '../utils/import'
import { LoggerService } from '../services/LoggerService'

export class BuiltInServicesTask extends Task {
  async run() {
    const mainConfig = config.get<Config>('main')

    ioc.container.configure({
      bind: LoggerServiceContract,
      scope: Scope.Singleton,
      factory() {
        const Service = mainConfig.logger?.service || LoggerService

        return new Service({
          level: mainConfig.logger?.level || 'warn',
        })
      },
    })

    if (mainConfig.reactivity?.service) {
      const Service = await resolveImport(mainConfig.reactivity?.service)

      ioc.container.configure({
        bind: ReactivityServiceContract,
        to: Service,
        scope: Scope.Singleton,
      })
    }
  }
}
