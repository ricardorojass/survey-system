import knex from 'knex'
import * as config from '../../../knexfile'

async function dbSetup() {
  const db = knex(config[process.env.NODE_ENV || "development"])
  await db("users").del()


  return db
}

module.exports = dbSetup