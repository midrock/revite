import { LoggerServiceContract, resolveImport, ReactivityServiceContract } from '..'
import { LoggerService } from '../services/LoggerService'
import { config } from '../state'
import type { Config } from '..'

export const logger = (() => {
  let loggerService: LoggerServiceContract

  return () => {
    if (loggerService) {
      return loggerService
    }

    const mainConfig = config.get<Config>('main')
    const Service = mainConfig.logger?.service || LoggerService
    const forceDebug = window 
      ? new URLSearchParams(window.location.search).has('revite_debug') 
      : false

    loggerService = new Service({
      level: forceDebug ? 'debug' : (mainConfig.logger?.level || 'warn'),
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
