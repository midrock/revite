import fs from 'fs'
import path from 'path'
import url from 'url'
import fse from 'fs-extra'

const BASE_DIR = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../../..')

/**
 * @param {string} from
 * @param {string} to
 */
function copy(from, to) {
  if (!fs.existsSync(path.join(BASE_DIR, from))) return

  fse.copySync(path.join(BASE_DIR, from), path.join(BASE_DIR, to))
}

copy('LICENSE', 'packages/revite/LICENSE')
copy('README.md', 'packages/revite/README.md')
copy('packages/vite-plugin/dist/plugin.js', 'packages/revite/plugin/vite/index.js')
copy('packages/vite-plugin/dist/plugin.d.ts', 'packages/revite/plugin/vite/index.d.ts')
copy('packages/cli/dist', 'packages/revite/dist/cli/dist')
copy('packages/cli/bin', 'packages/revite/dist/cli/bin')
