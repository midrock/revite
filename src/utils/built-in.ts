import type { Config, ReactivityServiceContract } from '..'
import { LoggerServiceContract, resolveImport } from '..'
import { config } from '../state'
import { LoggerService } from '../services/LoggerService'

export const logger = (() => {
  let loggerService: LoggerServiceContract

  return () => {
    if (loggerService) {
      return loggerService
    }

    const mainConfig = config.get<Config>('main')
    const Service = mainConfig.logger?.service || LoggerService

    loggerService = new Service({
      level: mainConfig.logger?.level || 'warn',
    })

    return loggerService
  }
})()

export const reactivity = (() => {
  let reactivityService: ReactivityServiceContract
  let promise: Promise<any> | undefined

  return async () => {
    if (promise) return promise

    if (reactivityService) {
      return reactivityService
    }

    const mainConfig = config.get<Config>('main')

    promise = resolveImport(mainConfig.reactivity?.service)
      .then(Service => {
        if (!Service) {
          throw new Error('No reactivity service was bind')
        }

        return new Service()
      })

    reactivityService = await promise
    return reactivityService
  }
})()
