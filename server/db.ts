import knex from 'knex'
import config from '../knexfile'

console.log('db', process.env.NODE_ENV);
console.log('db', config[process.env.NODE_ENV]);

export default knex(config[process.env.NODE_ENV || "development"]);
