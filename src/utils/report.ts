import { providers } from '../state'
import { ServiceProvider } from '../core/ServiceProvider'

export interface ProviderReport {
  name: string
  error?: Error
  isLoaded: boolean
}

export function getReport() {
  const providersRegistry = providers.getRegistry()
  const providersReport: ProviderReport[] = []

  for (const providerName of providersRegistry.keys()) {
    const status = providersRegistry.get(providerName)

    providersReport.push({
      name: providerName,
      error: status instanceof ServiceProvider ? status.error : undefined,
      isLoaded: status === true,
    })
  }

  return {
    providers: providersReport.sort((a, b) => {
      return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)
    }),
  }
}
