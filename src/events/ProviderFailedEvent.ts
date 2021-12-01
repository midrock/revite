import { Event } from '/~/core/revite'

export class ProviderFailedEvent extends Event {
  providerName: string

  constructor(provider: Revite.ServiceProvider) {
    super()
    this.providerName = provider.name
  }
}
