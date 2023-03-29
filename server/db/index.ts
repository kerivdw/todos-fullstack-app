const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')
const connection = require('knex')(config[environment])

import {Tasks, TaskList} from '../../models.Tasks'



export function GetAllTasks(authId = 1, db = connection): TaskList {
  return db('tasks').select()
}