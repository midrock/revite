export abstract class ReactivityServiceContract {
  abstract makeReactive<T extends object>(target: T): T
}
