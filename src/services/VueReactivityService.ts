import { shallowReactive } from 'vue'
import { ReactivityServiceContract } from '..'

export class VueReactivityService extends ReactivityServiceContract {
  makeReactive<T extends object>(target: T) {
    return shallowReactive(target) as T
  }
}
