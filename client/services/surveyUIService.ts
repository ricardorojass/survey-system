import React from 'react'
import Store from '../store'

function initialState() {
  return { isModalOpen: false }
}

interface SurveyUI {
  isModalOpen: boolean
}

class SurveyUIService extends Store<SurveyUI> {

  openModal() {
    console.log('open modal from service');
    
    this.setState({ isModalOpen: true })
  }
  
  closeModal() {
    console.log('close modal from service');
    this.setState({ isModalOpen: false })
  }

  isModalOpen() {
    return this.state.isModalOpen
  }
}

export default new SurveyUIService(initialState())