import { setFilter } from '../actions/filter'
import { useAppSelector, useAppDispatch } from '../hooks'

function Filter() {
  const { filter } = useAppSelector((state) => state.filters)
  const dispatch = useAppDispatch()

  const filterList = ['all', 'active', 'completed']

  const handleFilterClick = (value: string) => {
    dispatch(setFilter(value))
  }

  return (
    <ul className="filters">
      <>
        {filterList.map((filterItem, index) => {
          return (
            <li key={index}>
              <button
                type="button"
                className={filter === filterItem ? 'selected' : ''}
                onClick={() => handleFilterClick(filterItem)}
              >
                {filterItem}
              </button>
            </li>
          )
        })}
      </>
    </ul>
  )
}
export default Filter
