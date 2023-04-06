import { useEffect, useState, MouseEvent } from 'react'
import { removeAllCompletedTasks } from '../actions/tasks'
import { useAppDispatch } from '../hooks'
import { Task } from '../../models/task'
import Filter from './Filter'

interface Props {
  data: Task[]
}

function Footer(props: Props) {
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0)
  const dispatch = useAppDispatch()

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
      <span className="todo-count">{props.data.length} items</span>
      <Filter />
      {completedTaskCount > 0 ? (
        <button className="clear-completed" onClick={handleCompleteAll}>
          clear completed
        </button>
      ) : (
        ''
      )}
    </footer>
  )
}
export default Footer
