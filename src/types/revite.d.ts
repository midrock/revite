/* eslint-disable @typescript-eslint/ban-types */

declare namespace Revite {
  type Controller = import('../ReviteController').ReviteController
  type AbstractConstructor<T = any> = Function & { prototype: T }
  type Constructor<T, R = any> = Function & {
    new(arg?: R): T
    prototype: T
  }

  type Import<T = any> =
    T
    | (() => Promise<{ [key: string]: T }>)
    | Promise<{
    [key: string]: T | any
  }>
}

declare const revite: Revite.Controller

interface Window {
  revite: Revite.Controller
}
