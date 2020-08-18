import React from 'React'
import { RouteComponentProps } from 'react-router-dom'

import { ResponsesSubmitted  } from '../types'
import surveysService from '../services/surveysService'

import AnswerComponent from '../components/Answer'
import Loading from '../components/Loading'

interface State {
  loading?: boolean
  error?: any
  responsesSubmitted?: ResponsesSubmitted
}

interface Props {
  id?: string
}

export default class ResponsesView extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = { loading: true, error: null, responsesSubmitted: null }
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchResponses()
  }


  render() {
    const { loading, responsesSubmitted } = this.state

    if (loading) return <Loading />

    return (
      <section className="bg-indigo-100 min-h-screen">
        {/*body*/}
        <div className="mx-auto p-4 md:w-8/12 sm:w-auto">
          <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
              <div className="bg-white border-cards">
                <div className="px-6 py-4">
                  <p className="text-2xl">{ responsesSubmitted.numResponsesSubmitted } responses</p>
                </div>
              </div>

              { responsesSubmitted.answersFromUsers.map(answer => (
                  <AnswerComponent key={answer.questionId} answer={answer} />
                ))
              }
          </div>
        </div>
        {/*end body*/}
    </section>
    )
  }

  fetchResponses = async () => {
    try {
      let responses: ResponsesSubmitted = await surveysService.getResponsesFromUsers(this.surveyId)

      this.setState({
        loading: false,
        responsesSubmitted: responses
      })
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }
}
