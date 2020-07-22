import db from '../db'
import { Survey } from '../types'
const SurveyModel = require('../models/survey')
const UserModel = require('../models/user')

const findSurveyById = async (surveyId: string): Promise<Survey> => {
  const [survey] = await SurveyModel.query()
    .where('id', surveyId )
    .withGraphFetched('questions.options')
  return survey
}

const findAllByUser = async (userId: number): Promise<Array<Survey>> => {
  return await db("surveys")
    .where({ userId })
}

const create = async (survey: Survey): Promise<Survey>  => {
  // Todo: Use Objection
  const [response] = await db("surveys").insert(survey).returning('*')
  return response
}

const update = async (surveyId: string, survey: Survey): Promise<any>  => {
  await SurveyModel.query().updateAndFetchById(surveyId, survey)
}

export default {
  findSurveyById,
  findAllByUser,
  create,
  update
}