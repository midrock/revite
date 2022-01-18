import { ioc } from '../state'
import { LoggerServiceContract, ReactivityServiceContract } from '../'

export const logger = (() => {
  let loggerService: LoggerServiceContract

  return () => {
    if (!loggerService) {
      loggerService = ioc.container.get(LoggerServiceContract)
    }

    return loggerService
  }
})()

export const reactivity = (() => {
  let reactivityService: ReactivityServiceContract

  return () => {
    if (!reactivityService) {
      reactivityService = ioc.container.get(ReactivityServiceContract)
    }

    return reactivityService
  }
})()
