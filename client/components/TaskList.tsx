import { Task } from '../../models/task'
import TaskListItem from './TaskListItem'

interface Props {
  tasks: Task[]
  onTaskAdded: () => void
}

function TaskList(props: Props) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => {
        return (
          <TaskListItem
            key={task.id}
            task={task}
            onTaskAdded={props.onTaskAdded}
          />
        )
      })}
    </ul>
  )
}
export default TaskList
