declare namespace Revite {

  namespace Ioc {

    interface BindOptions<T = any, O = any> {
      bind: Revite.AbstractConstructor<any>
      to?: Revite.Constructor<T, O> | Revite.Import
      factory?: Factory<T, O> | AsyncFactory<T, O>
      scope?: import('typescript-ioc').Scope
    }

    interface BindSyncOptions<T, O> {
      bind: Revite.AbstractConstructor<T>
      to: Revite.Constructor<T>
      factory?: any
      singleton?: boolean
      /**
       * Additional parameters to be passed to class constructor
       */
      withParams?: O | (() => O);
    }

    interface Options {
      bind: any;
      /**
       * Target class that will be instantiated to satisfy the binding
       */
      to?: any;
      /**
       * A factory method used to create instance for this binding
       */
    }

  }
}
