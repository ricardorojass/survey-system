const { db } = require('../db')
import { User } from '../types'
const UserModel = require('../models/user')


const find = async (id: number): Promise<User> => {
  return await UserModel.query().findById(id)
}

const findByEmail = async (email: string): Promise<User> => {
  const [user] = await UserModel.query().where('email', email)
  return user
}

const create = async (user: User): Promise<User> => {
  const record = await UserModel.query().insert(user)
  return record
}

export default {
  find,
  create,
  findByEmail
}
