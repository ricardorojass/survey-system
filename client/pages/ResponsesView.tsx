import React from 'React'
import { RouteComponentProps } from 'react-router-dom'

import { AnswerFromUser  } from '../types'
import surveysService from '../services/surveysService'

import AnswerComponent from '../components/Answer'

interface State {
  loading?: boolean
  error?: any
  numResponses?: number
  answersFromUsers?: AnswerFromUser[]
}

interface Props {
  id?: string
}

export default class ResponsesView extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = { loading: true, error: null, numResponses: null, answersFromUsers: [] }
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchResponses()
  }


  render() {
    const { numResponses, answersFromUsers } = this.state
    return (
      <section className="bg-indigo-100 min-h-screen">
        {/*body*/}
        <div className="mx-auto p-4 md:w-8/12 sm:w-auto">
          <div className="px-6 pt-4">
            <div className="bg-white border-cards">
              <div className="px-6 py-4">
                <p className="text-2xl">{ numResponses } responses</p>
              </div>
            </div>
            {/* todo: create option component */}
            { answersFromUsers.map(answer => (
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
      let answers: AnswerFromUser[] = await surveysService.getAnswersFromUsers(this.surveyId)
      // contando responses
      // reduce( (acc, o) => (acc[o.questionId] = (acc[o.questionId] || 0)+1, acc), {} )
      this.setState({
        loading: false,
        answersFromUsers: answers,
        numResponses: answers[0].numResponses
      })
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }
}
