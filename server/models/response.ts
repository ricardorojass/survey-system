import db from '../db'
const { Model } = require('objection')
const SurveyModel = require('./survey')
const AnswerModel = require('./answer')

Model.knex(db)

class ResponseModel extends Model {
  
  static get tableName() {
    return 'responses'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['surveyId'],
    }
  }

  static get relationMappings() {
    return {
      survey: {
        relation: Model.BelongsToOneRelation,
        modelClass: SurveyModel,
        join: {
          from: 'responses.surveyId',
          to: 'surveys.id'
        }
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: AnswerModel,
        join: {
          from: 'responses.id',
          to: 'answers.responseId'
        }
      }
    }
  }
}

module.exports = ResponseModel