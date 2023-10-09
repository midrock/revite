import camelCase from 'lodash-es/camelCase'
import upperFirst from 'lodash-es/upperFirst'
import { Generator } from '/~/core/Generator'
  
export class EventGenerator extends Generator {
  get files() {
    const name = upperFirst(camelCase(this.name)) + 'Event'

    return [
      {
        name: name + '.ts',
        template: './event/Event',
        data: {
          className: name,
        },
      },
    ]
  }
}
