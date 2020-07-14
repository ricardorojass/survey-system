import knex from 'knex'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const SurveyModel = require('./survey')

Model.knex(knex(knexConfig.development))

class QuestionModel extends Model {
  
  static get tableName() {
    return 'questions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
    }
  }

  static get relationMappings() {
    return {
      survey: {
        relation: Model.BelongsToOneRelation,
        modelClass: SurveyModel,
        join: {
          from: 'questions.surveyId',
          to: 'surveys.id'
        }
      }
    }
  }
}

module.exports = QuestionModel