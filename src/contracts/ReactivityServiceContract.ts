export abstract class ReactivityServiceContract {
  abstract makeReactive<T extends object>(target: T): T

  abstract makeDeepReactive<T extends object>(target: T): T
}
