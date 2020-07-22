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
  // Todo: Use Objection
  console.log('server::questionService.create');
  
  // const [response] = await db("surveys").insert().returning('*')
  // return response
}

const update = async (surveyId: string, questionId: string, question: Question): Promise<any>  => {
  console.log('server::questionService.update', surveyId, questionId, question);

  // await QuestionModel.query().updateAndFetchById(surveyId, question)
}

export default {
  create,
  update
}