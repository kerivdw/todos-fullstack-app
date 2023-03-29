const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')
const connection = require('knex')(config[environment])

import { Task, NewTask, UpdatedTask } from '../../models/Task'


export function getAllTasksByUser(authId = 1, db = connection): Task[] {
  return db('tasks')
    .join('task_list', 'task_list.id', 'tasks.task_list_id')
    .where({ 'task_list.user_id': authId })
    .returning(
      'tasks.id as id',
      'description',
      'created_at as createdAt',
      'completed_at as completedAt',
      'task_list_id as taskListId'
    )
}

export function createTask(newTask : NewTask , db = connection): number {
  return 1
}

export function updateTask(id: number, updatedTask: UpdatedTask, db = connection): number {
  return 1
}

export function deleteTask(id: number, db = connection) : number {
  return 1
}