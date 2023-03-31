import { Task } from "../../models/Task";

export const SET_TASK_PENDING = 'SET_TASK_PENDING'
export const SET_TASK_SUCCESS = 'SET_TASK_SUCCESS'
export const SET_ERROR = 'SET_ERROR'

export type TaskAction =
  | { type: typeof SET_TASK_PENDING; payload: null }
  | { type: typeof SET_TASK_SUCCESS; payload: TASK[] }
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

export function setError(errorMessage: string): TaskAction {
  return {
    type: SET_ERROR,
    payload: errorMessage,
  }
}