import { reactive, shallowReactive } from 'vue'
import { ReactivityServiceContract } from 'revite'

export class VueReactivityService extends ReactivityServiceContract {
  makeReactive<T extends object>(target: T) {
    return shallowReactive(target) as T
  }

  makeDeepReactive<T extends object>(target: T): T {
    return reactive(target) as T
  }
}
