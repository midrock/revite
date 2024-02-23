import { Extension } from 'revite'

export class Test1Extension extends Extension {
  extend(service: any) {
    service.registerText('test', 'text test')
  }
}