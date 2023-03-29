import request from 'supertest'
import server from '../server'
import { Task } from '../../models/Task'

import * as db from '../db'

jest.mock('../db')

beforeEach(() => {
  jest.resetAllMocks()
})

//TODO Finish writing API Tests
describe('GET /api/v1/task/list', () => {
  it.todo('Should return the list of tasks')

  // it('Should return the list of tasks', async () => {

  // jest.mocked(db.getAllTasksByUser(1).mockResolvedValue([
  //   {
  //     id: 1,
  //     description: 'Head To The Gym',
  //     createdAt: '2023-03-29T08:56:01.152Z',
  //     completedAt: null,
  //     taskListId: 1
  //   },
  //   {
  //     id: 2,
  //     description: 'Watch A Bad Movie',
  //     createdAt: '2023-03-28T08:56:01.152Z',
  //     completedAt: null,
  //     taskListId: 1
  //   }]))

  // const response = await request(server).get('/api/v1/task/list')

  // expect(response.status).toBe(200)
  // expect(response.body).toEqual([{
  //   "id": 1,
  //   "description": "Head To The Gym",
  //   "createdAt": "2023-03-29T04:26:30.863Z",
  //   "completedAt": null,
  //   "taskListId": 1
  // },
  // {
  //   "id": 2,
  //   "description": "Watch A Bad Movie",
  //   "createdAt": "2023-03-28T04:26:30.863Z",
  //   "completedAt": null,
  //   "taskListId": 1
  // }])

  // })
})

describe('POST /api/v1/task', () => {
  it.todo('Should create a task')
})

describe('POST /api/v1/task/update', () => {
  it.todo('Should update the completed at date')
  it.todo('Should update the description')
})
