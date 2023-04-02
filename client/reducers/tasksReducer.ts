import {
  SET_TASK_PENDING,
  SET_TASK_SUCCESS,
  SET_ERROR,
  TaskAction,
} from '../actions/taskActions'
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
    case SET_TASK_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
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
