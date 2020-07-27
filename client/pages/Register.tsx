import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import authService from '../services/auth'
import { User } from '../types' 

interface State {
  name?: string,
  email?: string,
  password?: string,
  error?: any
}

class Register extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { name: '', email: '', password: '', error: null }
    this.goToLogin = this.goToLogin.bind(this)
  }

  render() {
    return (
      <div className="auth-page">
        <div className="flex items-center justify-center w-1/3">
          <div className="w-4/5">
            <form onSubmit={this.register}>
              <h1 className="text-2xl">Sign up</h1>
              <p className="text-sm pb-3">or <a className="text-blue-500 cursor-pointer" onClick={ this.goToLogin }>sign in to your account</a></p> 
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  onChange={e => this.updateField({ name: e.target.value })} />
              </div>
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
                <button className="btn btn-primary btn-block" type="submit">Sign up</button>
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

  register = async (e) => {
    e.preventDefault()
    try {
      const { name, email, password } = this.state
      
      const data: User = { name, email, password }
      await authService.signup(data)
      this.props.history.push('/surveys')
    } catch (e) {
      console.log(e)      
    }
  }

  goToLogin(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
}

export default withRouter(Register)