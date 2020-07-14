import knex from 'knex'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const AnswerModel = require('./answer')

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
        modelClass: AnswerModel,
        join: {
          from: 'options.questionId',
          to: 'questions.id'
        }
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: AnswerModel,
        join: {
          from: 'options.id',
          to: 'answers.optionId'
        }
      }
    }
  }
}

module.exports = OptionModel