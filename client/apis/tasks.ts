import request from 'superagent'
import { Task, NewTask,} from '../../models/task'

const rootUrl = '/api/v1/task'

export async function getTasks(): Promise<Task[]> {
  const response = await request.get(rootUrl + '/list')
  return response.body.tasks
}

export async function getFilteredTasks(isComplete: boolean): Promise<Task[]> {
  const response = await request.get(rootUrl + '/list')
  const tasks: Task[] = response.body.tasks
  return tasks.filter((task) => {
    return task.isComplete === isComplete
  })
}

export async function addTask(newTask: NewTask): Promise<Task> {
  const response = await request.post(rootUrl + '/').send(newTask)
  return response.body.task
}

export async function deleteTask(taskId: string): Promise<number> {
  const response = await request.post(rootUrl + '/delete/' + taskId)
  return response.statusCode
}

export async function completeTask(
  taskId: number,
  isComplete: boolean
): Promise<number> {
  const dateToday = isComplete ? new Date().toISOString() : null
  const task = [{ id: taskId, completedAt: dateToday }]

  const response = await request.post(rootUrl + '/update').send(task)
  return response.statusCode
}
