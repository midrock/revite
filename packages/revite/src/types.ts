import { LoggerServiceContract } from './contracts/LoggerServiceContract'
import { ReactivityServiceContract } from './contracts/ReactivityServiceContract'
import { Event } from './core/Event'
import { Extension } from './core/Extension'
import { Listener } from './core/Listener'
import { Package } from './core/Package'

type ServiceProvider = import('./core/ServiceProvider').ServiceProvider
type BindContext<T extends AbstractConstructor> = import('./core/BindContext').BindContext<T>

export type AbstractConstructor = (abstract new (...args: any[]) => any) | (abstract new () => any)

export type ExtendedConstructor<T extends AbstractConstructor> = {
  new(...args: ConstructorParameters<T>): InstanceType<T>
}

export type EventConstructor = Constructor<Event>
export type ListenerConstructor = Constructor<Listener>
export type ExtensionConstructor = Constructor<Extension>
export type EventHandler<T extends DispatchedEvent> =
  FunctionEventHandler<T>
  | ListenerConstructor
  | Import<ListenerConstructor>
export type FunctionEventHandler<T extends DispatchedEvent> = ((event: T) => any)
export type ListenerWrapper = (event: Event) => any

export type DispatchedEvent = Omit<Event, 'dispatch' | 'dispatchAndWait'>

export type EventHandlerOptions<T = unknown> = {
  wait?: number
  sequential?: boolean
  onError?(event: T, error: unknown): any
}

export type Constructor<T> = {
  new(...args: any): T
}

type SourceRaw = Record<string, any>
type SourceFunction = () => (SourceRaw | Promise<SourceRaw>)

export type Source = SourceRaw | SourceFunction
export type BootstrapConfig<T> = {
  [P in keyof T]: P extends 'main' ? Config : ServiceConfig
}

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

export interface Config extends BaseConfig {
  logger?: LoggerConfig
  reactivity?: ReactivityConfig
  next?: Record<string, NextConfig>
}

export interface BaseConfig {
  preload?: (Import<Constructor<ServiceProvider>>[] | Import<Constructor<ServiceProvider>>)[]
  packages?: Import<Constructor<Package>>[]
  providers?: Import<Constructor<ServiceProvider>>[]
  config?: Record<string, ServiceConfig>
}

export type NextConfig = () => BaseConfig

interface LoggerConfig {
  service?: Constructor<LoggerServiceContract>
  level?: LogLevel
}

interface ReactivityConfig {
  service?: Import<Constructor<ReactivityServiceContract>>
}

export type Import<T = any> =
  T
  | ((...args: any[]) => Promise<{ [key: string]: T }>)
  | Promise<{ [key: string]: T }>

export interface ResolveOptions {
  loaded?: boolean
}

export interface ProviderContext {
  resolve<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T>>

  resolveIfExist<T extends AbstractConstructor>(contract: T, options?: ResolveOptions): Promise<InstanceType<T> | undefined>
}

export interface ServiceConfig<T = unknown> {
  service?: Import<Constructor<T>>
  extend?: Import<ExtensionConstructor>[]
}

export type FactoryConfig<T extends ServiceConfig> = Omit<T, 'service' | 'extend'>

export interface RegisterContext extends ProviderContext {
  on<T extends DispatchedEvent>(
    event: EventConstructor,
    listen: EventHandler<T> | EventHandler<T>[],
    options?: EventHandlerOptions,
  ): void

  config<T>(name: string): T

  bind<T extends AbstractConstructor>(contract: T): BindContext<T>
}

export interface BootContext extends ProviderContext {
  config<T>(name: string): T
}

export interface BeforeBootContext extends ProviderContext {
  config<T>(name: string): T
}

export type BindFactory<T extends AbstractConstructor> = () => InstanceType<T>
