const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')
const connection = require('knex')(config[environment])

import { Task, NewTask, UpdatedTask } from '../../models/task'

export function getAllTasksByUser(
  authId = 1,
  db = connection
): Promise<Task[]> {
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

export function getTaskListIdByUser(auth = 1, db = connection) {
  return db('task_list').where({ user_id: auth }).select('id')
}

export function createTask(
  newTask: NewTask,
  db = connection
): Promise<number[]> {
  return db('tasks')
    .insert({
      description: newTask.description,
      created_at: newTask.createdAt,
      completed_at: newTask.completedAt,
      task_list_id: newTask.taskListId,
    })
    .returning(['id'])
}

export function updateTask(
  id: number,
  updatedTask: UpdatedTask,
  db = connection
): Promise<number> {
  return db('tasks')
    .update({
      description: updatedTask.description,
      completed_at: updatedTask.completedAt,
    })
    .where({ id: id })
    .returning('id')
}

export function deleteTask(id: number, db = connection): Promise<number> {
  return db('tasks').where({ id }).delete()
}

export function deleteCompletedTasks(db = connection): Promise<number> {
  return db('tasks').whereNotNull('completed_at').del()
}
