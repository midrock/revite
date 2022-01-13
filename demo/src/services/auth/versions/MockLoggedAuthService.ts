import { User } from '../core/User'
import { AuthServiceContract } from '../AuthServiceContract'

export class MockLoggedAuthService extends AuthServiceContract {
  user!: User

  get isLoggedIn() {
    return !!this.user
  }

  async fetchUser() {
    this.setUser()
  }

  async signIn(request) {
    this.setUser()
  }

  async signUp(request, token) {
    this.setUser()
  }

  private setUser() {
    const user = new User({
      first_name: 'Roman',
      last_name: 'Ivanov',
      email: 'iteam4u@ya.ru',
    })

    this.user = user
  }
}
