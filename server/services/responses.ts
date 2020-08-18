import db from '../db'
import { SurveyResponse, Answer } from '../types'
import * as answerController from '../controllers/answer';
import { response } from 'express';
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
  return await ResponseModel.query().findById(responseId).returning('*')
}

const getAmountResponsesBySurveyId = async (surveyId: number): Promise<number> => {
  const [response] = await db
    .count('responses.id')
    .from('responses')
    .where('responses.surveyId', surveyId)

  return Number(response.count)
}

export default {
  create,
  findById,
  getAmountResponsesBySurveyId,
}