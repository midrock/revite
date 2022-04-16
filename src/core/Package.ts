import { ServiceProvider } from './ServiceProvider'
import { Constructor, Import } from '../types'

export abstract class Package {
  abstract providers: Import<Constructor<ServiceProvider>>[]
}
