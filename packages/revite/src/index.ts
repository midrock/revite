import { Config } from './types'

export { ServiceProvider } from './core/ServiceProvider'
export { Package } from './core/Package'
export { Event } from './core/Event'
export { Listener } from './core/Listener'
export { Extension } from './core/Extension'
export { LoggerServiceContract } from './contracts/LoggerServiceContract'
export { ReactivityServiceContract } from './contracts/ReactivityServiceContract'
export { revite } from './state'

export function defineConfig(config: Config) {
  return config
}

export {
  resolveImport,
} from './utils/import'

export type {
  Constructor,
  RegisterContext,
  BootContext,
  BeforeBootContext,
  Config,
  Import,
  ServiceConfig,
} from './types'
