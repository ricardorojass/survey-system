import db from '../db'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const SurveyModel = require('./survey')

Model.knex(db)

class UserModel extends Model {

  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'name'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 8, maxLength: 50 },
        password: { type: 'string', minLength: 6 },
        name: { type: 'string', minLength: 3, maxLength: 50 }
      }
    }
  }

  static get relationMappings() {
    return {
      surveys: {
        relation: Model.HasManyRelation,
        modelClass: SurveyModel,
        join: {
          from: 'users.id',
          to: 'surveys.userId'
        }
      }
    }
  }
}

module.exports = UserModel