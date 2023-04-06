import { setFilter } from '../actions/filter'
import { useAppSelector, useAppDispatch } from '../hooks'

function Filter() {
  const dispatch = useAppDispatch()
  const { filter } = useAppSelector((state) => state.filters)
  const filterList = ['all', 'active', 'completed']

  const handleFilterClick = (value: string) => {
    dispatch(setFilter(value))
  }

  return (
    <ul className="filters">
      {filterList.map((filterItem) => {
        return (
          <>
            <li>
              <button
                type="button"
                className={filter === filterItem ? 'selected' : ''}
                onClick={() => handleFilterClick(filterItem)}
              >
                {filterItem}
              </button>
            </li>
          </>
        )
      })}
    </ul>
  )
}
export default Filter
