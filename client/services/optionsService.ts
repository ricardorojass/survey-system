import axios from '../axios'
import { Option } from '../types'

async function create(option: Option): Promise<Option> {
  const response = await axios.post(`/surveys/questions/options`, option)
  return response.data
}

async function update(questionId: number, optionId: number, value: string): Promise<Option> {
  const data: Option = { description: value }
  return await axios.put(`/surveys/questions/${questionId}/options/${optionId}`, data)
}

async function deleteById(optionId: number): Promise<any> {
  await axios.delete(`/surveys/questions/options/${optionId}`)
}

export default {
  create,
  update,
  deleteById,
}
