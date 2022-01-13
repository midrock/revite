import { Plugin } from 'vite'

interface PluginOptions {
  root: string
  use: Record<string, boolean>
}

export default function(options: PluginOptions): Plugin {
  const virtualFileId = '@revite/config'

  if (!options.root) {
    throw new Error('Revite Plugin: root directory with configurations should be defined')
  }

  if (!options.use || Object.keys(options.use).length === 0) {
    throw new Error('Revite Plugin: root directory with configurations should be defined')
  }

  const targetConfig = Object.keys(options.use).find(key => {
    return !!options.use[key]
  })

  if (!targetConfig) {
    throw new Error('Revite Plugin: no active config was found')
  }

  return {
    name: 'revite-plugin',
    resolveId(id) {
      if (id === virtualFileId) {
        return virtualFileId
      }
    },
    load(id) {
      if (id === virtualFileId) {
        const path = [options.root, targetConfig, '*.ts'].filter(v => v).join('/')

        return `
          const config = import.meta.globEager("${path}")
          export default config
        `
      }
    },
  }
}
