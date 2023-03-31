import Filters from './Filters'

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">2 items</span>
      <Filters />
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}
export default Footer
