import axios from '../axios'
import { Survey } from '../types'

async function list(): Promise<Survey[]> {
  const response = await axios.get('/surveys')
  return response.data
}

async function fetchSurvey(id: string): Promise<Survey> {
  const response = await axios.get(`/survey/${id}`)
  return response.data
}

async function create(title: string, description: string): Promise<any> {
  const survey: Survey = { title: title, description: description, headerUrl: '', themeColor: '', backgroundColor: '', fontStyle: '' }
  return await axios.post('/surveys', survey)
}

async function resend(id: number): Promise<void> {
  await axios.post(`/admin/invitations/${id}/resend`)
}

async function deleteById(id: number): Promise<void> {
  await axios.delete(`/admin/invitations/${id}`)
}

async function validateToken(token: string) {
  const response = await axios.get('/invitations/validate', { params: { token } })
  return response.data
}

export default {
  fetchSurvey,
  list,
  create,
  resend,
  deleteById,
  validateToken
}
