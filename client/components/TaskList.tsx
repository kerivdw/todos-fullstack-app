import { useAppSelector } from '../hooks'
import { Task } from '../../models/task'
import TaskListItem from './TaskListItem'

interface Props {
  tasks: Task[]
}

function TaskList(props: Props) {
  const { filter } = useAppSelector((state) => state.filters)

  console.log(filter)

  const filteredTasks =
    filter === 'all'
      ? props.tasks
      : props.tasks.filter((task) =>
          filter === 'active' ? !task.isComplete : task.isComplete
        )

  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => {
        return <TaskListItem key={task.id} task={task} />
      })}
    </ul>
  )
}
export default TaskList
