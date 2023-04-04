import {
  SET_TASK_PENDING,
  SET_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_COMPLETED_TASK_SUCCESS,
  SET_ERROR,
  TaskAction,
} from '../actions/tasks'
import { Task } from '../../models/task'

export interface TaskState {
  loading: boolean
  error: string | undefined
  data: Task[]
}

const initialState: TaskState = {
  loading: false,
  error: undefined,
  data: [],
}

const reducer = (state = initialState, action: TaskAction): TaskState => {
  switch (action.type) {
    case SET_TASK_PENDING:
      return {
        loading: true,
        error: undefined,
        data: [],
      }
    case SET_TASKS_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      }
    case ADD_TASK_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: [...state.data, action.payload],
      }
    case UPDATE_TASK_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: [
          ...state.data.map((task) =>
            task.id === action.payload.id
              ? { ...task, completedAt: action.payload.completedAt, isComplete: action.payload.isComplete }
              : task
          ),
        ],
      }
    case DELETE_TASK_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: [
          ...state.data.filter((task) => task.id !== Number(action.payload)),
        ],
      }
    case DELETE_COMPLETED_TASK_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: [
          ...state.data.map((task) =>
            task.createdAt !== null),
        ],
      }
    case SET_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      }
    default:
      return state
  }
}
export default reducer
