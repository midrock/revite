import { existsSync } from 'fs'
import { addFiles } from './writeFiles'
import { generateListenerTemplate } from './templates'

export function generateListener(name: string, path: string) {
  const words = name.split('-')
  const fileName = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')

  if (existsSync(`${path}/${fileName}Listener.ts`)) {
    console.error(`error: File ${path}/${fileName}Listener.ts already exists.`)
    process.exit(1)
  }
  const fileData = { fileName }
  const templates = generateListenerTemplate(fileData, path)

  addFiles(templates)
}
