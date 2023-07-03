import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

interface FileInfo {
  name: string
  path?: string
  template: string
  data?: Record<string, string>
}

export abstract class Generator {
  abstract files: FileInfo[]

  constructor(
    public name: string,
    public path: string,
  ) {

  }

  async generate() {
    return Promise.all(this.files.map(file => this.generateFile(file)))
  }

  generateFile(file: FileInfo) {
    const templatePath = path.join(__dirname, file.template)
    const targetPath = path.join(process.cwd(), this.path, file.path || '', file.name)

    if (fs.existsSync(targetPath)) {
      console.warn(`${file.name} already exists [skipped]`)
      return
    }

    const data = file.data || {}
    let templateContent = fs.readFileSync(templatePath, 'utf-8')

    for (const [key, value] of Object.entries(data)) {
      templateContent = templateContent.replace(new RegExp(`<%= ${key} %>`, 'g'), value)
    }

    return fse.outputFile(targetPath, templateContent)
  }
}
