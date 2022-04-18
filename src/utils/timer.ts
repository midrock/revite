export function debounce(handler: (...args: any) => any, timeout: number) {
  let timer

  return (...args) => {
    if (!timeout) {
      return handler(...args)
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      handler(...args)
    }, timeout)
  }
}
