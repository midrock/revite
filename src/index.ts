import { ReviteController } from './ReviteController'

const revite = new ReviteController()

window.revite = revite

export default {
  revite,
}

export { ServiceProvider } from './core/ServiceProvider'
export { Event } from './core/Event'
export { Listener } from './core/Listener'

export { LoggerServiceContract } from './services/logger/LoggerServiceContract'
