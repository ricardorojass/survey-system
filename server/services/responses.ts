import db from '../db'
import { Survey, SurveyResponse } from '../types'
const SurveyModel = require('../models/survey')


const create = async (surveyReponse: SurveyResponse): Promise<number>  => {
  // Todo: Use Objection
  const [response] = await db("responses").insert(surveyReponse).returning('id')
  console.log('postgres', response);
  
  return response
}

export default {
  create,
}