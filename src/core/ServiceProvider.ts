import { ProviderBootTask } from './tasks/ProviderBootTask'
import { ProviderRegisterTask } from './tasks/ProviderRegisterTask'

export abstract class ServiceProvider {
  preload = false
  config = ''

  private tasks: {
    register?: ProviderRegisterTask
    boot?: ProviderBootTask
  } = {
    register: undefined,
    boot: undefined,
  }

  get label() {
    return this.constructor.name
  }

  get mayRegister() {
    return this.register instanceof Function
  }

  get mayBoot() {
    return this.boot instanceof Function
  }

  /**
   * The provider successfully registered via `register` method.
   */
  get isRegistered() {
    const { register } = this.tasks

    if (register) {
      return register.isCompleted && !register.isFailed
    }

    return !this.mayRegister
  }

  /**
   * The provider successfully loaded via `boot` method.
   */
  get isLoaded() {
    const { boot } = this.tasks

    if (boot) {
      return boot.isCompleted && !boot.isFailed
    }

    return !this.mayBoot
  }

  /**
   * The provider has errors while registering or booting.
   */
  get isFailed() {
    const {
      register,
      boot,
    } = this.tasks

    return !!(register?.isFailed || boot?.isFailed)
  }

  beforeRegister?(ctx: Revite.Provider.RegisterContext): Promise<void>

  register?(ctx: Revite.Provider.RegisterContext): Promise<void>

  beforeBoot?(ctx: Revite.Provider.RegisterContext): Promise<void>

  boot?(ctx: Revite.Provider.BootContext): Promise<void>
}
