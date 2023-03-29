import express from 'express'
import { Task, NewTask, UpdatedTask } from '../../models/Task'

import { getAllTasksByUser, createTask, updateTask, deleteTask } from '../db'

const router = express.Router()

router.use(express.json())

//GET /api/v1/task/list
router.get('/list', async (_, res) => {
  try {
    //hard coded for mvp
    const currentUser = 1
    const taskArr: Task[] = await getAllTasksByUser(currentUser)
    res.json({ tasks: taskArr })
  } catch (error) {
    res.status(500).json({
      error: 'There was an error retrieving the tasks',
    })
  }
})

//POST /api/v1/task
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const [{ description, taskListId }] = req.body
    if (!description) {
      res.status(400).send('The task description is missing')
      return
    }
    if (!taskListId) {
      res.status(400).send('The list is missing')
      return
    }
    console.log(description)
    console.log(taskListId)

    const date = new Date().toISOString()

    const newTask: NewTask = {
      description: description,
      createdAt: date,
      completedAt: null,
      taskListId: taskListId,
    }

    const id = await createTask(newTask)
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
    console.log(error)
    res.status(500).json({
      error: 'There was an error creating the task',
    })
  }
})

//POST /api/v1/task/update
router.post('/update', async (req, res) => {
  try {
    console.log(req.body)
    const [{ id, description, createdAt, completedAt, taskListId }] = req.body
    if (!id) {
      res.status(400).send('The task id is missing')
      return
    }
    if (!description && !completedAt) {
      res.status(400).send('The description or completed date are missing')
      return
    }

    const updatedTask: UpdatedTask = {
      description: description,
      createdAt: createdAt,
      completedAt: completedAt,
      taskListId: taskListId,
    }

    const response = await updateTask(id, updatedTask)
    console.log(response)
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
      error: 'There was an error creating the task',
    })
  }
})

//POST /api/v1/task/delete
router.post('/delete', async (req, res) => {
  try {
    console.log(req.body)
    const [{ id }] = req.body
    console.log(id)
    if (!id) {
      res.status(400).send('The task id is missing')
      return
    }
    const stuff = await deleteTask(id)
    console.log(stuff)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error deleting the task',
    })
  }
})

export default router
