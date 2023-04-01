import request from 'superagent'
import { Task, NewTask } from '../../models/task'

const rootUrl = '/api/v1/task'

export async function getTasks(): Promise<Task[]> {
  const response = await request.get(rootUrl + '/list')
  return response.body.tasks

}

export async function addTask(newTask: NewTask) : Promise<Task> {
  const response = await request.post(rootUrl + '/').send(newTask)
  return response.body.task
}

export async function deletesTask(taskId: string) : Promise<number> {
  const response = await request.post(rootUrl + '/delete/' + taskId)
  console.log(response)
  return 1
}