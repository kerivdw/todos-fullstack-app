import { combineReducers } from 'redux'
import tasksReducer from './tasksReducer'
import filterReducer from './filterReducer'

export default combineReducers({
  tasks: tasksReducer,
  filters: filterReducer,
})
