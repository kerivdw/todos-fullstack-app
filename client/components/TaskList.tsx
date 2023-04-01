import { Task } from '../../models/task'
import DeleteTask from './DeleteTask'

interface Props {
  tasks: Task[]
  onTaskAdded: () => void
}

function TaskList(props: Props) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => {
        const taskId = 'task-' + task.id
        return (
          <li key={task.id}>
            <div className="view">
              <input type="text" name={taskId} id={taskId} className="toggle" />
              <label className="todo-label" role="text" htmlFor={taskId}>
                {task.description}
              </label>
              <DeleteTask id={task.id} onTaskAdded={props.onTaskAdded} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
export default TaskList
