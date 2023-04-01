import request from 'superagent'
import { Task } from '../../models/task'

const rootUrl = '/api/v1/task'

export async function getTasks(): Promise<Task[]> {
  const response = await request.get(rootUrl + '/list')
  console.log(response.body)
  return response.body.tasks

}
