import { reactive } from 'vue'
import { NotifyServiceContract } from '../index'

export class NotifyService extends NotifyServiceContract {
  items: Service.Notify.Item[] = reactive([])

  private config = {
    max: 10,
    duration: 3000,
  }

  show(params: Service.Notify.DisplayOptions) {
    const item: Service.Notify.Item = {
      id: String(Date.now()),
      title: params.title,
      text: params.text,
      type: params.type || 'info',
    }

    setTimeout(() => {
      this.removeItem(item.id)
    }, this.config.duration)

    this.items.unshift(item)

    return item
  }

  removeItem(itemId: string) {
    const idx = this.items.findIndex(item => item.id === itemId)

    if (idx >= 0) {
      this.items.splice(idx, 1)
    }
  }

  clear() {
    this.items.length = 0
  }
}
