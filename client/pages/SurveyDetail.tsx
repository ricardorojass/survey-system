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
  questions?: Question[]
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
      survey: {},
      questions: [{
        title: '',
        description: '',
        options: [
          { description: '' }
        ]
      }]
    } 
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchSurvey()
  }

  render() {
    const { loading, error, survey, questions } = this.state
    return (
      <div className="bg-gray-100 h-auto">
        <div className="flex">
          <div className="mx-auto p-4 mt-6 w-6/12">
            <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
              <p className="text-2xl pl-6">Edit survey</p>
              <form onSubmit={this.patchSurvey}>
                <SurveyTitle
                  index={survey.id}
                  title={survey.title}
                  description={survey.description}
                  onChange={this.handleChange} />

                <QuestionComponent
                  key={questions[0].title}
                  question={questions[0]}
                  onChange={this.handleChange} />
                {/* The following code doesn't works ------------------- */}
                {/* { survey.questions.map(question => {
                  <QuestionComponent
                    key={question.title}
                    question={question}
                    onChange={this.handleChange} />
                }) } */}
                {/*footer*/}
                <div className="flex items-center justify-end mt-6">
                  <button
                    className="bg-green-500 text-white w-full active:bg-green-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                  >
                    Update
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }

  handleChange = (key: string, updatedSurvey: any) => {
    const  [entity, property] = key.split('.')
    const isSurvey = entity === 'survey'
    if (isSurvey){
      this.updateSurveyState(property, updatedSurvey)
    } else {
      this.updateQuestionState(key, updatedSurvey)
    }
  }

  updateSurveyState = (property: string, updatedQuestion: any) => {
    // 1. Take a copy of the current state
    const survey = { ...this.state.survey }
    // 2. Update the state
    survey[property] = updatedQuestion.property
    // 3. Set that to state
    this.setState({ survey })
  }

  updateQuestionState = (property: string, updatedSurvey: any) => {
    console.log('updatedquestion...', property, updatedSurvey);
    
    // 1. Take a copy of the current state
    const questions = [ ...this.state.questions ]
    // 2. Update the state
    
    let currentQuestion = questions.find(question => question.id === updatedSurvey.id)
    let cloneQuestions = this.state.questions.map(question => { return {...question} })
    cloneQuestions.map(q => {
      if (q.id === currentQuestion.id) {
        q.title = updatedSurvey.title
      }
    })
    // 3. Set that to state
    this.setState({ questions:  cloneQuestions})
  }

  fetchSurvey = async () => {
    try {
      let survey: Survey = await surveysService.fetchSurvey(this.surveyId)
      
      this.setState({
        loading: false,
        survey: survey,
        questions: survey.questions
      })
      console.log('state: ', this.state.survey);
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }

  patchSurvey = (e) => {
    e.preventDefault()
    console.log('survey updated');
  }
}