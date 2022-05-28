export function debounce(handler: (...args: any) => any, timeout: number) {
  let dispose: undefined | (() => void)

  return (...args) => {
    return new Promise<void>((resolve, reject) => {
      if (dispose) {
        dispose()
      }

      const timer = setTimeout(() => {
        toPromise(handler, ...args)
          .then(resolve)
          .catch(reject)
      }, timeout)

      dispose = () => {
        clearTimeout(timer)
        resolve()
      }
    })
  }
}

async function toPromise(handler: ((...args: any) => any), ...args) {
  return handler(...args)
}
