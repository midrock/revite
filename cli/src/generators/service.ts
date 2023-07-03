import { Generator } from '/~/core/Generator'
import camelCase from 'lodash-es/camelCase'
import upperFirst from 'lodash-es/upperFirst'
import kebabCase from 'lodash-es/kebabCase'

export class ServiceGenerator extends Generator {
  get files() {
    const dirName = kebabCase(this.name)
    const name = upperFirst(camelCase(this.name))

    const data = {
      name,
      configName: dirName,
      contractName: name + 'ServiceContract',
      providerName: name + 'ServiceProvider',
      serviceName: name + 'Service',
    }

    return [
      {
        name: 'index.ts',
        template: './service/index',
        data,
        path: dirName,
      },
      {
        name: data.providerName + '.ts',
        template: './service/ServiceProvider',
        data,
        path: dirName,
      },
      {
        name: data.contractName + '.ts',
        template: './service/ServiceContract',
        data,
        path: dirName,
      },
      {
        name: data.serviceName + '.ts',
        template: './service/Service',
        path: dirName + '/versions',
        data,
      },
      {
        name: 'types.d.ts',
        template: './service/types',
        data,
        path: dirName,
      },
    ]
  }
}
