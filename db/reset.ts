import knex from 'knex'
import config from '../knexfile'

const db = knex(config[process.env.NODE_ENV  || "development"])

async function seed() {
  await db("users").del()
}

seed().then(() => db.destroy()).catch(e => console.log(e))
