import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Survey, Answer } from '../types';

import surveysService from '../services/surveysService';
import QuestionResponse from '../components/QuestionResponse';
import surveyResponseService from '../services/responsesService';

import Loading from '../components/Loading'

interface State {
  loading?: boolean
  error?: any
  info?: any
  survey?: Survey
  answers?: any
}

interface Props {
  id?: string
}

const initialState = {
  loading: true,
  error: null,
  survey: { questions: [] },
  answers: {}
}
class SurveyResponseView extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = initialState
    this.reset = this.reset.bind(this)
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchSurvey()
  }

  componentDidCatch(error, info) {
    // TODO: do something about the error
    console.log('componentDidCatch', error, info);
    this.setState({ error: error, info: info })

  }

  reset() {
    this.setState(initialState)
  }

  render() {
    const { loading, error, info, survey } = this.state

    if (loading) return <Loading />

    if (error) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong 🙊</h1>
          <h2>{error.toString()}</h2>
          <pre>{info.componentStack}</pre>
          <button onClick={this.reset}>Try again</button>
        </div>
      )
    }
    return (
      <div className="bg-indigo-100 min-h-screen">
        <div className="flex">
          <div className="mx-auto p-4 mt-6 w-6/12">
            <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
              <form onSubmit={this.handleSubmit}>
                <section className="bg-white shadow-lg">
                  <div className="px-6 py-4">
                    <div className="">
                      <h1>{survey.title}</h1>
                    </div>
                    <div className="">
                      <p>{survey.description}</p>
                    </div>
                  </div>
                </section>

                { survey.questions.map(question => (
                    <QuestionResponse
                      key={question.id}
                      question={question}
                      selectedOption={this.state.answers[question.id]}
                      onUpdateQuestion={this.handleOptionChange}/>
                  ))
                }
                <div className="form-actions">
                  <button className="btn btn-primary btn-block" type="submit">Submit</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }


  fetchSurvey = async () => {
    try {
      let survey: Survey = await surveysService.fetchSurvey(this.surveyId)

      this.setState({
        loading: false,
        survey: survey
      })
      console.log('state: ', this.state.survey);
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }


  handleOptionChange = (questionId: number, optionId: number) => {
    this.setState(state => ({
      answers: { ...state.answers, [questionId]: optionId }
    }))
  }

  handleSubmit = async e => {
    e.preventDefault()
    const answers: Answer[] = Object.values(this.state.answers)
    await surveyResponseService.create(this.surveyId, answers)
    const url = `/surveys/${this.surveyId}/surveySubmitted`
    this.props.history.push(url)
  }

}

export default withRouter(SurveyResponseView)