import { ProviderBootTask } from '../tasks/ProviderBootTask'
import { ProviderRegisterTask } from '../tasks/ProviderRegisterTask'
import { BeforeBootContext, BootContext, RegisterContext } from '../types'

export abstract class ServiceProvider {
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

  get mayBeforeBoot() {
    return this.beforeBoot instanceof Function
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

  get error() {
    const { register, boot } = this.tasks

    return register?.error || boot?.error
  }

  /**
   * The provider has errors while registering or booting.
   */
  get isFailed() {
    const { register, boot } = this.tasks

    return !!(register?.isFailed || boot?.isFailed)
  }

  getRegisterTask() {
    return this.tasks.register
  }

  setRegisterTask(task: ProviderRegisterTask) {
    if (this.tasks.register) {
      throw new Error('The register task already exist')
    }

    this.tasks.register = task
  }

  getBootTask() {
    return this.tasks.boot
  }

  setBootTask(task: ProviderBootTask) {
    if (this.tasks.boot) {
      throw new Error('The boot task already exist')
    }

    this.tasks.boot = task
  }

  dispose() {
    this.tasks.boot = undefined
    this.tasks.register = undefined
  }

  register?(ctx: RegisterContext): void

  beforeBoot?(ctx: BeforeBootContext): (void | Promise<void>)

  boot?(ctx: BootContext): (void | Promise<void>)
}
