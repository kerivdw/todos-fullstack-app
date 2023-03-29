/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable('tasks', (table) => {
      table.increments('id').primary()
      table.string('description')
      table.dateTime('created_at')
      table.dateTime('completed_at')
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
  await knex.schema.dropTable('tasks').catch((error) => {
    return error
  })
}
