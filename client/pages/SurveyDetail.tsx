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
  options?: Option[]
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
      survey: { title: '', description: '' },
      questions: [{ id: 1, title: '2 + 2', description: 'Calcular' }],
      options: [{ id: 1, description: '1', checked: false }, { id: 2, description: '3', checked: false }]
    } 

    
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    await this.fetchSurvey()
  }

  render() {
    const { loading, error, survey, questions, options } = this.state
    if (survey) {
      return (
        <div className="bg-gray-100 h-auto">
          <div className="flex">
            <div className="mx-auto p-4 mt-6 w-6/12">
              <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
                <p className="text-2xl pl-6">Edit survey</p>
                <form onSubmit={this.patchSurvey}>
                  <SurveyTitle
                    title={survey.title}
                    description={survey.description}
                    onChange={this.handleChange} />

                  <QuestionComponent
                    question={questions[0]}
                    options={options}
                    onChange={this.handleChange} />
                  <QuestionComponent
                    question={questions[0]}
                    options={options}
                    onChange={this.handleChange} />
                  {/* The following code doesn't works ------------------- */}
                  {/* { survey.questions.map(question => {
                    <Question
                      key={question.id}
                      question={question}
                      onChange={this.handleChange} />
                  }) } */}
                </form>

              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }

  handleChange = (e: any) => {
    const targetID = e.target.id
    const targetName = e.target.name
    const targetValue = e.target.value
    let obj = {}
    console.log('obj', obj);
    
    switch (targetID) {
      case 'survey':
        obj[targetID] = { [targetName]: targetValue }
          break;
      case 'questions':
        obj[targetID] = [ { [targetName]: targetValue } ]
        break;
      case 'options':
        const optionSelected: Option = this.state.options.find(option => option.description === targetName)
        const isChecked = e.target.checked
        console.log('#####', this.state.options);
        
        obj[targetID] = [ { ...this.state.options } ]
        break;
        
      default:
        obj[targetID] = { [targetName]: targetValue }
        break;
    }
    this.setState(obj)
  }

  fetchSurvey = async () => {
    try {
      let survey: Survey = await surveysService.fetchSurvey(this.surveyId)
      console.log('hola', survey);

      const questions = [
        {
        id: 1,
        title: '2 + 2',
        description: 'Calcular',
      }]
      const options = [{ id: 1, description: '1', checked: false }, { id: 2, description: '3', checked: false }]
      this.setState({ loading: false, survey, questions, options })
      
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