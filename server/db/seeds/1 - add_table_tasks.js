/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const dateToday = new Date()
const dateYesterday = new Date(dateToday)
dateYesterday.setDate(dateToday.getDate() - 1)

const dateLastWeek = new Date(dateToday)
dateLastWeek.setDate(dateToday.getDate() - 7)

exports.seed = async function (knex) {
  await knex('tasks').insert([
    {
      description: 'Head To The Gym',
      created_at: dateToday.toISOString(),
      completed_at: null,
      task_list_id: 1,
    },
    {
      description: 'Watch A Bad Movie',
      created_at: dateYesterday.toISOString(),
      completed_at: null,
      task_list_id: 1,
    },
    {
      description: 'Go Camping',
      created_at: dateLastWeek.toISOString(),
      completed_at: dateYesterday.toISOString(),
      task_list_id: 1,
    },
    {
      description: 'Plant a Garden',
      created_at: dateLastWeek.toISOString(),
      completed_at: dateLastWeek.toISOString(),
      task_list_id: 1,
    },
  ])

  await knex('task_list').insert([
    {
      id: 1,
      user_id: null,
    },
  ])
}
