import React from 'react'
import Store from '../store'
import { Survey } from '../types'

function initialState() {
  return { isModalOpen: false, currentSurvey: null }
}

interface SurveyUI {
  isModalOpen?: boolean
}

class SurveyUIService extends Store<SurveyUI> {

  openModal() {
    this.setState({ isModalOpen: true })
  }
  
  closeModal() {
    this.setState({ isModalOpen: false })
  }

  isModalOpen() {
    return this.state.isModalOpen
  }
}

export default new SurveyUIService(initialState())