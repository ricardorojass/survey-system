const { db } = require('../db')
import { User } from '../types'
const UserModel = require('../models/user')


// const find = async (id: number): Promise<User> => {
//   return await db("users").where({ id }).first()
// }

// const findByEmail = async (email: string): Promise<User> => {
//   return await db("users").where({ email }).first()
// }

const create = async (user: User): Promise<User> => {
  const [record] = await UserModel.query().insert(user)
  return record
}

export default {
  create
}
