import filterReducer, { FilterState } from '../filterReducer'
import { setFilter } from '../../actions/filter'

const initialState: FilterState = {
  filter: 'all',
}

describe('taskReducer tests', () => {
  const filter = 'active'

  it('should set the filter', async () => {
    const action = setFilter(filter)
    const newState = filterReducer(initialState, action)

    expect(newState).toEqual({ filter: 'active' })
  })
})
