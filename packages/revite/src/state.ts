import { ServicesRegistry } from './core/ServicesRegistry'
import { ConfigRegistry } from './core/ConfigRegistry'
import { ProvidersRegistry } from './core/ProvidersRegistry'
import { ReviteController } from './core/ReviteController'
import { EventsRegistry } from './core/EventsRegistry'

export const config = new ConfigRegistry()
export const services = new ServicesRegistry()
export const providers = new ProvidersRegistry()
export const revite = new ReviteController()
export const events = new EventsRegistry()
