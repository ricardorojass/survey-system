import Store from '../store'
import axios from '../axios'
import { User } from '../types'

const USER_URI = '/me'
const SIGNUP_URI = '/signup'
const LOGIN_URI = '/login'

function getNullUser() {
  return { firstName: null, lastName: null, email: null, token: null, loaded: false }
}

class AuthService extends Store<User> {
  async loadUser() {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        await this._doLoadUser(token)
      } catch (e) {
        console.log(e)
        localStorage.removeItem("token")
        this.setState({ token: null, loaded: true })
      }
    } else {
      this.setState({ ...this.getState(), loaded: true })
    }
  }

  async _doLoadUser(token: string) {
    const response = await axios.get(USER_URI)
    const { name, email } = response.data
    this.setState({ name, email, token, loaded: true })
  }

  async signup(user: User) {
    const response = await axios.post(SIGNUP_URI, user)
    
    const { token } = response.data
    localStorage.setItem("token", token)
    this.setState({ name: user.name, email: user.email, token, loaded: true })
  }

  async login(emailArg: string, password: string) {
    const response = await axios.post(LOGIN_URI, { email: emailArg, password })

    const { name, email, token } = response.data
    localStorage.setItem("token", token)
    this.setState({ name, email, token, loaded: true })
  }

  logout() {
    localStorage.removeItem("token")
    this.setState(getNullUser())
  }

  isAuthenticated() {
    return this.state.token != null
  }
}

export default new AuthService(getNullUser())
