import { reactive } from 'vue'
import { ReactivityServiceContract } from '../contracts/ReactivityServiceContract'

export class VueReactivityService extends ReactivityServiceContract {
  makeReactive<T extends object>(target: T) {
    return reactive(target) as T
  }
}
