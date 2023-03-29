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
    },
    {
      description: 'Watch A Bad Movie',
      created_at: dateYesterday.toISOString(),
      completed_at: null,
    },
    {
      description: 'Go Camping',
      created_at: dateLastWeek.toISOString(),
      completed_at: dateYesterday.toISOString(),
    },
    {
      description: 'Plant a Garden',
      created_at: dateLastWeek.toISOString(),
      completed_at: dateLastWeek.toISOString(),
    },
  ])
}
