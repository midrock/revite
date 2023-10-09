import { User } from '../core/User'
import { AuthServiceContract } from '../AuthServiceContract'

export class MockLoggedAuthService extends AuthServiceContract {
  get isLoggedIn() {
    return !!this.user
  }

  async fetchUser() {
    this.setUser()
  }

  private setUser() {
    const user = new User({
      first_name: 'Joe',
      last_name: 'Black',
      email: 'joe@example.com',
    })

    this.user = user
  }
}
