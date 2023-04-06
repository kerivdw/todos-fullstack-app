import {
  getTasks,
  addTask,
  deleteTask,
  completeTask,
  clearCompletedTasks,
} from '../apis/tasks'
import { Task, NewTask, UpdatedTask } from '../../models/task'
import { Dispatch } from 'redux'
import { ThunkAction } from '../store'

export const SET_TASK_PENDING = 'SET_TASK_PENDING'
export const ADD_TASK_SUCCESS = 'SET_TASK_SUCCESS'
export const SET_TASKS_SUCCESS = 'SET_TASKS_SUCCESS'
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const DELETE_COMPLETED_TASK_SUCCESS = 'DELETE_COMPLETED_TASK_SUCCESS'
export const SET_ERROR = 'SET_ERROR'

export type TaskAction =
  | { type: typeof SET_TASK_PENDING; payload: null }
  | { type: typeof SET_TASKS_SUCCESS; payload: Task[] }
  | { type: typeof ADD_TASK_SUCCESS; payload: Task }
  | { type: typeof UPDATE_TASK_SUCCESS; payload: Task }
  | { type: typeof DELETE_TASK_SUCCESS; payload: string }
  | { type: typeof DELETE_COMPLETED_TASK_SUCCESS; payload: Task[] }
  | { type: typeof SET_ERROR; payload: string }

export function setTaskPending(): TaskAction {
  return {
    type: SET_TASK_PENDING,
    payload: null,
  }
}

export function setTasksSuccess(tasks: Task[]): TaskAction {
  return {
    type: SET_TASKS_SUCCESS,
    payload: tasks,
  }
}

export function addTaskSuccess(task: Task): TaskAction {
  return {
    type: ADD_TASK_SUCCESS,
    payload: task,
  }
}

export function updateTaskSuccess(updateTask: Task): TaskAction {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: updateTask,
  }
}

export function deleteTaskSuccess(taskId: string): TaskAction {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: taskId,
  }
}

export function deleteCompletedTaskSuccess(): TaskAction {
  return {
    type: DELETE_COMPLETED_TASK_SUCCESS,
    payload: [],
  }
}

export function setError(errorMessage: string): TaskAction {
  return {
    type: SET_ERROR,
    payload: errorMessage,
  }
}

export function fetchTasks(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(setTaskPending())
    return getTasks()
      .then((tasks) => {
        dispatch(setTasksSuccess(tasks))
      })
      .catch((err) => {
        dispatch(setError(err.errorMessage))
      })
  }
}

export function addNewTask(newTask: NewTask): ThunkAction {
  return (dispatch: Dispatch) => {
    return addTask(newTask)
      .then((task) => {
        dispatch(addTaskSuccess(task))
      })
      .catch((err) => {
        dispatch(setError(err.message))
      })
  }
}

export function removeTask(taskId: string): ThunkAction {
  return (dispatch: Dispatch) => {
    return deleteTask(taskId)
      .then(() => {
        dispatch(deleteTaskSuccess(taskId))
      })
      .catch((err) => {
        console.log(err)
        dispatch(setError(err.message))
      })
  }
}

export function removeAllCompletedTasks(): ThunkAction {
  return (dispatch: Dispatch) => {
    return clearCompletedTasks()
      .then(() => {
        dispatch(deleteCompletedTaskSuccess())
      })
      .catch((err) => {
        console.log(err)
        dispatch(setError(err.message))
      })
  }
}

export function updateTaskComplete(
  taskId: number,
  isComplete: boolean
): ThunkAction {
  return (dispatch: Dispatch) => {
    return completeTask(taskId, isComplete)
      .then(() => {
        dispatch(
          updateTaskSuccess({
            id: taskId,
            isComplete: isComplete,
            description: '',
            createdAt: '',
            taskListId: 0,
          })
        )
      })
      .catch((err) => {
        console.log(err)
        dispatch(setError(err.message))
      })
  }
}
