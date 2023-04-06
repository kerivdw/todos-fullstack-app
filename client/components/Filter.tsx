import { setFilter } from '../actions/filter'
import { useAppDispatch } from '../hooks'

function Filter() {
  const dispatch = useAppDispatch()

  const handleFilterClick = (value: string) => {
    dispatch(setFilter(value))
  }

  return (
    <ul className="filters">
      <li>
        <button onClick={() => handleFilterClick('all')}>All</button>
      </li>
      <li>
        <button onClick={() => handleFilterClick('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => handleFilterClick('completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}
export default Filter