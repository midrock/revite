import fs from 'fs'
import path from 'path'
import fse from 'fs-extra'
import pkg from 'revite/package.json' assert {type: 'json'}

const rel = (() => {
  const __dirname = path.dirname('../../packages')

  return targetPath => path.join(__dirname, targetPath)
})()

fs.copyFileSync(rel('revite/src/global.d.ts'), rel('revite/dist/global.d.ts'))
fs.copyFileSync(rel('revite/LICENSE'), rel('revite/dist/LICENSE'))
fs.copyFileSync(rel('revite/README.md'), rel('revite/dist/README.md'))
fs.copyFileSync(rel('revite/CHANGELOG.md'), rel('revite/dist/CHANGELOG.md'))

fs.copyFileSync(rel('vite-plugin/dist/vite-plugin.js'), rel('revite/plugin.js'))

fse.copySync(rel('cli/dist'), rel('revite/cli/dist'), {})
fse.copySync(rel('cli/bin'), rel('revite/cli/bin'), {})

delete pkg.devDependencies
delete pkg.scripts

fs.writeFileSync(rel('revite/dist/package.json'), JSON.stringify(pkg, null, '  '))
