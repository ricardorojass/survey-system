import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Survey, SurveyResponse, Answer } from '../types';

import produce from 'immer'
import surveysService from '../services/surveysService';
import QuestionResponse from '../components/QuestionResponse';
import answersService from '../services/answersService';

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

export default class SurveyResponseView extends React.Component<RouteComponentProps<Props>, State> {
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
      <div className="bg-gray-100 h-auto">
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

  getResponseID = async () => {
    try {
      let responseId = await surveysService.getSurveyResponseId(this.surveyId)
      this.setState({response: { id: Number(responseId) } })
    } catch (e) {
      
    }
  }

  handleOptionChange = (questionId: number, optionId: number) => {
    this.setState(state => ({
      answers: { ...state.answers, [questionId]: optionId }
    }))
  }
  
  handleSubmit = async formSubmitEvent => {
    formSubmitEvent.preventDefault()
    console.log('submit');
    
  }

}
