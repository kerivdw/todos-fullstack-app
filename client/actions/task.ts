import { getTasks, addTask, deletesTask } from '../apis/tasks'
import { Task, NewTask } from '../../models/task'
import { Action, Dispatch } from 'redux'
import { RootState, ThunkAction } from '../store'

export const SET_TASK_PENDING = 'SET_TASK_PENDING'
export const SET_TASK_SUCCESS = 'SET_TASK_SUCCESS'
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const SET_ERROR = 'SET_ERROR'

export type TaskAction =
  | { type: typeof SET_TASK_PENDING; payload: null }
  | { type: typeof SET_TASK_SUCCESS; payload: Task[] }
  | { type: typeof ADD_TASK_SUCCESS; payload: NewTask }
  | { type: typeof DELETE_TASK_SUCCESS; payload: string }
  | { type: typeof SET_ERROR; payload: string }

export function setTaskPending(): TaskAction {
  return {
    type: SET_TASK_PENDING,
    payload: null,
  }
}

export function setTaskSuccess(tasks: Task[]): TaskAction {
  return {
    type: SET_TASK_SUCCESS,
    payload: tasks,
  }
}

export function addTaskSuccess(newTask: NewTask): TaskAction {
  return {
    type: ADD_TASK_SUCCESS,
    payload: newTask,
  }
}

export function deleteTaskSuccess(taskId: string): TaskAction {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: taskId,
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
        dispatch(setTaskSuccess(tasks))
      })
      .catch((err) => {
        dispatch(setError(err.errorMessage))
      })
  }
}

export function addNewTask(newTask: NewTask): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(setTaskPending())
    return addTask(newTask)
      .then(() => {
        dispatch(addTaskSuccess(newTask))
      })
      .catch((err) => {
        dispatch(setError(err.message))
      })
  }
}

export function deleteTask(taskId: string): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(setTaskPending())
    return deletesTask(taskId)
      .then(() => {
        dispatch(deleteTaskSuccess(taskId))
      })
      .catch((err) => {
        console.log(err)
        dispatch(setError(err.message))
      })
  }
}
