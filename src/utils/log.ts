import { ioc } from '../state'
import { LoggerServiceContract } from '../'

export const logger = (() => {
  let loggerService: LoggerServiceContract

  return () => {
    if (!loggerService) {
      loggerService = ioc.get(LoggerServiceContract)
    }

    return loggerService
  }
})()
