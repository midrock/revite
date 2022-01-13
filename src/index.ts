import { Config } from './types'

export { ServiceProvider } from './core/ServiceProvider'
export { Event } from './core/Event'
export { Listener } from './core/Listener'
export { LoggerServiceContract } from './contracts/LoggerServiceContract'
export { ReactivityServiceContract } from './contracts/ReactivityServiceContract'
export { revite } from './state'

export function defineConfig(config: Config) {
  return config
}

export type {
  RegisterContext,
  BootContext,
  Config,
} from './types'
