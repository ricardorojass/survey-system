import axios from '../axios'
import { Question } from '../types'

async function create(question: Question): Promise<Question> {
  const response = await axios.post(`/surveys/${question.surveyId}/questions`, question)
  return response.data
}

async function update(question: Question): Promise<any> {
  await axios.put(`/surveys/${question.surveyId}/questions/${question.id}`, question)
}

async function deleteById(questionId: number): Promise<any> {
  await axios.delete(`/surveys/questions/${questionId}`)
}

export default {
  create,
  update,
  deleteById,
}
