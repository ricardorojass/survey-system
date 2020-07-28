import React from 'react'
import { RouteComponentProps } from "react-router"

import SurveySummary from '../components/SurveySummary'
import CreateSurveyModal from '../components/CreateSurveyModal'
import Loading from '../components/Loading'

import surveysService from '../services/surveysService'
import surveyUIService from '../services/surveyUIService'
import { Survey } from '../types'
import Header from '../components/Header'

interface State {
  loading?: boolean
  error?: Error
  surveys?: Survey[]
  showModal: boolean
}

export default class SurveyListView extends React.Component<RouteComponentProps, State> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { loading: true, error: null, surveys: [], showModal: false }
  }

  async componentDidMount() {
    await this.fetchSurveys()
  }
  
  render() {

    return (
      <>
        <Header />
        <div className="bg-gray-100 h-auto">

          <div className="pt-4 pl-6">
            <button onClick={this.openModal}>
              <img className="fill-current w-12" src="/icons/add-solid.svg"/>
            </button>
          </div>
          <CreateSurveyModal />
          <section className="flex-grow flex justify-center items-center">
            <div className="mx-auto px-4 sm:px-8 py-2 mt-6">
              <div className="grid grid-cols-6 gap-4 items-start mt-8 mx-auto px-8">
                { this.state.surveys.map(survey =>
                  <SurveySummary key={survey.id} survey={survey} />
                )}
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }

  fetchSurveys = async () => {
    try {
      const surveys: Survey[] = await surveysService.list()
      this.setState({ loading: false, surveys })
    } catch (e) {
      this.setState({ loading: false, error: e })
    }
  }

  openModal = () => {
    surveyUIService.openSurveyModal()
  }
}