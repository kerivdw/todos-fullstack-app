/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .alterTable('tasks', (table) => {
      table.foreign('tasks.task_list_id').references('task_list_id')
    })
    .catch((error) => {
      return error
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .alterTable('tasks', (table) => {
      table.foreign('tasks.task_list_id').dropForeign('task_list_id')
    })
    .catch((error) => {
      return error
    })
}
