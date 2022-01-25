import url from 'url'
import path from 'path'
import fs from 'fs'
import pkg from '../package.json'

const rel = (() => {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

  return targetPath => path.join(__dirname, '..', targetPath)
})()

fs.copyFileSync(rel('src/global.d.ts'), rel('dist/global.d.ts'))
fs.copyFileSync(rel('LICENSE'), rel('dist/LICENSE'))
fs.copyFileSync(rel('README.md'), rel('dist/README.md'))
fs.copyFileSync(rel('CHANGELOG.md'), rel('dist/CHANGELOG.md'))

delete pkg.devDependencies
delete pkg.scripts
delete pkg.commitlint
delete pkg.config

fs.writeFileSync(rel('dist/package.json'), JSON.stringify(pkg, null, '  '))
