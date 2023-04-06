import TaskListItem from './TaskListItem'
import { Task } from '../../models/task'

interface Props {
  tasks: Task[]
}

function TaskList(props: Props) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => {
        return <TaskListItem key={task.id} task={task} />
      })}
    </ul>
  )
}
export default TaskList
