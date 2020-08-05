import { User } from '../types'
const UserModel = require('../models/user')


const find = async (id: number): Promise<User> => {
  return await UserModel.query().findById(id)
}

const findByEmail = async (email: string): Promise<User> => {
  const [user] = await UserModel.query().where('email', email)
  return user
}

const create = async (user: User): Promise<any> => {
  try {
    return await UserModel.query().insert(user)
  } catch (e) {
    return e
  }
}

export default {
  find,
  create,
  findByEmail
}
