import axios from '../axios'
import { Survey } from '../types'

const getSurveysUrl = ''

async function list(): Promise<Survey[]> {
  const response = await axios.get('/surveys')
  console.log(response)
  return response.data
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
  list,
  resend,
  deleteById,
  validateToken
}
