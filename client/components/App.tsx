import { useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchTasks } from '../actions/task'
import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'

function App() {
  const { loading, error, data } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  function handleTaskAdded() {
    dispatch(fetchTasks())
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTask onTaskAdded={handleTaskAdded} />
      </header>
      <section className="main">
        <input className="toggle-all" type="text" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TaskList tasks={data} />
      </section>
      <Footer />
    </>
  )
}

export default App
