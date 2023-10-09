export class DashboardService {
  private content: {
    links: Service.Dashboard.Link[]
    widgets: Service.Dashboard.Widget[]
  } = {
      links: [],
      widgets: [],
    }

  get links() {
    return this.content.links.sort((a, b) => {
      return a.order - b.order
    })
  }

  get widgets() {
    return this.content.widgets.sort((a, b) => {
      return a.order - b.order
    })
  }

  registerLink(link: Service.Dashboard.Link) {
    this.content.links.push(link)
  }

  registerWidget(widget: Service.Dashboard.Widget) {
    this.content.widgets.push(widget)
  }
}
