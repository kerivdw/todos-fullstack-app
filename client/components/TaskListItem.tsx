import { useAppDispatch } from '../hooks'
import { useRef, useState } from 'react'
import { Task } from '../../models/task'
import DeleteTask from './DeleteTask'
import { updateTaskComplete } from '../actions/taskActions'

interface Props {
  task: Task
  onTaskAdded: () => void
}

function TaskListItem(props: Props) {
  const dispatch = useAppDispatch()
  const checkboxRef = useRef<HTMLInputElement>(null)
  const [isCompleteClass, setIsCompleteClass] = useState(
    props.task.isComplete ? 'completed' : ''
  )

  function handleCheckboxChange() {
    switch (checkboxRef.current?.checked) {
      case true:
        setIsCompleteClass('completed')
        if (props.task.isComplete !== true) {
          dispatch(updateTaskComplete(props.task.id, true))
          props.onTaskAdded()
        }
        break
      case false:
        setIsCompleteClass('')
        if (props.task.isComplete === true) {
          dispatch(updateTaskComplete(props.task.id, false))
          props.onTaskAdded()
        }
        break
      default:
        return
    }
  }
  return (
    <li id="task-item" className={isCompleteClass} key={props.task.id}>
      <div className="view">
        <input
          type="checkbox"
          name={`input-${props.task.id}`}
          id={`input-${props.task.id}`}
          className="toggle"
          ref={checkboxRef}
          defaultChecked={props.task.isComplete}
          onChange={handleCheckboxChange}
        />
        <label
          className="todo-label"
          role="text"
          htmlFor={`input-${props.task.id}`}
        >
          {props.task.description}
        </label>
        <DeleteTask id={props.task.id} onTaskAdded={props.onTaskAdded} />
      </div>
    </li>
  )
}
export default TaskListItem
