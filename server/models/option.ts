import db from '../db'
const { Model } = require('objection')
const AnswerModel = require('./answer')


Model.knex(db)

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
    const QuestionModel = require('./question')
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuestionModel,
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