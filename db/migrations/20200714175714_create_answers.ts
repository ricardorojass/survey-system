import * as Knex from "knex";

const tableName = 'answers'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, table => {
    table.increments("id")
    table.integer("responseId").unsigned().notNullable()
    table.integer("optionId").unsigned().notNullable()
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable()


    table.foreign('responseId').references('id').inTable('responses')
    table.foreign('optionId').references('id').inTable('options')
    table.index(['responseId', 'optionId'])
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName)
}

