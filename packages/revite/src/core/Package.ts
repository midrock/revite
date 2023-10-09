import { Constructor, Import } from '../types'
import { ServiceProvider } from './ServiceProvider'

export abstract class Package {
  abstract providers: Import<Constructor<ServiceProvider>>[]
}
  
