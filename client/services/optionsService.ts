import axios from '../axios'
import { Option } from '../types'

async function create(questionId: number, option: Option): Promise<Option> {
  const response = await axios.post(`/surveys/questions/${questionId}/options`, option)
  return response.data
}

async function update(questionId: number, optionId: number, value: string): Promise<Option> {
  const data: Option = { description: value }
  return await axios.put(`/surveys/questions/${questionId}/options/${optionId}`, data)
}

// async function update(question: Question): Promise<any> {
//   await axios.put(`/surveys/${question.surveyId}/questions/${question.id}`, question)
// }

// async function deleteById(questionId: number): Promise<any> {
//   await axios.delete(`/surveys/questions/${questionId}`)
// }

export default {
  create,
  update,
}
