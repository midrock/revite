import { ConfigRegistry } from './core/ConfigRegistry'
import { EventsRegistry } from './core/EventsRegistry'
import { ProvidersRegistry } from './core/ProvidersRegistry'
import { ReviteController } from './core/ReviteController'
import { ServicesRegistry } from './core/ServicesRegistry'

export const config = new ConfigRegistry()
export const services = new ServicesRegistry()
export const providers = new ProvidersRegistry()
export const revite = new ReviteController()
export const events = new EventsRegistry()


setTimeout(() => {
  console.log(config)
}, 3000)