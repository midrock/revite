import { Generator } from '/~/core/Generator'
import camelCase from 'lodash-es/camelCase'
import upperFirst from 'lodash-es/upperFirst'

export class ListenerGenerator extends Generator {
  get files() {
    const name = upperFirst(camelCase(this.name)) + 'Listener'

    return [
      {
        name: name + '.ts',
        template: './listener/Listener',
        data: {
          className: name,
        },
      },
    ]
  }
}
