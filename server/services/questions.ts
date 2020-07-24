import db from '../db'
import { Question, Option } from '../types'
const QuestionModel = require('../models/question')

const create = async (question: Question): Promise<any>  => {
  const data: Question = { surveyId: question.surveyId, title: question.title, description: '', required: false }

  const [response] = await db("questions").insert(data).returning('*')
  insertOptions(response.id, question.options)

  return response
}

const update = async (questionId: string, question: Question): Promise<any>  => {
  const response = await QuestionModel.query().updateAndFetchById(questionId, question)
  return response
}

const deleteById = async (questionId: number): Promise<any>  => {
  await QuestionModel.query().deleteById(questionId)
}

const insertOptions = async (questionId: number, options: Option[]) => {
  options.forEach(async option => {
    const data: Option = {
      questionId: questionId.toString(),
      description: option.description,
    }
    try {
      await db("options").insert(data)
    } catch (e) {
      throw new Error('Option insert Error: ')
    }
  })
}

export default {
  create,
  update,
  deleteById,
}