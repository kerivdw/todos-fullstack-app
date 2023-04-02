import { useRef } from 'react'
import {Task} from '../../models/task'
import DeleteTask from './DeleteTask'

interface Props {
  task: Task
  onTaskAdded: () => void
}

function TaskListItem(props : Props) {

  const checkboxRef = useRef<HTMLInputElement>(false)
  function handleCheckboxChange() {
    console.log(checkboxRef.current?.checked)
  }

    const taskId = 'task-' + props.task.id
  const isTaskCompleted = props.task.completedAt !== null ? true : false
  const listItem = document.getElementById('task-item')
  isTaskCompleted === true
    ? listItem?.className.add('completed')
    : listItem?.className.remove('completed')
    
  return (
    <li id="task-item" key={props.task.id}>
    <div className="view">
      <input
        type="checkbox"
        name={taskId}
        id={taskId}
        className="toggle"
        ref={checkboxRef}
        defaultChecked={isTaskCompleted}
        onChange={handleCheckboxChange}
      />
      <label className="todo-label" role="text" htmlFor={taskId}>
        {props.task.description}
      </label>
      <DeleteTask id={props.task.id} onTaskAdded={props.onTaskAdded} />
    </div>
  </li>

  )
}
export default TaskListItem