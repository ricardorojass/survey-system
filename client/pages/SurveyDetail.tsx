import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Survey } from '../types';
import surveyUIService from '../services/surveyUIService';
import surveysService from '../services/surveysService';

interface State {
  loading?: boolean
  error?: Error
  survey?: Survey
}

interface Props {
  id?: string
}

export default class SurveyDetailView extends React.Component<RouteComponentProps<Props>, State> {
  surveyId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)
    
    this.state = { loading: true, error: null, survey: null }
    this.surveyId = props.match.params.id
  }

  async componentDidMount() {
    console.log('survey id', this.surveyId);
    
    await this.fetchSurvey()
  }

  render() {
    const { loading, error, survey } = this.state
    if (survey) {
      return (
        <div>
          <h1 className="text-3xl font-semibold">{survey.title}</h1>
          <h1 className="text-3xl font-semibold">{survey.description}</h1>
        </div>
      )
    } else {
      return (null)
    }
  }

  fetchSurvey = async () => {
    try {
      const survey: Survey = await surveysService.fetchSurvey(this.surveyId)
      console.log('hola', survey);
      
      this.setState({ loading: false, survey })
      
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: e })
    }
  }
}