import knex from 'knex'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const QuestionModel = require('./question')

Model.knex(knex(knexConfig.development))

class OptionModel extends Model {
  
  static get tableName() {
    return 'options'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['questionId'],
    }
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuestionModel,
        join: {
          from: 'options.questionId',
          to: 'questions.id'
        }
      }
    }
  }
}

module.exports = OptionModel