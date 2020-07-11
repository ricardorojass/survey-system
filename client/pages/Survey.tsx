import React from 'react'
import { RouteComponentProps } from "react-router"

import Header from '../components/Header'
import Loading from '../components/Loading'

interface State {
  loading?: boolean
  error?: Error
  survey?: any
}

interface Props {
  surveyId?: string
}

export default class SurveyView extends React.Component<RouteComponentProps<Props>, State> {
  contentRef: React.RefObject<HTMLDivElement>
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = { loading: true, error: null, survey: null }
    this.contentRef = React.createRef()


  }
  
  render() {

    return (
      <div className="bg-gray-100">
        <Header />
      </div>
    )
  }
}