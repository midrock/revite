import { Package } from 'revite'

export class TestPackage extends Package {
  providers = [
    import('./Test1ServiceProvider'),
    import('./Test2ServiceProvider'),
  ]
}