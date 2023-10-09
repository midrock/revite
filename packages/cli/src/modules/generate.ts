import { EventGenerator } from '/~/generators/event'
import { ListenerGenerator } from '/~/generators/listener'
import { ProviderGenerator } from '/~/generators/provider'
import { ServiceGenerator } from '/~/generators/service'

export const generatorTypes = {
  listener: ListenerGenerator,
  service: ServiceGenerator,
  provider: ProviderGenerator,
  event: EventGenerator,
}

export function main(args: string[]) {
  const [type, name, path] = args
  const Generator = generatorTypes[type]

  if (!type) {
    return console.error(`Generator ${type} does not exists`)
  }

  if (!name) {
    return console.error('Generator executed with empty name')
  }

  if (!path) {
    return console.error('Generator executed with empty path')
  }

  try {
    new Generator(name, path).generate()
  } catch (e) {
    const error = e as Error

    console.error(`Failed to generate ${type}`)
    console.error(error.message)
  }
}

export function help() {
  console.info(`
  g <type> <name> <path>
    description:
      This utility allows you to generate revite entities
    type:
      service
      provider
      listener
      event
    name: 
      any string
    path:   
      path where files will be created
    example:
      revite g service api src/services
  `)
}
