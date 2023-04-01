import request from 'supertest'
import server from '../server'

import * as db from '../db'

jest.mock('../db')

beforeEach(() => {
  jest.resetAllMocks()
})


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

    const requestBody = {
        description: 'New Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      }
    

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

  it('Should return an error when the description is missing', async () => {
    const requestBody = [
      {
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/')
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.text).toBe('The task description is missing')
  })

  it('Should return an error when the taskId is missing', async () => {
    const requestBody = {
        description: 'New Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
      }

    const response = await request(server)
      .post('/api/v1/task/')
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.text).toBe('The list is missing')
  })

  it('Should return an error when createdAt is missing', async () => {
    const requestBody = {
        description: 'New Task',
        createdAt: null,
        completedAt: null,
        taskListId: 1,
      }

    const response = await request(server)
      .post('/api/v1/task/')
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.text).toBe('The created date is missing')
  })

  it('Should return an error when a task cannot be created', async () => {
    jest.mocked(db.createTask).mockRejectedValue({
      status: 500,
      data: {
        message: 'Internal server error',
      },
    })

       const requestBody = {
        description: 'New Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      }

      const response = await request(server)
      .post('/api/v1/task/')
      .send(requestBody)


    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      error: 'There was an error creating the task',
    })
  })
})

describe('POST /api/v1/task/update', () => {
  it('Should update the completed at date', async () => {
    jest.mocked(db.createTask).mockResolvedValue([1])

    const mockUpdatedTask = jest.fn().mockResolvedValue([
      {
        id: 1,
        description: 'Update Task',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      },
    ])

    jest.mock('../db', () => ({
      updatedTask: mockUpdatedTask,
    }))

    const requestBody = [
      {
        id: 1,
        completedAt: '2023-03-29T14:57:17.351Z',
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/update')
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      task: {
        id: 1,
        completedAt: '2023-03-29T14:57:17.351Z',
      },
    })
  })
  it('Should update the description', async () => {
    jest.mocked(db.createTask).mockResolvedValue([1])

    const mockUpdatedTask = jest.fn().mockResolvedValue([
      {
        id: 1,
        description: 'Updated Task Description',
        createdAt: '2023-03-29T14:57:17.351Z',
        completedAt: null,
        taskListId: 1,
      },
    ])

    jest.mock('../db', () => ({
      updatedTask: mockUpdatedTask,
    }))

    const requestBody = [
      {
        id: 1,
        description: 'Updated Task Description',
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/update')
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      task: {
        id: 1,
        description: 'Updated Task Description',
      },
    })
  })
  it('Should return an error when id is missing', async () => {
    const requestBody = [
      {
        description: 'New Task',
        createdAt: null,
        completedAt: null,
        taskListId: 1,
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/update')
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.text).toBe('The task id is missing')
  })
  it('Should return an error when the description and completedAt are missing', async () => {
    const requestBody = [
      {
        id: 1,
        createdAt: null,
        taskListId: 1,
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/update')
      .send(requestBody)

    expect(response.status).toBe(400)
    expect(response.text).toBe('The description or completed date are missing')
  })
  it('Should return an error when a task cannot be updated', async () => {
    jest.mocked(db.createTask).mockRejectedValue({
      status: 500,
      data: {
        message: 'Internal server error',
      },
    })

    const response = await request(server).post('/api/v1/task/update')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      error: 'There was an error updating the task',
    })
  })
})

describe('POST /api/v1/task/delete', () => {
  it('Should delete a task', async () => {
    jest.mocked(db.deleteTask).mockResolvedValue(1)

    const requestBody = [
      {
        id: 1,
      },
    ]

    const response = await request(server)
      .post('/api/v1/task/delete')
      .send(requestBody)

    expect(response.status).toBe(204)
  })

  it('Should return an error if no tasks are deleted', async () => {
    jest.mocked(db.deleteTask).mockResolvedValue(0)
    const requestBody = [
      {
        id: 1,
      },
    ]
    const response = await request(server)
      .post('/api/v1/task/delete')
      .send(requestBody)

    expect(response.status).toBe(503)
    expect(response.text).toBe('the task record does not exist')
  })
  it('Should return an error if more than one task is deleted', async () => {
    jest.mocked(db.deleteTask).mockResolvedValue(2)
    const requestBody = [
      {
        id: 1,
      },
    ]
    const response = await request(server)
      .post('/api/v1/task/delete')
      .send(requestBody)

    expect(response.status).toBe(500)
    expect(response.text).toBe('more than one record was deleted in error')
  })
  it('Should return an error when a task cannot be deleted', async () => {
    jest.mocked(db.deleteTask).mockRejectedValue({
      status: 500,
      data: {
        message: 'Internal server error',
      },
    })

    const response = await request(server).post('/api/v1/task/delete')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      error: 'There was an error deleting the task',
    })
  })
})
