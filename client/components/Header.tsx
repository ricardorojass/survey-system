import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import authService from '../services/auth'
import surveyUIService from '../services/surveyUIService'
import { User } from '../types'

import CreateSurveyModal from './CreateSurveyModal'
import ShareModal from '../components/ShareModal'

interface State {
  isAuthenticated?: boolean,
  isSurveysListView?: boolean
  isSurveyEditMode?: boolean
  isSurveyResponseORSubmittedView?: boolean
}

class Header extends React.Component<RouteComponentProps, State> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      isAuthenticated: authService.isAuthenticated(),
      isSurveysListView: this.isSurveyListView(),
      isSurveyEditMode: this.isSurveyEditModeView(),
      isSurveyResponseORSubmittedView: this.isSurveyResponseORSubmittedView()
    }
    authService.subscribe((_: User) => {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    })
  }

  render() {
    const { isSurveysListView, isSurveyEditMode, isSurveyResponseORSubmittedView } = this.state

    if (isSurveyResponseORSubmittedView) {
      return ( null ) 
    }

    if (isSurveysListView) {
      return (
        <header className="bg-indigo-100">
        <div className="flex justify-between items-center text-indigo-700 pt-4 pb-4 px-6">
          <button onClick={this.toggleModal}>
            <img className="fill-current w-12" src="/icons/add-solid.svg"/>
          </button>
          <CreateSurveyModal />
          <div>
            <span className="pl-4">
              { this.state.isAuthenticated ? <a onClick={this.logout} href="#">Logout</a> : <a onClick={this.login} href="#">Sign in</a> }
            </span>
          </div>

        </div>
      </header>
      )
    }

    if (isSurveyEditMode) {
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
              { this.state.isAuthenticated ? <a onClick={this.logout} href="#">Logout</a> : <a onClick={this.login} href="#">Sign in</a> }
            </span>
          </div>
        </div>
      </header>
      )
    }
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

  toggleModal = () => {
    surveyUIService.openSurveyModal()
  }

  showShareModal = () => {
    surveyUIService.openShareModal()
  }

  isSurveyListView() {
    const urlSplit = this.props.location.pathname.split('/')
    const lastElement = urlSplit.length - 1
    const page = urlSplit[lastElement]
    return page === 'surveys'
  }

  isSurveyEditModeView() {
    const urlSplit = this.props.location.pathname.split('/')
    const lastElement = urlSplit.length - 1
    const page = urlSplit[lastElement]
    return page === 'edit'
  }

  isSurveyResponseORSubmittedView() {
    const urlSplit = this.props.location.pathname.split('/')
    const lastElement = urlSplit.length - 1
    const page = urlSplit[lastElement]
    return page === 'surveyResponse' || page === 'surveySubmitted'
  }

}

export default withRouter(Header)