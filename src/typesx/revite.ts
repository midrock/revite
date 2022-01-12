/* eslint-disable @typescript-eslint/ban-typesx */

declare namespace Revite {
  type Controller = import('../core/ReviteController').ReviteController
  type AbstractConstructor<T = any> = Function & { prototype: T }
  type Constructor<T, R = any> = Function & {
    new(arg?: R): T
    prototype: T
  }

  type Import<T = any> =
    T
    | (() => Promise<{ [key: string]: T }>)
    | Promise<{ [key: string]: T }>

  type ServiceProvider = import('../core/ServiceProvider').ServiceProvider
  type Event = import('../core/Event').Event
  type Listener = import('../core/Listener').Listener
}

declare const revite: Revite.Controller

interface Window {
  revite: Revite.Controller
}
