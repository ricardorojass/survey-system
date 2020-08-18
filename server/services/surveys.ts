import db from '../db'
import { Survey, AnswerFromUser, ResponsesSubmitted } from '../types'
import optionsService from '../services/options'
import responsesService from '../services/responses'

const SurveyModel = require('../models/survey')


const findSurveyById = async (surveyId: string): Promise<Survey> => {
  const [survey] = await SurveyModel.query()
    .where('surveys.id', surveyId )
    .withGraphJoined('questions.options')
  return survey
}

const findAllByUser = async (userId: number): Promise<Array<Survey>> => {
  return await db("surveys").where({ userId })
}

const getAnswersFromUsers = async (surveyId: number): Promise<ResponsesSubmitted> => {
  const answers =  await db
    .select('questions.id as questionId', 'questions.title as questionTitle')
    .count('answers.id as numResponses')
    .from('surveys')
    .leftJoin('questions', 'surveys.id', 'questions.surveyId')
    .leftJoin('options', 'questions.id', 'options.questionId')
    .leftJoin('answers', 'options.id', 'answers.optionId')
    .where('surveys.id', surveyId)
    .groupBy('questions.id', 'questions.title')
    .orderBy('questionId', 'asc')

  for (const question of answers) {
    const optionsResponse = await optionsService.optionsByQuestionId(question.questionId)
    question.options = optionsResponse
  }

  const numResponsesSubmitted = await responsesService.getAmountResponsesBySurveyId(surveyId)

  const responsesSubmitted: ResponsesSubmitted = {
    numResponsesSubmitted,
    answersFromUsers: answers
  }

  return responsesSubmitted
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
  getAnswersFromUsers,
  create,
  update
}