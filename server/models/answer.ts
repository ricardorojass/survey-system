import knex from 'knex'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const ResponseModel = require('./response')
const OptionModel = require('./option')

Model.knex(knex(knexConfig.development))

class AnswerModel extends Model {
  
  static get tableName() {
    return 'answers'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['responseId', 'optionId'],
    }
  }

  static get relationMappings() {
    return {
      response: {
        relation: Model.BelongsToOneRelation,
        modelClass: ResponseModel,
        join: {
          from: 'asnwers.responseId',
          to: 'responses.id'
        }
      },
      option: {
        relation: Model.BelongsToOneRelation,
        modelClass: OptionModel,
        join: {
          from: 'asnwers.optionId',
          to: 'options.id'
        }
      }
    }
  }
}

module.exports = AnswerModel