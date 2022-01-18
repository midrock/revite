declare module '@revite/config' {
  const config: Record<string, any>

  export default config
}

declare namespace Revite {
  type Constructor<T> = import('./dist/types').Constructor<T>
  type Import<T> = import('./dist/types').Import<T>
  type ImportConstructor<T> = Import<Constructor<T>>
}
