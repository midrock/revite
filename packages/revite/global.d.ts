/**
 * Predefined alias for dynamic configuration loaded via the Vite plugin
 */
declare module '@revite/config' {
  type BootstrapConfig = import('revite').BootstrapConfig
  const config: BootstrapConfig

  export default config
}

declare namespace Revite {
  type Constructor<T> = import('revite').Constructor<T>
  type Import<T> = import('revite').Import<T>
  type ImportConstructor<T> = Import<Constructor<T>>
  type ServiceConfig<T> = import('revite').ServiceConfig<T>
}
