declare namespace Revite {
  namespace Config {
    type SourceRaw = Record<string, any>
    type SourceFunction = () => (SourceRaw | Promise<SourceRaw>)
    type Source = SourceRaw | SourceFunction

    type Sources = Record<string, Source>

    interface Main {
      logger?: LoggerConfig
      providers: Config.ProviderManifest[]
    }

    interface LoggerConfig {
      service?: Revite.Constructor<import('revite').LoggerServiceContract>
      level?: string
    }

    type ProviderManifest =
      | Revite.Import<Revite.Provider.Constructor>
  }
}

declare module 'revite/config' {
  const config: Record<string, any>

  export default config
}
