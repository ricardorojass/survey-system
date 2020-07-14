import * as Knex from "knex";

const tableName = 'surveys'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, table => {
    table.increments("id")
    table.integer("userId").unsigned().notNullable()
    table.string("title", 255).notNullable()
    table.text("description").notNullable()
    table.string("headerUrl", 255).notNullable()
    table.jsonb("themeColor").notNullable()
    table.jsonb("backgroundColor").notNullable()
    table.jsonb("fontStyle").notNullable()
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable()


    table.foreign('userId').references('id').inTable('users')
    table.index(['userId'])
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName)
}

