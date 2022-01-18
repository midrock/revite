export class HomeState {
  constructor(private options: {
    dashboardService: Service.Dashboard.Contract,
  }) {
  }

  get links() {
    return this.options.dashboardService.links
  }

  get widgets() {
    return this.options.dashboardService.widgets
  }
}
