import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import authService from '../services/auth'
import surveyUIService from '../services/surveyUIService'
import { User } from '../types'

import SurveyModal from '../components/SurveyModal'
import ShareModal from '../components/ShareModal'

interface State {
  isAuthenticated?: boolean,
  isSurveysListView?: boolean
}

class Header extends React.Component<RouteComponentProps, State> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      isAuthenticated: authService.isAuthenticated(),
      isSurveysListView: this.isSurveyListView()
    }
    authService.subscribe((_: User) => {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    })
  }

  render() {
    return (
      <header className="bg-indigo-100">
        <div className="flex justify-between items-center text-indigo-700 pt-4 pb-4 px-6">
          { 
            this.state.isSurveysListView 
              ? 
              <button onClick={this.toggleModal}>
                <img className="fill-current w-12" src="/icons/add-solid.svg"/>
              </button>
              :
              <span className="text-2xl text-center">Edit your survey</span>
          }
          <SurveyModal />
          <div>
            {
              this.state.isSurveysListView
                ?
                null
                :
                <button
                  className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4"
                  onClick={this.showShareModal}>
                  Share
                </button>
            }
            <ShareModal />
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
    surveyUIService.openSurveyModal()
  }

  showShareModal = () => {
    surveyUIService.openShareModal()
  }

  isSurveyListView(): boolean {
    const urlLength = this.props.location.pathname.split('/').length
    const doesContainOnlySurveys = this.props.location.pathname.split('/')[1] === 'surveys'
    return urlLength === 2 && doesContainOnlySurveys
  }

}

export default withRouter(Header)