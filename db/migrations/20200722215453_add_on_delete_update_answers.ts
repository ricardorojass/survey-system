import * as Knex from "knex";

const tableName = 'answers'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(tableName, table => {
    table.dropForeign(['optionId'])

    table
      .foreign('optionId')
      .references('id')
      .inTable('options')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, table => {
    table.dropForeign(['optionId'])
    
    table
      .foreign('optionId')
      .references('id')
      .inTable('options')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION')
  })
}

