declare namespace Service {
  namespace Render {
    type Contract = import('./RenderServiceContract').RenderServiceContract

    interface Config {
      service: Revite.ImportConstructor<Contract>
      enhanceApp?: (renderService: Contract) => (void | Promise<void>)
    }
  }
}
