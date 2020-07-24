import db from '../db'
import { Option } from "server/types"
const OptionModel = require('../models/option')

const create = async (option: Option): Promise<any>  => {
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

export default {
  create,
  update
}