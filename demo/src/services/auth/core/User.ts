export class User {
  constructor(private raw: Service.Auth.UserRaw) {
  }

  get firstName() {
    return this.raw.first_name || ''
  }

  get lastName() {
    return this.raw.last_name || ''
  }

  get email() {
    return this.raw.email || ''
  }
}
