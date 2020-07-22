import axios from '../axios'
import { Question } from '../types'

// async function list(): Promise<Survey[]> {
//   const response = await axios.get('/surveys')
//   return response.data
// }

// async function fetchSurvey(id: string): Promise<Survey> {
//   const response = await axios.get(`/survey/${id}`)
//   return response.data
// }

async function create(surveyId: string, question: Question): Promise<any> {
  return await axios.post(`/surveys/${surveyId}/questions`, question)
}

async function update(question: Question): Promise<any> {
  console.log('client service', question.surveyId, question.id);
  
  return await axios.put(`/surveys/${question.surveyId}/questions/${question.id}`, question)
}

export default {
  create,
  update
}
