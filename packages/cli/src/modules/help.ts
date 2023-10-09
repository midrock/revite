import { modules } from '..'

export function main() {
  console.info('REVITE CLIENT\nDetailed usage:')

  Object.keys(modules).forEach(key => {
    const module = modules[key]

    if (module.help instanceof Function) {
      module.help()
    }
  })
}
