import db from '../db'
import { Survey, Question } from '../types'
const QuestionModel = require('../models/question')

// const findSurveyById = async (surveyId: string): Promise<Survey> => {
//   const [survey] = await SurveyModel.query()
//     .where('id', surveyId )
//     .withGraphFetched('questions.options')
//   return survey
// }

// const findAllByUser = async (userId: number): Promise<Array<Survey>> => {
//   return await db("surveys")
//     .where({ userId })
// }

const create = async (question: Question): Promise<any>  => {
  const data: Question = {
    surveyId: question.surveyId,
    title: question.title, 
    options: question.options
  }
  const [response] = await QuestionModel.insert(data).returning('*')

  console.log('response',response);
    
  return response
}

const update = async (surveyId: string, questionId: string, question: Question): Promise<any>  => {
  const response = await QuestionModel.query().updateAndFetchById(questionId, question)
  return response
}

const deleteById = async (questionId: number): Promise<any>  => {
  await QuestionModel.query().deleteById(questionId)
}

export default {
  create,
  update,
  deleteById,
}