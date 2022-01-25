/**
 * Predefined alias for dynamic configuration loaded via the Vite plugin
 */
declare module '@revite/config' {
  const config: Record<string, any>

  export default config
}

declare namespace Revite {
  type Constructor<T> = import('./types').Constructor<T>
  type Import<T> = import('./types').Import<T>
  type ImportConstructor<T> = Import<Constructor<T>>
}
