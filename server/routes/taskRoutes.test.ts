import request from 'supertest'
import server from '../server'
import { Task, NewTask } from '../../models/Task'

import * as db from '../db'

jest.mock('../db')

beforeEach(() => {
  jest.resetAllMocks()
})

//TODO Finish writing API Tests
describe('GET /api/v1/task/list', () => {
  it('Should return the list of tasks', async () => {
    jest.mocked(db.getAllTasksByUser).mockResolvedValue([
      {
        id: 1,
        description: 'Head To The Gym',
        createdAt: '2023-03-29T08:56:01.152Z',
        completedAt: null,
        taskListId: 1,
      },
      {
        id: 2,
        description: 'Watch A Bad Movie',
        createdAt: '2023-03-28T08:56:01.152Z',
        completedAt: null,
        taskListId: 1,
      },
    ])

    const response = await request(server).get('/api/v1/task/list')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      tasks: [
        {
          completedAt: null,
          createdAt: '2023-03-29T08:56:01.152Z',
          description: 'Head To The Gym',
          id: 1,
          taskListId: 1,
        },
        {
          completedAt: null,
          createdAt: '2023-03-28T08:56:01.152Z',
          description: 'Watch A Bad Movie',
          id: 2,
          taskListId: 1,
        },
      ],
    })
  })

  it('Should return an error when tasks cannot be retrieved', async () => {
    jest.mocked(db.getAllTasksByUser).mockRejectedValue({
      status: 500,
      data: {
        message: 'Internal server error',
      },
    })

    const response = await request(server).get('/api/v1/task/list')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      error: 'There was an error retrieving the tasks',
    })
  })
})

describe('POST /api/v1/task', () => {
  it('Should create a task', async () => {
    jest.mocked(db.createTask).mockResolvedValue([1])

    const mockCreateTask = jest.fn().mockResolvedValue([
      {
        description: 'New Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      },
    ])

    jest.mock('../db', () => ({
      createTask: mockCreateTask,
    }))

    const requestBody = [
      {
        description: 'New Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/')
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      task: {
        id: 1,
        description: 'New Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      },
    })
  })

  it('Should return an error when a task cannot be created', async () => {
    jest.mocked(db.createTask).mockRejectedValue({
      status: 500,
      data: {
        message: 'Internal server error',
      },
    })

    const response = await request(server).post('/api/v1/task/')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      error: 'There was an error creating the task',
    })
  })
})

describe('POST /api/v1/task/update', () => {
  it.todo('Should update the completed at date')
  it.todo('Should update the description')
  it.todo('Should return an error when a task cannot be updated')
})

describe('POST /api/v1/task/delete', () => {
  it.todo('Should delete a task')
  it.todo('Should return an error if no tasks are deleted')
  it.todo('Should return an error if more than one task is deleted')
  it.todo('Should return an error when a task cannot be deleted')
})
