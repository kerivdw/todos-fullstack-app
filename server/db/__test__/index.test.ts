import { NewTask, Task, UpdatedTask } from '../../../models/task'

const environment = 'test'
const config = require('../knexfile')
const testConnection = require('knex')(config[environment])

import { beforeEach } from 'node:test'
import { getTaskListIdByUser } from '..'

const {
  getAllTasksByUser,
  createTask,
  updateTask,
  deleteTask,
} = require('../index')

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
  it('should return all the tasks for a user', async () => {
    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(4)
      expect(tasks[0].description).toBe('Head to the gym')
      const year = new Date().getFullYear()
      expect(tasks[0].createdAt).toContain(String(year))
      expect(tasks[0].completedAt).toBeNull()
      expect(tasks[0].taskListId).toBe(1)
    })
  })

  it('should return the list id for a user', async () => {
    const [{ id }] = await getTaskListIdByUser(1)
    expect(id).toBe(1)
  })

  it('should create a new task on a list', async () => {
    const newTask: NewTask = {
      description: 'Test Task',
      createdAt: '2023-03-22T05:03:29.776Z',
      completedAt: '2023-03-22T05:03:29.776Z',
      taskListId: 1,
    }
    await createTask(newTask)

    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(5)
      expect(tasks[4].description).toBe('Test Task')
      expect(tasks[4].createdAt).toBe('2023-03-22T05:03:29.776Z')
      expect(tasks[4].completedAt).toBe('2023-03-22T05:03:29.776Z')
      expect(tasks[4].taskListId).toBe(1)
    })
  })
  it('should update the task description', async () => {
    const updatedTask: UpdatedTask = {
      description: 'Test Task 2',
    }

    const tasks = await getAllTasksByUser(1)

    await updateTask(tasks[0].id, updatedTask)

    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(5)
      expect(tasks[0].description).toBe('Test Task 2')
    })
  })

  it('should update the task completed date', async () => {
    const updatedTask: UpdatedTask = {
      completedAt: '2023-03-23T05:03:29.776Z',
    }

    const tasks = await getAllTasksByUser(1)

    await updateTask(tasks[0].id, updatedTask)

    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(5)
      expect(tasks[0].completedAt).toBe('2023-03-23T05:03:29.776Z')
    })
  })

  it('should delete a task', async () => {
    const taskList = await getAllTasksByUser(1)

    await deleteTask(taskList[0].id)

    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(4)
      expect(tasks).not.toContain(taskList[0].id)
    })
  })

  it.todo('should delete all completed tasks')
})
