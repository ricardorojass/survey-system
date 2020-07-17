import db from '../db'
import { Survey } from '../types'
const SurveyModel = require('../models/survey')
const UserModel = require('../models/user')

const findSurveyById = async (surveyId: string): Promise<Survey> => {
  return await SurveyModel.query().findById(surveyId)
}

const findAllByUser = async (userId: number): Promise<Array<Survey>> => {
  return await db("surveys").where({ userId })
}

const create = async (survey: Survey): Promise<Survey>  => {
  const [response] = await db("surveys").insert(survey).returning('*')
  return response
}

export default {
  findSurveyById,
  findAllByUser,
  create
}