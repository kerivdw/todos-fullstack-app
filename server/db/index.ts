const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')
const connection = require('knex')(config[environment])

import { Task, NewTask, UpdatedTask } from '../../models/Task'

export function getAllTasksByUser(authId = 1, db = connection): Task[] {
  return db('tasks')
    .join('task_list', 'task_list.id', 'tasks.task_list_id')
    .where({ 'task_list.user_id': authId })
    .select(
      'tasks.id as id',
      'description',
      'created_at as createdAt',
      'completed_at as completedAt',
      'task_list_id as taskListId'
    )
}

export function createTask(newTask: NewTask, db = connection): number {
  return db('tasks')
    .insert({
      description: newTask.description,
      created_at: newTask.createdAt,
      completed_at: newTask.completedAt,
      task_list_id: newTask.taskListId,
    })
    .returning('id')
}

export function updateTask(
  id: number,
  updatedTask: UpdatedTask,
  db = connection
): number {
  return db('tasks')
    .update({
      description: updatedTask.description,
      completed_at: updatedTask.completedAt,
    })
    .where({ id: id })
    .returning('id')
}

export function deleteTask(id: number, db = connection): number {
  return db('tasks').where({ id }).delete().returning('id')
}
