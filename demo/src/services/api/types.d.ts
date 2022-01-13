declare namespace Service {
  namespace Api {
    type Contract = import('./ApiServiceContract').ApiServiceContract

    interface Config {
      service: Revite.Constructor<Contract>
    }
  }
}
