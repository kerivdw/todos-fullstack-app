import Filters from './Filters'

interface Props {
  activeTaskCount: string
}

function Footer(props: Props) {
  return (
    <footer className="footer">
      <span className="todo-count">{props.activeTaskCount} items</span>
      <Filters />
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}
export default Footer
