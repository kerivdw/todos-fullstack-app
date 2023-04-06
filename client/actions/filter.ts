export const SET_FILTER = 'SET_FILTER'

export type FilterAction = { type: typeof SET_FILTER; payload: string }

export const setFilter = (filter: string): FilterAction => ({
  type: 'SET_FILTER',
  payload: filter,
})
