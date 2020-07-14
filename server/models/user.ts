const knex = require('knex')
const { Model } = require('objection')
const knexConfig = require('../../knexfile')

Model.knex(knex(knexConfig.development))

class UserModel extends Model {
  
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'name'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 8, maxLength: 50 },
        password: { type: 'string', minLength: 6, maxLength: 20 },
        name: { type: 'string', minLength: 3, maxLength: 50 }
      }
    }
  }
}

module.exports = UserModel