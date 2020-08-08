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
  return await ResponseModel.query().findById(responseId).returning('*')
}

const findAllBySurveyId = async (surveyId: number): Promise<SurveyResponse[]> => {
  return await db
    .select('responses.id as responseId', 'questions.id as questionId', 'questions.title', 'answers.optionId', 'options.description')
    .from('responses')
    .leftJoin('answers', 'responses.id', 'answers.responseId')
    .leftJoin('options', 'options.id', 'answers.optionId')
    .leftJoin('questions', 'questions.id', 'options.questionId')
    .where('responses.surveyId', surveyId)
}

export default {
  create,
  findById,
  findAllBySurveyId,
}