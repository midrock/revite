declare namespace Revite {
  namespace Config {
    type SourceRaw = Record<string, any>
    type SourceFunction = () => (SourceRaw | Promise<SourceRaw>)
    type Source = SourceRaw | SourceFunction

    type Sources = Record<string, Source>

    interface Bootstrap {
      providers: Config.ProviderManifest[]
      handleError?: () => (void | Promise<void>)
    }

    type ProviderManifest =
      | Revite.Import<Revite.Provider.Constructor>
  }
}

declare module '@revite/config' {
  const config: Record<string, any>

  export default config
}
