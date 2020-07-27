import db from '../db'
import { SurveyResponse, Answer } from '../types'
import * as answerController from '../controllers/answer';
const ResponseModel = require('../models/response')

const create = async (surveyId: number, answers: number[]): Promise<SurveyResponse>  => {
  // Todo: Use Objection
  let surveyResponseBody: SurveyResponse = { surveyId }
  
  let surveyResponseId
  try {
    [surveyResponseId] = await db("responses").insert(surveyResponseBody).returning('id')
  } catch (e) {
    console.log('surveyResponse Error', e);
  }

  await answerController.createAnswers(surveyResponseId, answers)
  return surveyResponseId
}

const findById = async (responseId: number): Promise<SurveyResponse> => {
  console.log('findById');
  return await ResponseModel.query().findById(responseId).returning('*')
}

export default {
  create,
  findById,
}