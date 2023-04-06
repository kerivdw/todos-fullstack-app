import { useEffect, useState, MouseEvent } from 'react'
import { useAppDispatch } from '../hooks'
import { Task } from '../../models/task'
import { removeAllCompletedTasks } from '../actions/tasks'
import Filter from './Filter'

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
      <span className="todo-count">{activeTaskCount} active items</span>
      <Filter />
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
