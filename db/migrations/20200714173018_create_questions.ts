import * as Knex from "knex";

const tableName = 'questions'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, table => {
    table.increments("id")
    table.integer("surveyId").unsigned().notNullable()
    table.string("title", 255).notNullable()
    table.text("description").notNullable()
    table.boolean("required").notNullable()
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable()


    table.foreign('surveyId').references('id').inTable('surveys')
    table.index(['surveyId'])
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName)
}

