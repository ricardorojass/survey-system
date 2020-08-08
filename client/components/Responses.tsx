import React from 'React'
import { RouteComponentProps } from 'react-router-dom'

import responsesService from '../services/responsesService'
import { SurveyResponse } from '../types'

interface State {
  loading?: boolean
  error?: any
  responses?: SurveyResponse[]
}

interface Props {
  id?: string
}

export default class QuestionsComponent extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = { loading: true, error: null, responses: [] }
    console.log('props', props);
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchResponses()
  }


  render() {
    return (
      <>
        Responses
      </>
    )
  }

  fetchResponses = async () => {
    try {
      let responses: SurveyResponse[] = await responsesService.list(this.surveyId)
      console.log('first state resoponses', responses);

      this.setState({
        loading: false,
        responses: responses
      })
      console.log('state: ', this.state.responses);
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }
}
