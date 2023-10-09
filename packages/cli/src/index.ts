#!/usr/bin/env node

import * as generate from './modules/generate'
import * as help from './modules/help'

export const modules = {
  g: generate,
}

async function main() {
  process.on('uncaughtException', emitError)
  process.on('unhandledRejection', emitError)

  const args = process.argv.slice(2, process.argv.length)
  const moduleName = args.shift() || ''
  const module = modules[moduleName]

  if (module && module.main instanceof Function) {
    return module.main(args)
  }

  return help.main()
}

main().catch(emitError)

function emitError(error) {
  console.error(error)
  process.exit(1)
}
