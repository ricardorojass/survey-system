import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import authService from '../services/auth'
import { User } from '../types'


interface State {
  isAuthenticated?: boolean
}

class Header extends React.Component<RouteComponentProps, State> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      isAuthenticated: authService.isAuthenticated()
    }
    authService.subscribe((_: User) => {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    })
  }

  render() {
    const { isAuthenticated} = this.state

    if (isAuthenticated) {
      return (
        <header className="bg-white">
          <div className="flex justify-between items-center text-indigo-700 pt-4 pb-4 px-6">
            <div className="text-2xl">Zurveys.xyz</div>
            <div>
              <span className="pl-4">
                { this.state.isAuthenticated ? <a onClick={this.logout} href="#">Logout</a> : <a onClick={this.login} href="#">Sign in</a> }
              </span>
            </div>
          </div>
        </header>
      )
    }

    return ( null )
    // TODO: Return default UI
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