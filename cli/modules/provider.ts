import { existsSync } from 'fs'
import { addFiles } from './writeFiles'
import { generateProviderTemplate } from './templates'

export function generateProvider(name: string, path: string) {
  const words = name.split('-')
  const fileName = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')

  if (existsSync(`${path}/${fileName}Provider.ts`)) {
    console.error(`error: File ${path}/${fileName}Provider.ts already exists.`)
    process.exit(1)
  }
  const fileData = { fileName }
  const templates = generateProviderTemplate(fileData, path)

  addFiles(templates)
}
