import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import authService from '../services/auth'
import surveyUIService from '../services/surveyUIService'
import { User } from '../types'

import ShareModal from './ShareModal'

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

    return (
      <header className="bg-indigo-100">
      <div className="flex justify-between items-center text-indigo-700 pt-4 pb-4 px-6">
        <span className="text-2xl text-center">Edit your survey</span>

        <div>
          <button
            className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4"
            onClick={this.showShareModal}>
            Share
          </button>
          <ShareModal />
          <span className="pl-4">
            { isAuthenticated ? <a onClick={this.logout} href="#">Logout</a> : <a onClick={this.login} href="#">Sign in</a> }
          </span>
        </div>
      </div>
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

  showShareModal = () => {
    surveyUIService.openShareModal()
  }

}

export default withRouter(Header)