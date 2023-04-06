import express from 'express'
import { Task, NewTask, UpdatedTask } from '../../models/task'

import {
  getAllTasksByUser,
  createTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
} from '../db'

const router = express.Router()

router.use(express.json())

//GET /api/v1/task/list
router.get('/list', async (_, res) => {
  try {
    //hard coded for mvp, may allow authentication in the future
    //that will allow more than one
    const currentUser = 1

    const dataResults: Task[] = await getAllTasksByUser(currentUser)

    const taskArray: Task[] = await dataResults.map((task) => {
      return { ...task, isComplete: task.completedAt !== null }
    })

    res.json({ tasks: taskArray })
  } catch (error) {
    res.status(500).json({
      error: 'There was an error retrieving the tasks',
    })
  }
})

//POST /api/v1/task
router.post('/', async (req, res) => {
  try {
    const { description, taskListId, createdAt } = req.body
    if (!description) {
      res.status(400).send('The task description is missing')
      return
    }
    if (!taskListId) {
      res.status(400).send('The list is missing')
      return
    }
    if (!createdAt) {
      res.status(400).send('The created date is missing')
      return
    }

    const newTask: NewTask = {
      description: description,
      createdAt: createdAt,
      completedAt: null,
      taskListId: taskListId,
    }

    const [id] = await createTask(newTask)

    res.json({
      task: {
        id: id,
        description: newTask.description,
        createdAt: newTask.createdAt,
        completedAt: newTask.completedAt,
        taskListId: newTask.taskListId,
      },
    })
  } catch (error) {
    res.status(500).json({
      error: 'There was an error creating the task',
    })
  }
})

//POST /api/v1/task/update
router.post('/update', async (req, res) => {
  try {
    const [{ id, description, createdAt, completedAt, taskListId }] = req.body
    if (!id) {
      res.status(400).send('The task id is missing')
      return
    }

    const updatedTask: UpdatedTask = {
      description: description,
      createdAt: createdAt,
      completedAt: completedAt,
      taskListId: taskListId,
    }

    await updateTask(id, updatedTask)
    res.json({
      task: {
        id: id,
        description: updatedTask.description,
        createdAt: createdAt,
        completedAt: updatedTask.completedAt,
        taskListId: taskListId,
      },
    })
  } catch (error) {
    res.status(500).json({
      error: 'There was an error updating the task',
    })
  }
})

//POST /api/v1/task/delete
router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).send('The task id is missing')
      return
    }
    const recordsUpdated = await deleteTask(Number(id))
    if (recordsUpdated === 1) {
      res.sendStatus(204)
    }
    if (recordsUpdated === 0) {
      res.status(503).send('the task record does not exist')
    }
    if (recordsUpdated > 1) {
      res.status(500).send('more than one record was deleted in error')
    }
  } catch (error) {
    res.status(500).json({
      error: 'There was an error deleting the task',
    })
  }
})

//POST /api/v1/task/deleteCompleted
router.post('/deleteCompleted', async (req, res) => {
  try {
    const recordsUpdated = await deleteCompletedTasks()
    if (recordsUpdated >= 1) {
      res.sendStatus(204)
    }
    if (recordsUpdated === 0) {
      res.status(503).send('there are no completed tasks')
    }
  } catch (error) {
    res.status(500).json({
      error: 'There was an error deleting the task',
    })
  }
})

export default router
