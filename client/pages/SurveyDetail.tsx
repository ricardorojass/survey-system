import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Survey, Question, Option } from '../types';

import surveysService from '../services/surveysService';
import SurveyTitle from '../components/SurveyTitle'
import QuestionComponent from '../components/Question';
import questionsService from '../services/questionsService';
import optionsService from '../services/optionsService';
import HeaderEdit from '../components/HeaderEdit';

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
      <>
        <HeaderEdit />
        <div className="bg-gray-100 h-auto">
          <div className="flex">
            <div className="mx-auto p-4 mt-6 w-6/12">
              <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
                <form>
                  <SurveyTitle
                    title={survey.title}
                    description={survey.description}
                    onFieldChange={this.updateSurveyField} />

                  <button
                    className="btn btn-primary btn-block mt-3"
                    type="button"
                    onClick={this.createQuestion}>
                      Add question
                  </button>

                  { survey.questions.map(question => (
                      <QuestionComponent
                        key={question.id}
                        question={question}
                        onDeleteQuestion={this.handleDeleteQuestion}
                        onUpdateQuestion={this.handleUpdateQuestion}
                        onUpdateOption={this.handleUpdateOption}
                        onAddOption={this.handleAddOption}
                        onDeleteOption={this.handleDeleteOption}/>
                    )) }
                </form>

              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  updateSurveyField = (field, value) => {
    this.setState(prevState => {
      const newState = { survey: { ...prevState.survey }}
      newState.survey[field] = value
      return newState
    }, async () => await surveysService.update(this.surveyId, this.state.survey) )
  }

  createQuestion = async (e) => {
    e.preventDefault()
    
    const questionBody: Question = {
      surveyId: this.surveyId, 
      title: 'Untitled question',
      options: [{ description: 'Option 1'}]
    }
    const newQuestion =  await questionsService.create(questionBody)
    this.setState(state => {
      const questions = state.survey.questions.concat(newQuestion)
      return { ...state, survey: { ...state.survey, questions } }
    })
  }

  handleDeleteQuestion = (questionId: number) => {
    this.setState(state => {
      const questions = state.survey.questions.filter(q => q.id != questionId)
      return { ...state, survey: { ...state.survey, questions } }
    }, async () => await questionsService.deleteById(questionId) )
  }

  handleUpdateQuestion = (id: number, field: string, value: string) => {
    this.setState(state => {
      const questions = state.survey.questions.map(question => {
        if (question.id === id) {
          question[field] = value
        }
        return question
      })
      return { ...state, survey: { ...state.survey, questions } }
    }, async () => {
      const updatedQuestion = this.state.survey.questions.find(q => q.id === id)
      await questionsService.update(updatedQuestion)
    })
  }

  handleAddOption = async (questionId: number, optionsCount: number) => {
    const optionBody: Option = { questionId, description: `Option ${optionsCount + 1}` }
    const newOption = await optionsService.create(optionBody)
    this.setState(state => {
      const questions = state.survey.questions.map(question => {
        if (question.id === questionId) {
          // TODO: Why concat doesn't work here?
          question.options.push(newOption)
        }
        return question
      })
      return { ...state, survey: { ...state.survey, questions } }
    })
  }

  handleUpdateOption = (questionId: number, optionId: number, field: string, value: string) => {
    this.setState(state => {
      const questions = state.survey.questions.map(question => {
        if (question.id === questionId) {
          question.options.map(option => {
            if (option.id === optionId) {
              option[field] = value
            }
            return option
          })
        }
        return question
      })
      return { ...state, survey: { ...state.survey.questions, questions } }
    }, async () => optionsService.update(questionId, optionId, value))
  }

  handleDeleteOption = (questionId: number, optionId: number) => {
    
    this.setState(state => {
      const questions = state.survey.questions.map(question => {
        if (question.id === questionId) {
          const idx = question.options.findIndex(o => o.id === optionId)
          question.options.splice(idx, 1)
        }
        return question
      })
      return { ...state, survey: { ...state.survey.questions, questions } }
    }, async () => await optionsService.deleteById(optionId))
  }

  fetchSurvey = async () => {
    try {
      let survey: Survey = await surveysService.fetchSurvey(this.surveyId)
      console.log('first state', survey);
      
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
