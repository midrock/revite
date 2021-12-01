import { Task } from '../Task'

export class ProviderBeforeRegisterTask extends Task {
  async run(context: Revite.Controller, provider: Revite.ServiceProvider) {
    context.log({
      context: `BeforeRegister ${provider.label}`,
      message: 'Started',
    })

    if (provider.beforeRegister instanceof Function) {
      return provider.beforeRegister({
        config: context.config.get(provider.config),
        import(source) {
          return context.import(source)
        },
        bind(config) {
          context.ioc.bind(config)
          context.providers.linkContractToProvider(config.bind, provider)
        },
      })
    }
  }
}
