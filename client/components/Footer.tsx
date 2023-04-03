interface Props {
  activeTaskCount: string
}

function Footer(props: Props) {
  return (
    <footer className="footer">
      <span className="todo-count">{props.activeTaskCount} items</span>
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
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}
export default Footer
