import knex from 'knex'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const UserModel = require('./user')

Model.knex(knex(knexConfig.development))

class SurveyModel extends Model {
  
  static get tableName() {
    return 'surveys'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 3, maxLength: 50 }
      }
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'surveys.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = SurveyModel