import db from '../db'
import { Answer } from "server/types"

const create = async (answer: Answer): Promise<Answer>  => {
  let response
  try {
    [response] = await db("answers").insert(answer).returning('*')
  } catch (e) {
    console.log('Answer cannot be created', e);
  }
  return response
}

// const update = async (optionId: string, option: Option): Promise<Option>  => {
//   return await OptionModel.query().updateAndFetchById(optionId, option)
// }

// const deleteById = async (questionId: number): Promise<number>  => {
//   return await OptionModel.query().deleteById(questionId)
// }

export default {
  create,
}