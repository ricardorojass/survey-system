import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Survey, Question, Option } from '../types';

import surveysService from '../services/surveysService';
import SurveyTitle from '../components/SurveyTitle'
import QuestionComponent from '../components/Question';

interface State {
  loading?: boolean
  error?: any
  survey?: Survey
}

interface Props {
  id?: string
}

export default class SurveyDetailView extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)
    
    this.state = { 
      loading: true,
      error: null,
      survey: { questions: [] },
    } 
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchSurvey()
  }

  render() {
    const { loading, error, survey } = this.state
    return (
      <div className="bg-gray-100 h-auto">
        <div className="flex">
          <div className="mx-auto p-4 mt-6 w-6/12">
            <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
              <p className="text-2xl pl-6">Edit survey</p>
              <form>
                <SurveyTitle
                  index={survey.id}
                  title={survey.title}
                  description={survey.description}
                  onFieldChange={this.updateSurveyField} />

                { survey.questions.map(question => (
                    <QuestionComponent
                      key={question.title}
                      question={question}
                      onQuestionChange={this.updateQuestion} />
                  )) }
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }

  updateSurveyField = (field, value) => {
    this.setState(state => {
      const newState = { survey: { ...state.survey }}
      newState.survey[field] = value
      return newState
    })

    // llamar el servidor
  }

  updateQuestion = (question: Question, title: string) => {
    console.log('Updated question', question.id, title);
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
}
