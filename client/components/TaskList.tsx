function TaskList() {
  return (
    <ul className="todo-list">
      <li>
        <div className="view">
          <input type="text" className="toggle" />
          <label htmlFor="#">Task Name 1</label>
          <button className="destroy"></button>
        </div>
      </li>
      <li>
        <div className="view">
          <input type="text" className="toggle" />
          <label htmlFor="#">Task Name 2</label>
          <button className="destroy"></button>
        </div>
      </li>
      <li>
        <div className="view">
          <input type="text" className="toggle" />
          <label htmlFor="#">Task Name 3</label>
          <button className="destroy"></button>
        </div>
      </li>
    </ul>
  )
}
export default TaskList
