import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Survey } from '../types';
import surveysService from '../services/surveysService';

import SurveyTitle from '../components/SurveyTitle'
import SurveyOption from '../components/SurveyOption';

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
    console.log(props.match.params);
    
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
        <div className="bg-gray-100 h-auto">
          <div className="flex">
            <div className="mx-auto p-4 mt-6 w-6/12">
              <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
                <p className="text-2xl pl-6">Edit survey</p>
                <SurveyTitle title={survey.title} description={survey.description} />

                <SurveyOption title={'question 1'} options={['Option 1']}/>

              </div>
            </div>
          </div>
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