declare module '@revite/config' {
  const config: Record<string, any>

  export default config
}

declare namespace Revite {
  type RegisterContext = import('./dist/types').RegisterContext
  type BootContext = import('./dist/types').BootContext
  type Constructor<T> = import('./dist/types').Constructor<T>
  type Import<T> = import('./dist/types').Import<T>
}
