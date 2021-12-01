import { Task } from '../Task'

export class ProvidersCreationTask extends Task {
  async run(context: Revite.Controller) {
    context.log({
      context: 'Create Providers',
      message: 'Executing...',
    })

    const config: Revite.Config.Bootstrap = context.config.get('bootstrap')
    const tasks = config.providers.map(source => {
      return context.import(source)
        .then((resolved: Revite.Provider.Constructor) => {
          return context.providers.create(resolved)
        })
    })

    await Promise.all(tasks)
  }
}
