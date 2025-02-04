import { Knex } from "knex";

const tableName = 'tasks';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.dateTime('due_date');
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName);
}

