import { useEffect, useState, MouseEvent } from 'react'
import { Task } from '../../models/task'
import { useAppDispatch } from '../hooks'
import { removeAllCompletedTasks } from '../actions/tasks'

interface Props {
  data: Task[]
}

function Footer(props: Props) {
  const dispatch = useAppDispatch()
  const [activeTaskCount, setActiveTaskCount] = useState<string>('')
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0)

  useEffect(() => {
    const activeCount = props.data.filter((task) => !task.isComplete).length
    setActiveTaskCount(String(activeCount))
  }, [props.data])

  useEffect(() => {
    const completedCount = props.data.filter((task) => task.isComplete).length
    setCompletedTaskCount(completedCount)
  }, [props.data])

  function handleCompleteAll(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    dispatch(removeAllCompletedTasks())
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeTaskCount} items</span>
      <ul className="filters">
        <li>
          <a href="#">All</a>
        </li>
        <li>
          <a href="#">Active</a>
        </li>
        <li>
          <a href="#">Completed</a>
        </li>
      </ul>
      {completedTaskCount > 0 ? (
        <button className="clear-completed" onClick={handleCompleteAll}>
          Clear completed
        </button>
      ) : (
        ''
      )}
    </footer>
  )
}
export default Footer
