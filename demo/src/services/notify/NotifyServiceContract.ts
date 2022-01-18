export abstract class NotifyServiceContract {
  items: Service.Notify.Item[] = []

  abstract show(
    params: Service.Notify.DisplayOptions | string,
  ): Service.Notify.Item

  abstract removeItem(itemId: string): void

  abstract clear(): void
}
