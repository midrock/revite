import fs from 'fs'
import path from 'path'
import url from 'url'
import fse from 'fs-extra'
import revitePackageJson from '../package.json' assert {type: 'json'}

const BASE_DIR = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../../..')

console.log(BASE_DIR)

/**
 * @param {string} from
 * @param {string} to
 */
function copy(from, to) {
  if (!fs.existsSync(path.join(BASE_DIR, from))) return

  fse.copySync(path.join(BASE_DIR, from), path.join(BASE_DIR, to))
}

copy('packages/revite/global.d.ts', 'packages/revite/dist/global.d.ts')
copy('LICENSE', 'packages/revite/dist/LICENSE')
copy('README.md', 'packages/revite/dist/README.md')
copy('packages/revite/CHANGELOG.md', 'packages/revite/dist/CHANGELOG.md')
copy('packages/vite-plugin/dist/plugin.js', 'packages/revite/dist/plugin.js')
copy('packages/vite-plugin/dist/plugin.d.ts', 'packages/revite/dist/plugin.d.ts')
copy('packages/cli/dist', 'packages/revite/dist/cli/dist')
copy('packages/cli/bin', 'packages/revite/dist/cli/bin')

delete revitePackageJson.devDependencies
delete revitePackageJson.scripts

revitePackageJson.bin = {
  revite: './cli/bin/revite',
}

fs.writeFileSync(
  path.join(BASE_DIR, 'packages/revite/dist/package.json'),
  JSON.stringify(revitePackageJson, null, '  '),
)
