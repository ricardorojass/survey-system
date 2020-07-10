import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import authService from '../services/auth'
import { User } from '../types'

class Header extends React.Component<RouteComponentProps> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { isAuthenticated: authService.isAuthenticated() }
    authService.subscribe((_: User) => {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    })
  }

  render() {
    return (
      <header className="main">
        <div className="brand">
          <span>Survey System</span>
        </div>
        {/* Porque no se usa this.state */}
        { authService.isAuthenticated() ? <a onClick={this.logout} href="#">Logout</a> : <a onClick={this.login} href="#">Sign in</a> }
      </header>
    )
  }

  login = (e) => {
    this.props.history.push('/login')
  }

  logout = (e) => {
    e.preventDefault()

    authService.logout()
    this.props.history.push('/login')
  }
}

export default withRouter(Header)