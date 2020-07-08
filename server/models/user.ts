const knex = require('knex')
const { Model } = require('objection')
const knexConfig = require('../../knexfile')

Model.knex(knex(knexConfig.development))

class UserModel extends Model {
  
  static get tableName() {
    return 'users'
  }
}

module.exports = UserModel