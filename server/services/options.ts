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

export default {
  create,
  update,
  deleteById,
}