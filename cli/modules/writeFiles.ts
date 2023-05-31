import { writeFile } from 'fs'

export function addFiles(templates): void {
  for (let i = 0; i < templates.length; i++) {
    writeFile(templates[i].pathFileName, templates[i].content, (err) => {
      if (err) {
        console.error(`error: while creating file ${templates[i].pathFileName}: ${err}`)
      } else {
        console.log(`file ${templates[i].pathFileName} was created successfully.`)
      }
    })
  }
}
