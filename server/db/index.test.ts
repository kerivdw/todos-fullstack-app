import { Task, TaskList } from '../../models/Task'

const environment = 'test'
const config = require('./knexfile')
const testConnection = require('knex')(config[environment])

const { beforeEach } = require('node:test')

const {
  getAllTasksByUser,
  createTask,
  updateTask,
  deleteTask,
} = require('./index')

beforeAll(async () => {
  await testConnection.migrate.latest()

  //doesn't seem to wait for beforeEach on the first run
  //I have added to before all as well.
  await testConnection.seed.run()
})

beforeEach(() => {
  return testConnection.seed.run()
})

describe('Tasks', () => {
  it.todo('should return all the tasks for a user')
  it.todo('should create a new task on a list')
  it.todo('should update the task description')
  it.todo('should update the task completed date')
  it.todo('should delete a task')
})
