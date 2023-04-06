import { FilterAction } from '../actions/filter'

export interface FilterState {
  filter: string
}

const initialState: FilterState = {
  filter: 'all',
}

const filterReducer = (state = initialState, action: FilterAction) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state
  }
}

export default filterReducer
