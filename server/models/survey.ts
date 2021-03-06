import db from '../db'
const { Model } = require('objection')
const UserModel = require('./user')
const ResponseModel = require('./response')
const QuestionModel = require('./question')

Model.knex(db)

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
      },
      responses: {
        relation: Model.HasManyRelation,
        modelClass: ResponseModel,
        join: {
          from: 'surveys.id',
          to: 'responses.surveyId'
        }
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: QuestionModel,
        join: {
          from: 'surveys.id',
          to: 'questions.surveyId'
        }
      }
    }
  }
}

module.exports = SurveyModel