function flatArrayTo<T>(source: (T | T[])[], target: T[]) {
  for (const arrayItem of source) {
    if (arrayItem instanceof Array) {
      flatArrayTo(arrayItem, target)
    } else {
      target.push(arrayItem)
    }
  }
}

export function flatten<T>(array: (T | T[])[]): T[] {
  const result: any[] = []

  flatArrayTo(array, result)

  return result
}
