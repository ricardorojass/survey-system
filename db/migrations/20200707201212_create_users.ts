import * as Knex from "knex";

const tableName = 'users'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, table => {
    table.increments("id")
    table.string("email", 100).notNullable()
    table.string("password", 255).notNullable()
    table.string("name", 100).notNullable()
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()

    table.unique(["email"])
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName)
}

