/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('tasks', (table) => {
    table.foreign('task_list_id').references('id').inTable('tasks_list')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('tasks', (table) => {
    table.dropForeign(['task_list_id'])
  })
}
