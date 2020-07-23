import * as Knex from "knex";

const tableName = 'surveys'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(tableName, table => {
    table.dropForeign(['userId'])

    table
      .foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, table => {
    table.dropForeign(['userId'])
    
    table
      .foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION')
  })
}

