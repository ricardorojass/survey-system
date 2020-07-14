import knex from 'knex'
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const SurveyModel = require('./survey')

Model.knex(knex(knexConfig.development))

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
      }
    }
  }
}

module.exports = ResponseModel