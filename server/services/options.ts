import db from '../db'
import { Option } from "server/types"
const OptionModel = require('../models/option')

const create = async (option: Option): Promise<Option>  => {
  let response
  try {
    [response] = await db("options").insert(option).returning('*')
  } catch (e) {
    console.log('Option cannot be created', e);
  }
  return response
}

const update = async (optionId: string, option: Option): Promise<Option>  => {
  return await OptionModel.query().updateAndFetchById(optionId, option)
}

const deleteById = async (questionId: number): Promise<number>  => {
  return await OptionModel.query().deleteById(questionId)
}

const optionsByQuestionId = async (questionId: number): Promise<Option[]> => {
  return await db
    .select('options.id', 'options.description')
    .count('answers.id as numAnswers')
    .from('questions')
    .leftJoin('options', 'questions.id', 'options.questionId')
    .leftJoin('answers', 'options.id', 'answers.optionId')
    .where('questions.id', questionId)
    .groupBy('options.id', 'options.description')
    .orderBy('options.id', 'asc')
}

export default {
  create,
  update,
  deleteById,
  optionsByQuestionId,
}