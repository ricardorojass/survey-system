import React from 'React'
import { RouteComponentProps } from 'react-router-dom'

import responsesService from '../services/responsesService'
import { SurveyResponse, Question } from '../types'
import surveysService from '../services/surveysService'

interface State {
  loading?: boolean
  error?: any
  questions?: Question[]
  responses?: SurveyResponse[]
}

interface Props {
  id?: string
}

export default class QuestionsComponent extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = { loading: true, error: null, questions: [], responses: [] }
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchQuestionsFromStore()
    await this.fetchResponses()
  }


  render() {
    const { questions, responses } = this.state
    return (
      <section className="bg-indigo-100 min-h-screen">
      <div className="px-6 pt-4">
        {/*body*/}
        <div className="bg-white shadow-lg">
          <div className="px-6 py-4">
            <p className="text-2xl">{ responses.length } responses</p>
          </div>
        </div>
        {/* todo: create option component */}
        { questions.map(question =>
          <div key={question.id} className="bg-white shadow-lg mt-4">
            <div className="px-6 py-4">
              <p>{question.title}</p>
            </div>
          </div>
        )}
        {/*end body*/}
      </div>
    </section>
    )
  }

  fetchQuestionsFromStore() {
    // Donde deberia manejar el error?
    const questions = surveysService.getState().questions
    console.log('responses tab', questions);

    this.setState({
      loading: false,
      questions: questions
    })
  }

  fetchResponses = async () => {
    try {
      let responses: SurveyResponse[] = await responsesService.list(this.surveyId)
      // contando responses
      // reduce( (acc, o) => (acc[o.questionId] = (acc[o.questionId] || 0)+1, acc), {} )
      this.setState({
        loading: false,
        responses: responses
      })
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }
}
