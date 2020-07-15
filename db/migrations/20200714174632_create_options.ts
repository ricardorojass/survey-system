import * as Knex from "knex";

const tableName = 'options'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, table => {
    table.increments("id")
    table.integer("questionId").unsigned().notNullable()
    table.string("description", 255).notNullable()
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable()


    table.foreign('questionId').references('id').inTable('questions')
    table.index(['questionId'])
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName)
}

