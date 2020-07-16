import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import authService from '../services/auth'
import surveyUIService from '../services/surveyUIService'
import { User } from '../types'

import SurveyModal from '../components/SurveyModal'

interface State {
  isAuthenticated?: boolean
}

class Header extends React.Component<RouteComponentProps, State> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { isAuthenticated: authService.isAuthenticated() }
    authService.subscribe((_: User) => {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    })
  }

  render() {
    return (
      <header className="bg-indigo-100">
        <div className="flex justify-between items-center text-indigo-700 pt-4 pb-4 px-6">
          <button onClick={this.toggleModal}>
            <img className="fill-current w-12" src="/icons/add-solid.svg"/>
          </button>
          <SurveyModal />
          <div>
            {/* <button className="bg-tomato-default hover:bg-tomato-lighter text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Button
            </button> */}
            <span className="pl-4">
              { this.state.isAuthenticated ? <a onClick={this.logout} href="#">Logout</a> : <a onClick={this.login} href="#">Sign in</a> }
            </span>
          </div>

        </div>
        {/* <div className="flex justify-center pt-4">
          <span className="px-4">Questions</span>
          <span className="px-4">Responses</span>
        </div> */}

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

  toggleModal = () => {
    surveyUIService.openModal()
  }
}

export default withRouter(Header)