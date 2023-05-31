#!/usr/bin/env node

import { existsSync } from 'fs'
import { generateService } from './modules/service'
import { generateProvider } from './modules/provider'
import { generateListener } from './modules/listener'
import { program } from './modules/help'

program
  .name('revite')
  .command('g <type> <name> <path>')
  .description('Generates service, provider, and listener file templates.')
  .action((type: string, name: string, path: string) => {
    if (type !== 'service' && type !== 'provider' && type !== 'listener') {
      console.error(`error: Unknown type ${type}.`)
      program.help()
      process.exit(1)
    }

    if (!existsSync(path)) {
      console.error(`error: Path ${path} does not exist.`)
      program.help()
      process.exit(1)
    }

    let pathF = `${path}/${type}s`

    switch (type) {
      case 'service':
        pathF += `/${name}`
        generateService(name, pathF)
        break
      case 'provider':
        generateProvider(name, pathF)
        break
      case 'listener':
        generateListener(name, pathF)
        break
    }
  })

program.parse(process.argv)
