import { Task } from '../../models/Task'

interface Props {
  tasks: Task[]
}

function TaskList(props: Props) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => {
        return (
          <>
            <li key={task.taskListId}>
              <div className="view">
                <input type="text" className="toggle" />
                <label htmlFor="#">{task.description}</label>
                <button className="destroy"></button>
              </div>
            </li>
          </>
        )
      })}
    </ul>
  )
}
export default TaskList
