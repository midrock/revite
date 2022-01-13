import { Import, Sources } from '../types'

export function getImportsByFileNames(configSource?: Sources) {
  const parseResult: Record<string, any> = {}

  for (const path in configSource) {
    const fileName = path.split('/').pop()?.replace(/\..+$/, '')

    if (fileName) {
      parseResult[fileName] = resolveModule(configSource[path])
    }
  }

  return parseResult
}

export function resolveModule(module: Record<string, any>) {
  const importKey = Object.keys(module)[0]

  return module.default || module[importKey] || module
}

export async function resolveImport<T = any>(source: Import<T>): Promise<any> {
  let module: any

  if (source instanceof Function) {
    try {
      module = await source()
    } catch (error) {
      return source
    }
  } else if (source instanceof Promise) {
    module = await source
  } else {
    return source
  }

  if (module) {
    return resolveModule(module)
  }
}
