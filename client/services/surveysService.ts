import axios from '../axios'
import { Survey, SurveyResponse, Question } from '../types'
import Store from '../store'

function initialState() {
  return {
    currentSurvey: null,
    questions: null,
    loaded: null,
  }
}

interface SurveyState {
  currentSurvey?: Survey
  questions?: Question[]
  loaded?: boolean
}
class SurveyService extends Store<SurveyState> {

  async list(): Promise<Survey[]> {
    const response = await axios.get('/surveys')
    return response.data
  }

  async fetchSurvey(id: string) {
    const response = await axios.get(`/surveys/${id}`)
    this.setState({
      currentSurvey: response.data,
      questions: response.data.questions,
      loaded: true
    })
  }

  async create(title: string, description: string): Promise<any> {
    const survey: Survey = { title: title, description: description, headerUrl: '', themeColor: '', backgroundColor: '', fontStyle: '' }
    return await axios.post('/surveys', survey)
  }

  async update(surveyId: string, survey: Survey): Promise<Survey> {
    return await axios.put(`/surveys/${surveyId}`, survey)
  }

}

export default new SurveyService(initialState())
