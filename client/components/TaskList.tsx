import { Task } from '../../models/task'

interface Props {
  tasks: Task[]
}

function TaskList(props: Props) {
  return (
    <ul className="todo-list">
      
      {props.tasks.map((task) => {

          const taskid = "task-" + task.id

          return(
            <>
            <li key={task.id}>
              <div className="view">
                <input type="text" name={taskid} id={taskid} className="toggle" />
                <label htmlFor={taskid}>{task.description}</label>
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
