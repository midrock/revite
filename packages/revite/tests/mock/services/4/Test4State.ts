export class Test4State {
  constructor(private options: {
      test1Service,
    }) {
  }

  addItem(item) {
    return this.options.test1Service.addItem(item)
  }

  getItems() {
    return this.options.test1Service.getItems()
  }

  clear() {
    return this.options.test1Service.clear()
  }
}