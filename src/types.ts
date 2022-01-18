import { LoggerServiceContract } from './contracts/LoggerServiceContract'
import { ReactivityServiceContract } from './contracts/ReactivityServiceContract'
import { Event } from './core/Event'
import { Listener } from './core/Listener'

type ServiceProvider = import('./core/ServiceProvider').ServiceProvider
type BindContext<T> = import('./core/BindContext').BindContext<T>

export type AbstractConstructor = abstract new (...args: any[]) => any

export type ExtendedConstructor<T extends AbstractConstructor> = {
  new(...args: ConstructorParameters<T>): T
}

export type EventConstructor = Constructor<Event>
export type ListenerConstructor = Constructor<Listener>

export type Constructor<T> = {
  new(...args: any): T
}

type SourceRaw = Record<string, any>
type SourceFunction = () => (SourceRaw | Promise<SourceRaw>)
type Source = SourceRaw | SourceFunction

export type Sources = Record<string, Source>

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogOptions {
  level?: LogLevel
  message?: string
  context?: string
  color?: string
  args?: any[]
}

export interface LogGroupOptions {
  message: string
  entry: () => void
  level?: LogLevel
  context?: string
  collapsed?: boolean
}

export interface Config {
  logger?: LoggerConfig
  reactivity?: ReactivityConfig
  providers: (Import<Constructor<ServiceProvider>>)[]
  config?: Record<string, any>
}

interface LoggerConfig {
  service?: Constructor<LoggerServiceContract>
  level?: LogLevel
}

interface ReactivityConfig {
  service?: Constructor<ReactivityServiceContract>
}

export type Import<T = any> =
  T
  | (() => Promise<{ [key: string]: T }>)
  | Promise<{ [key: string]: T }>

export interface ResolveOptions {
  loaded?: boolean
}

export interface ProviderContext {
  resolve<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T>>

  resolveIfExist<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T> | undefined>
}

export interface RegisterContext extends ProviderContext {
  on(event: EventConstructor, listen: ListenerConstructor | ListenerConstructor[]): void

  config<T>(name: string): T

  bind<T extends AbstractConstructor>(contract: T): BindContext<T>
}

export interface BeforeBootContext extends ProviderContext {
  config<T>(name: string): T
}

export type BootContext = ProviderContext
export type BindFactory<T> = () => T
