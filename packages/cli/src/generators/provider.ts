import camelCase from 'lodash-es/camelCase'
import upperFirst from 'lodash-es/upperFirst'
import { Generator } from '/~/core/Generator'

export class ProviderGenerator extends Generator {
  get files() {
    const name = upperFirst(camelCase(this.name)) + 'Provider'

    return [
      {
        name: name + '.ts',
        template: './provider/Provider',
        data: {
          className: name,
        },
      },
    ]
  }
}
