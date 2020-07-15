import db from '../db'
import { Survey } from '../types'
const SurveyModel = require('../models/survey')

const findAllByUser = async (userId: number): Promise<Array<Survey>> => {
  return await db("surveys").where({ userId })
}

export default {
  findAllByUser
}