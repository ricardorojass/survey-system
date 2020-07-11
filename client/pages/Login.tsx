import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import authService from '../services/auth'

interface State {
  email?: string,
  password?: string,
  error?: any
}

class Login extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { email: '', password: '', error: null }
    this.goToCreateAccount = this.goToCreateAccount.bind(this)
  }

  render() {
    return (
      <div className="auth-page">
        <div className="flex items-center justify-center w-1/3">
          <div className="w-4/5">
            <form onSubmit={this.login}>
              <h1>Sign in</h1>
              <p>or <a onClick={ this.goToCreateAccount }>create account</a></p> 
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={e => this.updateField({ email: e.target.value })} />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={e => this.updateField({ password: e.target.value })} />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary btn-block" type="submit">Sign in</button>
              </div>
            </form>
          </div>

        </div>
        <div className="w-2/3 landing-pattern"></div>
      </div>
    )
  }

  updateField(newState: State) {
    this.setState({ ...newState, error: false })
  }

  login = async (e) => {
    e.preventDefault()
    try {
      const { email, password } = this.state
      await authService.login(email, password)

      this.props.history.push(`/surveys`)
    } catch (e) {
      console.log(e)

      if (e.response && e.response.status == 401) {
        this.setState({ error: 'Wrong email or password. Try again.' })
      } else {
        this.setState({ error: e.message })
      }
      
    }
  }

  goToCreateAccount(e) {
    e.preventDefault()
    
    this.props.history.push('/register')
  }
}

export default withRouter(Login)
