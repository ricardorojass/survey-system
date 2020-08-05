import * as Knex from "knex";

const tableName = 'users'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(tableName, table => {
    table.dropUnique(['email'])
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, table => {
    table.unique(["email"])
  })
}

