import { NewTask, Task, UpdatedTask } from '../../../models/task'

const environment = 'test'
const config = require('../knexfile')
const testConnection = require('knex')(config[environment])

import { beforeEach } from 'node:test'
import { deleteCompletedTasks, getTaskListIdByUser } from '..'

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
    //Act and Assert
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
    //Arrange
    const newTask: NewTask = {
      description: 'Test Task',
      createdAt: '2023-03-22T05:03:29.776Z',
      completedAt: '2023-03-22T05:03:29.776Z',
      taskListId: 1,
    }
    //Act
    await createTask(newTask)

    //Assert
    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(5)
      expect(tasks[4].description).toBe('Test Task')
      expect(tasks[4].createdAt).toBe('2023-03-22T05:03:29.776Z')
      expect(tasks[4].completedAt).toBe('2023-03-22T05:03:29.776Z')
      expect(tasks[4].taskListId).toBe(1)
    })
  })
  it('should update the task description', async () => {
    //Arrange
    const updatedTask: UpdatedTask = {
      description: 'Test Task 2',
    }

    const tasks = await getAllTasksByUser(1)

    //Act
    await updateTask(tasks[0].id, updatedTask)

    //Assert
    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(5)
      expect(tasks[0].description).toBe('Test Task 2')
    })
  })

  it('should update the task completed date', async () => {
    //Arrange
    const updatedTask: UpdatedTask = {
      completedAt: '2023-03-23T05:03:29.776Z',
    }

    const tasks = await getAllTasksByUser(1)

    //Act
    await updateTask(tasks[0].id, updatedTask)

    //Assert
    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(5)
      expect(tasks[0].completedAt).toBe('2023-03-23T05:03:29.776Z')
    })
  })

  it('should delete a task', async () => {
    //Arrange
    const taskList = await getAllTasksByUser(1)

    //Act
    await deleteTask(taskList[0].id)

    //Assert
    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toHaveLength(4)
      expect(tasks).not.toContain(taskList[0].id)
    })
  })

  it('should delete all completed tasks', async () => {
    //Arrange
    const taskList = await getAllTasksByUser(1)
    const taskActive: Task[] = taskList.filter(
      (task: Task) => task.completedAt === null
    )

    //Act
    await deleteCompletedTasks()

    //Assert
    await getAllTasksByUser(1).then((tasks: Task[]) => {
      expect(tasks).toEqual(taskActive)
      expect(taskActive).toHaveLength(1)
    })
  })
})
