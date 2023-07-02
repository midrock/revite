import { readFileSync } from 'fs'
import * as path from 'path'

export function generateServiceTemplate(fileData: Record<string, any>, path:string) {
  const templates = [
    {
      pathFileName: `${path}/index.ts`,
      templatePath: '../../templates/service/index',
      content: '',
    },
    {
      pathFileName: `${path}/${fileData.fileName}ServiceProvider.ts`,
      templatePath: '../../templates/service/ServiceProvider',
      content: '',
    },
    {
      pathFileName: `${path}/${fileData.fileName}ServiceContract.ts`,
      templatePath: '../../templates/service/ServiceContract',
      content: '',
    },
    {
      pathFileName: `${path}/types.d.ts`,
      templatePath: '../../templates/service/types',
      content: '',
    },
    {
      pathFileName: `${path}/versions/${fileData.fileName}Service.ts`,
      templatePath: '../../templates/service/Service',
      content: '',
    },
  ]

  for (let i = 0; i < templates.length; i++) {
    templates[i].content = getContentTemplate(templates[i], fileData)
  }

  return templates
}

export function generateProviderTemplate(fileData: Record<string, any>, path:string) {
  const templates = [
    {
      pathFileName: `${path}/${fileData.fileName}Provider.ts`,
      templatePath: '../../templates/provider/Provider',
      content: '',
    },
  ]

  for (let i = 0; i < templates.length; i++) {
    templates[i].content = getContentTemplate(templates[i], fileData)
  }

  return templates
}

export function generateListenerTemplate(fileData: Record<string, any>, path:string) {
  const templates = [
    {
      pathFileName: `${path}/${fileData.fileName}Listener.ts`,
      templatePath: '../../templates/listener/Listener',
      content: '',
    },
  ]

  for (let i = 0; i < templates.length; i++) {
    templates[i].content = getContentTemplate(templates[i], fileData)
  }

  return templates
}

function getContentTemplate(template: Record<string, any>, fileData: Record<string, any>): string {
  const templateFilePath = path.join(__dirname, template.templatePath)
  let templateContent = readFileSync(templateFilePath, 'utf-8')

  for (const [key, value] of Object.entries(fileData)) {
    const placeholder = `<%= ${key} %>`

    templateContent = templateContent.replace(new RegExp(placeholder, 'g'), value)
  }

  return templateContent
}
