import * as Knex from "knex";

const tableName = 'options'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(tableName, table => {
    table.dropForeign(['questionId'])

    table
      .foreign('questionId')
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, table => {
    table.dropForeign(['questionId'])
    
    table
      .foreign('questionId')
      .references('id')
      .inTable('questions')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION')
  })
}

