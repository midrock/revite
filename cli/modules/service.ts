import { existsSync, mkdirSync } from 'fs'
import { addFiles } from './writeFiles'
import { generateServiceTemplate } from './templates'

export function generateService(name: string, path: string) {
  if (existsSync(path)) {
    console.error(`Error: A directory with this name ${name} already exists.`)
    process.exit(1)
  }

  mkdirSync(path)
  mkdirSync(`${path}/versions`)
  const words = name.split('-')
  const fileName = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')

  const fileData = {
    fileName,
    constFileName: fileName.charAt(0).toLowerCase() + fileName.slice(1) + 'Service',
  }
  const templates = generateServiceTemplate(fileData, path)

  addFiles(templates)
}
