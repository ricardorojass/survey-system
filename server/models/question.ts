import db from '../db'
const { Model } = require('objection')
const SurveyModel = require('./survey')

Model.knex(db)

class QuestionModel extends Model {
  
  static get tableName() {
    return 'questions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'surveyId'],
    }
  }

  static get relationMappings() {
    const OptionModel = require('./option')
    return {
      survey: {
        relation: Model.BelongsToOneRelation,
        modelClass: SurveyModel,
        join: {
          from: 'questions.surveyId',
          to: 'surveys.id'
        }
      },
      options: {
        relation: Model.HasManyRelation,
        modelClass: OptionModel,
        join: {
          from: 'questions.id',
          to: 'options.questionId'
        }
      }
    }
  }
}

module.exports = QuestionModel