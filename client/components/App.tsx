import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTask />
      </header>
      <section className="main">
      <input className="toggle-all" type="text" />
      <label htmlFor="toggle-all">Mark all as complete</label>
        <TaskList />
      </section>
      <Footer />
    </>
  )
}

export default App
