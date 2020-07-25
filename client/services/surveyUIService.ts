import React from 'react'
import Store from '../store'
import { Survey } from '../types'

function initialState() {
  return {
    isSurveyModalOpen: false,
    isShareModalOpen: false,
    currentSurvey: null
  }
}

interface SurveyUI {
  isSurveyModalOpen?: boolean
  isShareModalOpen?: boolean
}

class SurveyUIService extends Store<SurveyUI> {

  openSurveyModal() {
    this.setState({ isSurveyModalOpen: true })
  }

  openShareModal() {
    this.setState({ isShareModalOpen: true })
  }
  
  closeSurveyModal() {
    this.setState({ isSurveyModalOpen: false })
  }

  closeShareModal() {
    this.setState({ isShareModalOpen: false })
  }

  isSurveyModalOpen() {
    return this.state.isSurveyModalOpen
  }

  isShareModalOpen() {
    return this.state.isShareModalOpen
  }
}

export default new SurveyUIService(initialState())