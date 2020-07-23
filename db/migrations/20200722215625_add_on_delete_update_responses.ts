import * as Knex from "knex";

const tableName = 'responses'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(tableName, table => {
    table.dropForeign(['surveyId'])

    table
      .foreign('surveyId')
      .references('id')
      .inTable('surveys')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, table => {
    table.dropForeign(['surveyId'])
    
    table
      .foreign('surveyId')
      .references('id')
      .inTable('surveys')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION')
  })
}

