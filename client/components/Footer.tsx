import { useEffect, useState } from 'react'
import { Task } from '../../models/task'

interface Props {
  data: Task[]
}

function Footer(props: Props) {
  console.log(`props data`, props.data)
  const [activeTaskCount, setActiveTaskCount] = useState<string>('')
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0)

  useEffect(() => {
    const activeCount = props.data.filter((task) => !task.isComplete).length
    console.log(`active`, activeCount)
    setActiveTaskCount(String(activeCount))
  }, [props.data])

  useEffect(() => {
    const completedCount = props.data.filter((task) => task.isComplete).length
    console.log(`completed`, completedCount)
    setCompletedTaskCount(completedCount)
  }, [props.data])

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
        <button className="clear-completed">Clear completed</button>
      ) : (
        ''
      )}
    </footer>
  )
}
export default Footer
