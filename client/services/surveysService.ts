import axios from '../axios'
import { Survey } from '../types'

async function list(): Promise<Survey[]> {
  const response = await axios.get('/surveys')
  return response.data
}

async function fetchSurvey(id: string): Promise<Survey> {
  const response = await axios.get(`/surveys/${id}`)
  return response.data
}

async function create(title: string, description: string): Promise<any> {
  const survey: Survey = { title: title, description: description, headerUrl: '', themeColor: '', backgroundColor: '', fontStyle: '' }
  return await axios.post('/surveys', survey)
}

async function update(surveyId: number, survey: Survey): Promise<Survey> {
  return await axios.put(`/surveys/${surveyId}`, survey)
}

export default {
  fetchSurvey,
  list,
  create,
  update
}
