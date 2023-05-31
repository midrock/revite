import { LoggerServiceContract, ReactivityServiceContract } from '../'
import { services } from '../state'

export const logger = (() => {
  let loggerService: LoggerServiceContract

  return () => {
    if (!loggerService) {
      loggerService = services.get(LoggerServiceContract)
    }

    return loggerService
  }
})()

export const reactivity = (() => {
  let reactivityService: ReactivityServiceContract

  return () => {
    if (!reactivityService) {
      reactivityService = services.get(ReactivityServiceContract)
    }

    return reactivityService
  }
})()

export async function ensureReactivityReady() {
  return services.resolve(ReactivityServiceContract)
}
